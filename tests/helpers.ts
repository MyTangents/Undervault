import { createRng } from '../src/core/rng';
import type { Alignment, Character, MonsterDef, Party, Stats } from '../src/core/types';
import { addToParty, createCharacter, emptyParty } from '../src/core/party';

export const ZERO: Stats = { str: 0, iq: 0, pie: 0, vit: 0, agi: 0, luck: 0 };

export const rat: MonsterDef = {
  id: 'test-rat', name: 'Test Rat', depth: [1, 1], hp: [1, 4], ac: 2, attacks: 1, damage: [1, 2],
  group: [1, 9], behaviour: 'brute', xp: 5, gold: [1, 4], pictureId: 'placeholder',
};
export const ogre: MonsterDef = {
  ...rat, id: 'test-ogre', name: 'Test Ogre', hp: [6, 8], damage: [2, 6], attacks: 2, xp: 40,
};

export function hero(name: string, classId = 'blade', alloc: Partial<Stats> = {}, alignment: Alignment = 'neutral'): Character {
  const a = { ...ZERO, str: 4, ...alloc };
  const raceId = classId === 'spellwright' ? 'thornborn' : classId === 'votary' ? 'thornborn' : 'human';
  return createCharacter({ name, raceId, classId, alignment, pool: 19 }, a, createRng(3));
}

export function partyOf(n: number, make: (i: number) => Character = (i) => hero(`H${i}`)): Party {
  let p = emptyParty();
  for (let i = 0; i < n; i++) p = addToParty(p, make(i));
  return p;
}

/** a character with fixed hit points, so tests are not at the mercy of the HP roll */
export const withHp = (c: Character, hp: number): Character => ({ ...c, hp, maxHp: hp });
