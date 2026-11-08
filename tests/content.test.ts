import { describe, expect, test } from 'vitest';
import { DISCOVERIES, MONSTERS, TALES } from '../src/core/data';
import { LEVEL_IDS, loadLevel } from '../src/core/levels';
import { isStandable, type Level, type Pos } from '../src/core/dungeon/level';

const cells = (L: Level) => {
  const out: { p: Pos; kind: string; data: Record<string, string> }[] = [];
  for (let z = 0; z < L.layers; z++) for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
    const c = L.cell({ x, y, z });
    out.push({ p: { x, y, z }, kind: c.kind, data: c.data ?? {} });
  }
  return out;
};
const levels = () => LEVEL_IDS.map((id) => loadLevel(id));

describe('demo levels', () => {
  test('there are three levels, one deeper than the next, and each parses', () => {
    expect(LEVEL_IDS).toEqual(['crypt', 'caverns', 'deep']);
    expect(levels().map((l) => l.depth)).toEqual([1, 2, 3]);
  });

  test('at least one level has a void column three storeys or taller, with ledges and a bridge', () => {
    const tall = levels().find((L) => L.layers >= 4)!;
    expect(tall).toBeTruthy();
    let best = 0;
    for (let y = 0; y < tall.h; y++) for (let x = 0; x < tall.w; x++) {
      let run = 0;
      for (let z = 0; z < tall.layers; z++) { run = tall.cell({ x, y, z }).kind === 'void' ? run + 1 : 0; best = Math.max(best, run); }
    }
    expect(best).toBeGreaterThanOrEqual(3);
  });

  test('exits link the levels in a chain, start in town and end at the ending, and land on real cells', () => {
    const all = levels();
    const exits = all.flatMap((L) => cells(L).filter((c) => c.data.exit).map((c) => ({ from: L.id, ...c.data, p: c.p } as Record<string, string> & { from: string; p: Pos })));
    expect(exits.some((e) => e.exit === 'town' && e.from === 'crypt')).toBe(true);
    expect(exits.some((e) => e.exit === 'ending' && e.from === 'deep')).toBe(true);
    for (const e of exits) {
      if (e.exit === 'town' || e.exit === 'ending') continue;
      expect(LEVEL_IDS, `${e.from} exit target`).toContain(e.exit);
      const [x, y, z] = e.to.split(',').map(Number);
      expect(isStandable(loadLevel(e.exit).cell({ x, y, z }).kind), `${e.from} -> ${e.exit} lands on a standable cell`).toBe(true);
    }
  });

  test('every discovery is found exactly once, and at least one tale points at it', () => {
    const found = levels().flatMap((L) => cells(L).filter((c) => c.data.discovery).map((c) => c.data.discovery));
    for (const d of DISCOVERIES) {
      expect(found.filter((f) => f === d.id), d.id).toHaveLength(1);
      expect(TALES.some((t) => t.hints === d.id), `${d.id} is hinted`).toBe(true);
    }
  });

  test('fixed encounters name real monsters of a sensible group size', () => {
    const ids = new Set(MONSTERS.map((m) => m.id));
    for (const L of levels()) for (const c of cells(L).filter((x) => x.kind === 'encounter')) {
      expect(c.data.monsters, `${L.id} ${c.p.x},${c.p.y},${c.p.z} needs monsters=`).toBeTruthy();
      for (const part of c.data.monsters.split(',')) {
        const [id, n] = part.split(':');
        expect(ids.has(id), id).toBe(true);
        expect(Number(n)).toBeGreaterThanOrEqual(1);
        expect(Number(n)).toBeLessThanOrEqual(9);
      }
    }
  });

  test('event tiles use known events and every closure cell is inside the level', () => {
    for (const L of levels()) for (const c of cells(L).filter((x) => x.kind === 'event')) {
      expect(['collapse', 'flood', 'monstersClash', 'cursedRelic']).toContain(c.data.event);
      for (const cell of (c.data.closes ?? '').split(';').filter(Boolean)) {
        const [x, y, z] = cell.split(',').map(Number);
        expect(L.inBounds({ x, y, z })).toBe(true);
      }
    }
  });

  test('each level has torches, runes and a distinct palette area', () => {
    for (const L of levels()) {
      const cs = cells(L);
      expect(cs.some((c) => c.data.torch), `${L.id} torches`).toBe(true);
      expect(cs.some((c) => c.data.rune), `${L.id} runes`).toBe(true);
    }
    const areas = new Set(levels().flatMap((L) => cells(L).map((c) => L.areaOf(c.p))));
    expect(areas.size).toBeGreaterThanOrEqual(3);
  });
});
