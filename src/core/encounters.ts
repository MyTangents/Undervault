import type { Rng } from './rng';
import { MONSTERS } from './data';
import { makeGroup } from './combat/engine';
import type { MonsterGroup } from './combat/types';

/** One to three monster groups native to this depth. */
export function rollEncounter(depth: number, rng: Rng): MonsterGroup[] {
  const native = MONSTERS.filter((m) => m.depth[0] <= depth && depth <= m.depth[1]);
  if (native.length === 0) return [];
  const n = rng.chance(0.55) ? 1 : rng.chance(0.65) ? 2 : 3;
  return Array.from({ length: n }, () => {
    const def = rng.pick(native);
    return makeGroup(def, rng.int(def.group[0], def.group[1]), rng);
  });
}
