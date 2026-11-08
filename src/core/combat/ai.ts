import type { Rng } from '../rng';
import type { CombatState, MonsterAction } from './types';
import { livingMembers } from './util';

/** Picks what one monster of group `gi` does this round. */
export function chooseMonsterAction(s: CombatState, gi: number, rng: Rng): MonsterAction {
  void gi;
  const alive = livingMembers(s.party);
  if (alive.length === 0) return { kind: 'wait' };
  const front = alive.filter((m) => m.row === 'front');
  const pool = front.length > 0 && rng.chance(0.7) ? front : alive;
  return { kind: 'attack', target: rng.pick(pool).id };
}
