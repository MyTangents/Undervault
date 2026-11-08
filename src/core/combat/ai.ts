import type { Rng } from '../rng';
import type { Character } from '../types';
import { SPELLS } from '../data';
import type { CombatState, MonsterAction } from './types';
import { groupLiving, livingMembers } from './util';

const ratio = (c: Character) => c.hp / c.maxHp;

/** Picks what one monster of group `gi` does this round. Each behaviour has one readable intent. */
export function chooseMonsterAction(s: CombatState, gi: number, rng: Rng): MonsterAction {
  const g = s.groups[gi];
  const alive = livingMembers(s.party);
  if (alive.length === 0) return { kind: 'wait' };
  const front = alive.filter((m) => m.row === 'front');
  const back = alive.filter((m) => m.row === 'back');
  const weakest = [...alive].sort((a, b) => ratio(a) - ratio(b))[0];

  switch (g.def.behaviour) {
    case 'skittish': {
      const fraction = groupLiving(g) / g.hp.length;
      if (fraction < 0.5) {
        if (g.hp.length < 9 && rng.chance(0.12)) return { kind: 'callHelp' };
        if (rng.chance(0.5)) return { kind: 'flee' };
      }
      break;
    }
    case 'caster': {
      const usable = (g.def.spells ?? []).filter((id) => {
        const k = SPELLS.find((sp) => sp.id === id)?.kind;
        if (k === 'silence') return alive.some((m) => m.maxCharges.some((c) => c > 0) && !m.status.includes('silenced'));
        if (k === 'sleep') return alive.some((m) => !m.status.includes('asleep'));
        return true;
      });
      if (!g.silenced && usable.length > 0 && rng.chance(0.6)) {
        const spellId = rng.pick(usable);
        const kind = SPELLS.find((sp) => sp.id === spellId)?.kind;
        const caster = alive.filter((m) => m.maxCharges.some((c) => c > 0) && !m.status.includes('silenced'));
        const target = kind === 'silence' && caster.length > 0 ? rng.pick(caster) : weakest;
        return { kind: 'cast', spellId, target: target.id };
      }
      break;
    }
    case 'swarm':
      return { kind: 'attack', target: weakest.id };
    case 'ambusher':
      if (back.length > 0) return { kind: 'attack', target: rng.pick(back).id };
      break;
    default:
      break;
  }
  const pool = front.length > 0 && rng.chance(0.7) ? front : alive;
  return { kind: 'attack', target: rng.pick(pool).id };
}
