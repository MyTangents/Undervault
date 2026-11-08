import { describe, expect, test } from 'vitest';
import { CLASSES, RACES } from '../src/core/data';
import { eligibleClasses, rollBonusPool } from '../src/core/party';
import { createRng } from '../src/core/rng';
import { ATTRS } from '../src/core/types';
import type { Stats } from '../src/core/types';
import { Creator, creatorFace } from '../src/render/ui/creator';
import { faceNumber, portraitForCharacter } from '../src/render/portrait';

const stats = (c: Creator): Stats => {
  const race = RACES.find((r) => r.id === c.spec.raceId)!;
  const s = {} as Stats;
  for (const a of ATTRS) s[a] = race.base[a] + c.alloc[a];
  return s;
};

/** A creator whose pool is big enough to open every class, for the tests that walk all stages. */
function ready(seed = 7): Creator {
  const c = new Creator(seed);
  c.spec.name = 'Pell';
  return c;
}

describe('Creator', () => {
  test('Creator walks name, race, alignment, alloc, class, confirm; back() steps one stage; back to race resets the allocation', () => {
    const c = ready();
    c.spec.raceId = 'barrowfolk'; // strength 10 + 1 point opens the blade
    expect(c.stage).toBe('name');
    c.next(); expect(c.stage).toBe('race');
    c.next(); expect(c.stage).toBe('alignment');
    c.next(); expect(c.stage).toBe('alloc');
    expect(c.adjust('str', 1)).toBe(true);
    expect(c.alloc.str).toBe(1);
    c.next(); expect(c.stage).toBe('class');
    c.next(); expect(c.stage).toBe('confirm');
    c.back(); expect(c.stage).toBe('class');
    c.back(); expect(c.stage).toBe('alloc');
    c.back(); expect(c.stage).toBe('alignment');
    c.back(); expect(c.stage).toBe('race');
    expect(ATTRS.every((a) => c.alloc[a] === 0)).toBe(true);
    c.back(); expect(c.stage).toBe('name');
    c.back(); expect(c.stage).toBe('name');
  });

  test('next() from the name stage refuses an empty name', () => {
    const c = new Creator(3);
    c.next();
    expect(c.stage).toBe('name');
    c.spec.name = '   ';
    c.next();
    expect(c.stage).toBe('name');
  });

  test('adjust respects the pool, never goes below zero allocation, and never lifts a stat above 18', () => {
    const c = ready();
    c.stage = 'alloc';
    expect(c.adjust('iq', -1)).toBe(false);
    expect(c.alloc.iq).toBe(0);
    let spent = 0;
    for (const a of ATTRS) while (c.adjust(a, 1)) spent++;
    expect(spent).toBeLessThanOrEqual(c.pool);
    expect(ATTRS.reduce((n, a) => n + c.alloc[a], 0)).toBe(Math.min(c.pool, spent));
    expect(c.left()).toBe(c.pool - spent);
    // a stat already near the cap stops at 18
    const d = ready();
    d.stage = 'alloc';
    d.pool = 99;
    for (let i = 0; i < 30; i++) d.adjust('str', 1);
    expect(stats(d).str).toBe(18);
  });

  test('reroll gives a new pool, zeroes the allocation and keeps name, race and alignment', () => {
    const c = ready(11);
    c.spec.raceId = 'barrowfolk';
    c.spec.alignment = 'evil';
    c.stage = 'alloc';
    c.adjust('str', 1);
    const before = c.pool;
    const pools = new Set<number>();
    for (let s = 100; s < 140; s++) { c.reroll(s); pools.add(c.pool); }
    expect(pools.size).toBeGreaterThan(1);
    expect(before).toBe(rollBonusPool(createRng(11)));
    expect(ATTRS.every((a) => c.alloc[a] === 0)).toBe(true);
    expect([c.spec.name, c.spec.raceId, c.spec.alignment]).toEqual(['Pell', 'barrowfolk', 'evil']);
    expect(c.seed).toBe(139);
    expect(c.pool).toBe(rollBonusPool(createRng(139)));
  });

  test('eligible() matches eligibleClasses; with none, next() from alloc refuses', () => {
    const c = ready();
    c.spec.raceId = 'human'; // base scores of 8 open no class
    c.stage = 'alloc';
    c.pool = 0;
    expect(c.eligible()).toEqual(eligibleClasses(stats(c), c.spec.alignment));
    expect(c.eligible()).toEqual([]);
    c.next();
    expect(c.stage).toBe('alloc');
    c.pool = 12;
    c.adjust('str', 1);
    c.adjust('str', 1);
    c.adjust('str', 1);
    expect(c.eligible()).toEqual(eligibleClasses(stats(c), c.spec.alignment));
    expect(c.eligible()).toContain('blade');
    c.next();
    expect(c.stage).toBe('class');
  });

  test('creatorFace(seed) equals faceNumber(build().id) for every class', () => {
    for (const cls of CLASSES) {
      for (const seed of [1, 2, 77, 123456]) {
        const c = new Creator(seed);
        c.spec.name = 'Pell Ned';
        c.spec.alignment = cls.alignments[0];
        c.pool = 200;
        // lift every attribute enough to meet the class gates
        c.stage = 'alloc';
        for (const a of ATTRS) while (!c.eligible().includes(cls.id) && c.adjust(a, 1));
        c.spec.classId = cls.id;
        const made = c.build();
        expect(faceNumber(made.id), `${cls.id}/${seed}`).toBe(creatorFace(seed));
      }
    }
  });

  test('build() creates a character whose portraitForCharacter is stable for the same seed', () => {
    const make = () => {
      const c = new Creator(42);
      c.spec.name = 'Pell';
      c.spec.raceId = 'barrowfolk';
      c.stage = 'alloc';
      c.adjust('str', 1);
      c.next();
      c.spec.classId = c.eligible()[0];
      return c.build();
    };
    const a = make(), b = make();
    expect(portraitForCharacter(a)).toEqual(portraitForCharacter(b));
    expect(a.id).toBe(b.id);
    expect(a.name).toBe('Pell');
  });
});
