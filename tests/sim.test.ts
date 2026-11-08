import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { MONSTERS } from '../src/core/data';
import { rollEncounter } from '../src/core/encounters';
import { demoParty, simulate } from '../src/core/sim';

describe('bestiary', () => {
  test('has ten monsters with a variety of behaviours and valid depth ranges', () => {
    expect(MONSTERS).toHaveLength(10);
    expect(new Set(MONSTERS.map((m) => m.behaviour)).size).toBeGreaterThanOrEqual(4);
    for (const m of MONSTERS) {
      expect(m.depth[0]).toBeGreaterThanOrEqual(1);
      expect(m.depth[1]).toBeGreaterThanOrEqual(m.depth[0]);
      expect(m.group[1]).toBeLessThanOrEqual(9);
    }
  });
});

describe('rollEncounter', () => {
  test('gives one to three groups of monsters native to that depth, never over the group limits', () => {
    const rng = createRng(4);
    for (let i = 0; i < 300; i++) {
      const groups = rollEncounter(2, rng);
      expect(groups.length).toBeGreaterThanOrEqual(1);
      expect(groups.length).toBeLessThanOrEqual(3);
      for (const g of groups) {
        expect(g.def.depth[0]).toBeLessThanOrEqual(2);
        expect(g.def.depth[1]).toBeGreaterThanOrEqual(2);
        expect(g.hp.length).toBeGreaterThanOrEqual(g.def.group[0]);
        expect(g.hp.length).toBeLessThanOrEqual(g.def.group[1]);
      }
    }
  });
});

describe('simulate', () => {
  test('is deterministic for a seed', () => {
    const a = simulate({ depth: 1, battles: 30, seed: 7 });
    const b = simulate({ depth: 1, battles: 30, seed: 7 });
    expect(a).toEqual(b);
  });

  test('outcome rates add up to one and the first depth is survivable but not trivial', () => {
    const r = simulate({ depth: 1, battles: 150, seed: 3 });
    expect(r.winRate + r.wipeRate + r.fleeRate).toBeCloseTo(1, 9);
    expect(r.wipeRate).toBeLessThan(0.5);
    expect(r.avgRounds).toBeGreaterThan(1);
  });

  test('the demo party is a legal party of six', () => {
    const p = demoParty();
    expect(p.members).toHaveLength(6);
    expect(p.members.filter((m) => m.row === 'front')).toHaveLength(3);
  });
});
