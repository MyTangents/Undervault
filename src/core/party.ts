import type { Alignment, Attr, Character, Party, Row, Stats } from './types';
import { ATTRS } from './types';
import type { Rng } from './rng';
import { CLASSES, RACES, SPELLS } from './data';

export const PARTY_SIZE = 6;
export const FRONT_SIZE = 3;

export function emptyParty(): Party {
  return { members: [], gold: 100, discoveries: [] };
}

/** Bonus points to spend at creation: 5-9, with a small chance of 10 extra. */
export function rollBonusPool(rng: Rng): number {
  const base = rng.int(5, 9);
  return rng.chance(1 / 12) ? base + 10 : base;
}

export function eligibleClasses(stats: Stats, alignment: Alignment): string[] {
  return CLASSES.filter(
    (c) =>
      c.alignments.includes(alignment) &&
      (Object.entries(c.gates) as [Attr, number][]).every(([a, min]) => stats[a] >= min),
  ).map((c) => c.id);
}

export interface CharacterSpec {
  name: string;
  raceId: string;
  classId: string;
  alignment: Alignment;
  /** the bonus pool rolled for this character */
  pool: number;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export function createCharacter(spec: CharacterSpec, allocation: Stats, rng: Rng): Character {
  const race = RACES.find((r) => r.id === spec.raceId);
  const cls = CLASSES.find((c) => c.id === spec.classId);
  if (!race) throw new Error(`unknown race ${spec.raceId}`);
  if (!cls) throw new Error(`unknown class ${spec.classId}`);
  const spent = ATTRS.reduce((n, a) => n + allocation[a], 0);
  if (spent > spec.pool) throw new Error(`allocation of ${spent} exceeds the bonus pool of ${spec.pool}`);
  const stats = {} as Stats;
  for (const a of ATTRS) stats[a] = race.base[a] + allocation[a];
  if (!eligibleClasses(stats, spec.alignment).includes(spec.classId)) {
    throw new Error(`class ${spec.classId} is not eligible with those attributes and alignment`);
  }
  // First-level characters are sturdier than a bare die roll: a full die plus a bonus roll, plus a vitality bonus.
  const maxHp = Math.max(3, cls.hpDie + rng.int(1, Math.ceil(cls.hpDie / 2)) + Math.max(0, Math.floor((stats.vit - 8) / 3)));
  const casts = cls.school ? 2 : 0;
  return {
    id: `${slug(spec.name)}-${rng.int(1000, 9999)}`,
    name: spec.name,
    raceId: spec.raceId,
    classId: spec.classId,
    alignment: spec.alignment,
    level: 1,
    xp: 0,
    stats,
    hp: maxHp,
    maxHp,
    charges: [casts, 0, 0, 0, 0, 0, 0],
    maxCharges: [casts, 0, 0, 0, 0, 0, 0],
    known: cls.school
      ? SPELLS.filter((s) => s.school === cls.school && s.level === 1 && !s.discoveryId).map((s) => s.id)
      : [],
    techniques: [],
    inventory: [],
    equipped: {},
    status: [],
    dead: false,
    ash: false,
    row: 'front',
  };
}

/** Rows follow slot order: the first three members fight in front, the rest stand behind. */
function normalise(p: Party): Party {
  return { ...p, members: p.members.map((m, i) => ({ ...m, row: (i < FRONT_SIZE ? 'front' : 'back') as Row })) };
}

export function addToParty(p: Party, c: Character): Party {
  if (p.members.length >= PARTY_SIZE) throw new Error('the party is full (six members)');
  const hasGood = p.members.some((m) => m.alignment === 'good') || c.alignment === 'good';
  const hasEvil = p.members.some((m) => m.alignment === 'evil') || c.alignment === 'evil';
  if (hasGood && hasEvil) throw new Error('good and evil cannot share a party (alignment clash)');
  return normalise({ ...p, members: [...p.members, c] });
}

/** Moves a member into the requested row by swapping slots with the first member of that row. */
export function setRow(p: Party, id: string, row: Row): Party {
  const i = p.members.findIndex((m) => m.id === id);
  if (i < 0) throw new Error(`no such member ${id}`);
  if (p.members[i].row === row) return p;
  const j = p.members.findIndex((m) => m.row === row);
  if (j < 0) return p;
  const members = [...p.members];
  [members[i], members[j]] = [members[j], members[i]];
  return normalise({ ...p, members });
}

export function isWiped(p: Party): boolean {
  return p.members.every((m) => m.dead || m.ash);
}
