import type { Character, Dice, Party } from '../types';
import type { Rng } from '../rng';
import { ITEMS } from '../data';
import type { CombatState, MonsterGroup } from './types';

export function roll(d: Dice, rng: Rng): number {
  if (d[1] <= 0) return 0;
  let t = 0;
  for (let i = 0; i < d[0]; i++) t += rng.int(1, d[1]);
  return t;
}

export const isActive = (c: Character): boolean => !c.dead && !c.ash && c.hp > 0;
export const canAct = (c: Character): boolean =>
  isActive(c) && !c.status.includes('asleep') && !c.status.includes('paralysed');
export const livingMembers = (p: Party): Character[] => p.members.filter(isActive);
export const groupLiving = (g: MonsterGroup): number => g.hp.filter((h) => h > 0).length;
export const firstLiving = (g: MonsterGroup): number => g.hp.findIndex((h) => h > 0);
export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** Armour class: 10 unbuffed, lower is better; equipped armour items lower it. */
export function armourClass(c: Character): number {
  let ac = 10;
  for (const id of Object.values(c.equipped)) {
    const it = ITEMS.find((i) => i.id === id);
    if (it?.ac) ac -= it.ac;
  }
  return clamp(ac, 0, 10);
}

/** Damage a monster; wakes its group; on a kill the xp and gold go into the combat pools. Returns true if killed. */
export function damageMonster(s: CombatState, gi: number, mi: number, dmg: number, rng: Rng): boolean {
  const g = s.groups[gi];
  if (g.hp[mi] <= 0) return false;
  g.hp[mi] = Math.max(0, g.hp[mi] - dmg);
  g.asleep = false;
  if (g.hp[mi] > 0) return false;
  s.xpPool += g.def.xp;
  s.goldPool += roll(g.def.gold, rng);
  return true;
}
