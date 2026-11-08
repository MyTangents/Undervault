import { createRng } from './rng';
import type { Rng } from './rng';
import type { Alignment, Character, Party, Stats } from './types';
import { addToParty, createCharacter, emptyParty } from './party';
import { resolveRound, startCombat, warnings } from './combat/engine';
import type { CombatState, Order } from './combat/types';
import { groupLiving, isActive, livingMembers } from './combat/util';
import { rollEncounter } from './encounters';
import { SPELLS } from './data';

const Z: Stats = { str: 0, iq: 0, pie: 0, vit: 0, agi: 0, luck: 0 };

/** A standard first-level party of six: three in front, three behind. */
export function demoParty(): Party {
  const rng = createRng(11);
  const mk = (name: string, raceId: string, classId: string, alignment: Alignment, a: Partial<Stats>): Character =>
    createCharacter({ name, raceId, classId, alignment, pool: 19 }, { ...Z, ...a }, rng);
  let p = emptyParty();
  for (const c of [
    mk('Brannoc', 'human', 'blade', 'neutral', { str: 5, vit: 4 }),
    mk('Gudrun', 'barrowfolk', 'blade', 'neutral', { str: 3, vit: 4 }),
    mk('Pell', 'lanternkin', 'cutpurse', 'neutral', { agi: 4, str: 3 }),
    mk('Isolde', 'thornborn', 'spellwright', 'neutral', { iq: 3, vit: 3 }),
    mk('Orsk', 'thornborn', 'votary', 'neutral', { pie: 3, vit: 3 }),
    mk('Kesk', 'cinderkin', 'blade', 'neutral', { str: 3, vit: 3 }),
  ]) p = addToParty(p, c);
  return p;
}

/** A simple, sensible policy: fighters fight, casters cast, healers heal, and the party runs when losing badly. */
export function autoOrders(s: CombatState): Record<string, Order> {
  const orders: Record<string, Order> = {};
  const alive = livingMembers(s.party);
  const w = warnings(s);
  const foes = s.groups.reduce((n, g) => n + groupLiving(g), 0);
  if (w.includes('redHp') && foes >= alive.length) {
    for (const m of alive) orders[m.id] = { kind: 'run' };
    return orders;
  }
  const target = Math.max(0, s.groups.findIndex((g) => groupLiving(g) > 0));
  const biggest = s.groups.reduce((best, g, i) => (groupLiving(g) > groupLiving(s.groups[best]) ? i : best), target);
  for (const m of alive) {
    const known = m.known.map((id) => SPELLS.find((x) => x.id === id)!).filter(Boolean);
    const hurt = [...alive].sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
    const heal = known.find((x) => x.kind === 'heal' && (m.charges[x.level - 1] ?? 0) > 0);
    const dmg = known.filter((x) => x.kind === 'damage' && (m.charges[x.level - 1] ?? 0) > 0).sort((a, b) => b.level - a.level)[0];
    if (heal && hurt.hp < hurt.maxHp * 0.5) orders[m.id] = { kind: 'spell', spellId: heal.id, target: s.party.members.indexOf(hurt) };
    else if (dmg) orders[m.id] = { kind: 'spell', spellId: dmg.id, target: dmg.target === 'group' ? biggest : target };
    else orders[m.id] = { kind: 'fight', group: target };
  }
  return orders;
}

export interface SimOptions { party?: Party; depth: number; battles: number; seed: number }
export interface SimResult { winRate: number; wipeRate: number; fleeRate: number; avgRounds: number; survivors: number }

/** Fights `battles` random encounters at `depth`, each with a fresh party, and reports the outcome rates. */
export function simulate(opts: SimOptions): SimResult {
  const rng: Rng = createRng(opts.seed);
  let win = 0, wipe = 0, flee = 0, rounds = 0, survivors = 0;
  for (let b = 0; b < opts.battles; b++) {
    let s = startCombat(structuredClone(opts.party ?? demoParty()), rollEncounter(opts.depth, rng));
    let outcome = 'ongoing';
    for (let r = 0; r < 60 && outcome === 'ongoing'; r++) {
      const res = resolveRound(s, autoOrders(s), rng);
      s = res.state; outcome = res.outcome; rounds++;
    }
    if (outcome === 'won') win++; else if (outcome === 'wiped') wipe++; else flee++;
    survivors += s.party.members.filter(isActive).length;
  }
  return {
    winRate: win / opts.battles, wipeRate: wipe / opts.battles, fleeRate: flee / opts.battles,
    avgRounds: rounds / opts.battles, survivors: survivors / opts.battles,
  };
}
