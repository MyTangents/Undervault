import type { Rng } from '../rng';
import type { Character, MonsterDef, Party } from '../types';
import { isWiped } from '../party';
import { ITEMS, SPELLS } from '../data';
import { castSpell } from '../magic';
import { chooseMonsterAction } from './ai';
import type { CombatEvent, CombatState, MonsterGroup, Order, Outcome, Warning } from './types';
import {
  armourClass, canAct, clamp, damageMonster, firstLiving, groupLiving, isActive, livingMembers, roll,
} from './util';

export const MAX_GROUPS = 4;
export const MAX_GROUP_SIZE = 9;

export function makeGroup(def: MonsterDef, count: number, rng: Rng): MonsterGroup {
  return {
    def,
    hp: Array.from({ length: count }, () => Math.max(1, roll(def.hp, rng))),
    asleep: false, friendly: false, silenced: false, enraged: false,
  };
}

export function startCombat(party: Party, groups: MonsterGroup[]): CombatState {
  if (groups.length > MAX_GROUPS) throw new Error(`a fight has at most four groups, got ${groups.length}`);
  for (const g of groups) if (g.hp.length > MAX_GROUP_SIZE) throw new Error(`a group has at most nine monsters, got ${g.hp.length}`);
  return { party, groups, round: 0, xpPool: 0, goldPool: 0, escaped: false };
}

export function fleeChance(s: CombatState): number {
  const alive = livingMembers(s.party);
  if (alive.length === 0 || alive.every((m) => m.status.includes('paralysed'))) return 0;
  const agi = alive.reduce((n, m) => n + m.stats.agi, 0) / alive.length;
  const awake = s.groups.filter((g) => groupLiving(g) > 0 && !g.asleep && !g.friendly).length;
  const asleepBonus = s.groups.some((g) => groupLiving(g) > 0 && g.asleep) ? 0.1 : 0;
  return clamp(0.4 + agi * 0.025 - awake * 0.04 + asleepBonus, 0.05, 0.95);
}

export function warnings(s: CombatState): Warning[] {
  const out: Warning[] = [];
  const alive = livingMembers(s.party);
  if (alive.some((m) => m.hp < m.maxHp * 0.3)) out.push('redHp');
  const casters = alive.filter((m) => m.maxCharges.some((c) => c > 0));
  if (casters.length > 0 && casters.every((m) => m.charges.every((c) => c <= 0))) out.push('lowCharges');
  const foes = s.groups.reduce((n, g) => n + (g.friendly ? 0 : groupLiving(g)), 0);
  if (foes >= alive.length * 2) out.push('outnumbered');
  if (s.groups.some((g) => g.enraged && groupLiving(g) > 0)) out.push('monsterEnraged');
  return out;
}

function weaponDice(c: Character): [number, number] {
  const it = ITEMS.find((i) => i.id === c.equipped.weapon);
  return it?.damage ?? [1, 4];
}

const allDead = (s: CombatState) => s.groups.every((g) => groupLiving(g) === 0);

function outcomeOf(s: CombatState): Outcome {
  if (s.escaped) return 'fled';
  if (allDead(s)) return 'won';
  if (isWiped(s.party)) return 'wiped';
  return 'ongoing';
}

type Actor = { kind: 'member'; m: Character; init: number } | { kind: 'group'; gi: number; init: number };

export function resolveRound(s0: CombatState, orders: Record<string, Order>, rng: Rng): { state: CombatState; events: CombatEvent[]; outcome: Outcome } {
  const s = structuredClone(s0);
  s.round += 1;
  const events: CombatEvent[] = [];

  if (allDead(s)) return { state: s, events, outcome: 'won' };
  if (s.groups.every((g) => g.friendly || groupLiving(g) === 0)) {
    events.push({ t: 'peace' });
    return { state: s, events, outcome: 'won' };
  }

  let partyActs = true;
  if (s.party.members.some((m) => isActive(m) && orders[m.id]?.kind === 'run')) {
    const chance = fleeChance(s);
    if (chance === 0) { events.push({ t: 'runFail', reason: 'paralysed' }); partyActs = false; }
    else if (rng.chance(chance)) { events.push({ t: 'runOk' }); return { state: s, events, outcome: 'fled' }; }
    else { events.push({ t: 'runFail' }); partyActs = false; }
  }

  const actors: Actor[] = [];
  for (const m of s.party.members) if (canAct(m)) actors.push({ kind: 'member', m, init: m.stats.agi + rng.int(0, 6) });
  s.groups.forEach((g, gi) => {
    if (groupLiving(g) > 0 && !g.asleep && !g.friendly) actors.push({ kind: 'group', gi, init: 8 + rng.int(0, 6) });
  });
  actors.sort((a, b) => b.init - a.init);

  const parrying = new Set<string>();
  const kill = (c: Character) => { c.hp = 0; c.dead = true; events.push({ t: 'death', id: c.id }); };

  for (const a of actors) {
    if (outcomeOf(s) !== 'ongoing') break;
    if (a.kind === 'member') {
      const m = s.party.members.find((x) => x.id === a.m.id)!;
      if (!canAct(m) || !partyActs) continue;
      const o: Order = orders[m.id] ?? { kind: 'parry' };
      if (o.kind === 'parry') { parrying.add(m.id); events.push({ t: 'parry', actor: m.id }); }
      else if (o.kind === 'fight') {
        if (m.row === 'back') { events.push({ t: 'miss', actor: m.id, reason: 'back row' }); continue; }
        let gi = o.group;
        if (!s.groups[gi] || groupLiving(s.groups[gi]) === 0) gi = s.groups.findIndex((g) => groupLiving(g) > 0);
        if (gi < 0) continue;
        const g = s.groups[gi];
        const chance = clamp(0.55 + 0.03 * m.level + 0.01 * (m.stats.str - 10) - 0.03 * g.def.ac, 0.1, 0.95);
        if (!rng.chance(chance)) { events.push({ t: 'miss', actor: m.id }); continue; }
        const dmg = Math.max(1, roll(weaponDice(m), rng) + Math.max(0, Math.floor((m.stats.str - 10) / 3)));
        const killed = damageMonster(s, gi, firstLiving(g), dmg, rng);
        events.push({ t: 'hit', actor: m.id, group: gi, dmg, killed });
      } else if (o.kind === 'spell') events.push(...castSpell(s, m.id, o.spellId, o.target, rng));
      else if (o.kind === 'use') {
        const it = ITEMS.find((i) => i.id === o.itemId);
        if (it?.kind === 'consumable' && it.spellId && m.inventory.includes(o.itemId)) {
          events.push(...castSpell(s, m.id, it.spellId, o.target, rng, { free: true }));
          m.inventory.splice(m.inventory.indexOf(o.itemId), 1);
        } else events.push({ t: 'note', text: `${m.name} fumbles with an item.` });
      }
    } else {
      const g = s.groups[a.gi];
      const count = groupLiving(g);
      for (let n = 0; n < count; n++) {
        if (outcomeOf(s) !== 'ongoing' || groupLiving(g) === 0) break;
        const act = chooseMonsterAction(s, a.gi, rng);
        if (act.kind === 'flee') {
          g.hp[firstLiving(g)] = 0;
          events.push({ t: 'monsterFlees', group: a.gi });
        } else if (act.kind === 'callHelp') {
          if (g.hp.length < MAX_GROUP_SIZE) g.hp.push(Math.max(1, roll(g.def.hp, rng)));
          events.push({ t: 'monsterCalls', group: a.gi });
        } else if (act.kind === 'cast') {
          monsterCast(s, a.gi, act.spellId, act.target, rng, events, kill, g);
        } else if (act.kind === 'attack') {
          for (let k = 0; k < g.def.attacks; k++) {
            const target = s.party.members.find((x) => x.id === act.target && isActive(x)) ?? livingMembers(s.party)[0];
            if (!target) break;
            const shield = target.status.includes('shielded') ? 0.15 : 0;
            const chance = clamp(0.55 + (10 - armourClass(target)) * 0.03 - shield, 0.15, 0.95);
            if (!rng.chance(chance)) { events.push({ t: 'monsterMiss', group: a.gi, target: target.id }); continue; }
            let dmg = roll(g.def.damage, rng);
            if (parrying.has(target.id)) dmg = Math.ceil(dmg / 2);
            target.hp = Math.max(0, target.hp - dmg);
            target.status = target.status.filter((x) => x !== 'asleep');
            const killed = target.hp === 0;
            events.push({ t: 'monsterHit', group: a.gi, target: target.id, dmg, killed });
            if (killed) { kill(target); g.enraged = true; }
          }
        }
      }
    }
  }
  // Sleep, silence and paralysis wear off over a few rounds.
  for (const m of s.party.members) {
    m.status = m.status.filter((x) => !(x === 'asleep' || x === 'silenced' || x === 'paralysed') || !rng.chance(0.35));
  }
  return { state: s, events, outcome: outcomeOf(s) };
}

/** A monster casts one of its spells at the party. Mutates `s` (a working clone). */
function monsterCast(
  s: CombatState, gi: number, spellId: string, targetId: string, rng: Rng,
  events: CombatEvent[], kill: (c: Character) => void, g: MonsterGroup,
): void {
  const spell = SPELLS.find((x) => x.id === spellId);
  const alive = livingMembers(s.party);
  if (!spell || g.silenced || alive.length === 0) return;
  const victims = spell.target === 'group' ? alive : [alive.find((m) => m.id === targetId) ?? alive[0]];
  if (spell.kind === 'damage') {
    for (const v of victims) {
      const dmg = roll(spell.power, rng);
      v.hp = Math.max(0, v.hp - dmg);
      v.status = v.status.filter((x) => x !== 'asleep');
      events.push({ t: 'monsterCasts', group: gi, spellId, target: v.id, dmg });
      if (v.hp === 0) { kill(v); g.enraged = true; }
    }
  } else if (spell.kind === 'sleep' || spell.kind === 'silence') {
    const status = spell.kind === 'sleep' ? 'asleep' : 'silenced';
    for (const v of victims) {
      const ok = rng.chance(0.6);
      if (ok && !v.status.includes(status)) v.status.push(status);
      events.push({ t: 'monsterCasts', group: gi, spellId, target: v.id, effect: ok ? status : 'resisted' });
    }
  }
}
