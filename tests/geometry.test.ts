import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseLevel, type Level, type Pos } from '../src/core/dungeon/level';
import { DIRS, isStandable } from '../src/core/dungeon/level';
import { buildHallGeometry } from '../src/render/hall/geometry';
import { PALETTES, hslSaturation, paletteFor, srgbToLinear } from '../src/render/hall/palettes';
import { DEFAULT_SETTINGS, effectiveBloom } from '../src/core/settings';

const mini = () => parseLevel(readFileSync('levels/test-mini.level', 'utf8'));
const build = (storeys: string[][], start: string, marks: string[] = []) =>
  parseLevel(['name: T', `start: ${start}`, ...marks, '', ...storeys.flatMap((r, z) => [`@z ${z}`, ...r, ''])].join('\n'));
const drop = () => build(
  [['#####', '#...#', '#####'], ['#####', '##~##', '#####'], ['#####', '##~##', '#####'], ['#####', '#.~##', '#####']], '1 1 3 E');

/** Independent count of solid/non-solid boundaries, to check the builder against. */
function expectedWallFaces(level: Level): string[] {
  const out: string[] = [];
  for (let z = 0; z < level.layers; z++) for (let y = 0; y < level.h; y++) for (let x = 0; x < level.w; x++) {
    if (level.cell({ x, y, z }).kind !== 'solid') continue;
    DIRS.forEach(([dx, dy], d) => {
      const n: Pos = { x: x + dx, y: y + dy, z };
      if (level.inBounds(n) && level.cell(n).kind !== 'solid') out.push(`${x},${y},${z},${'NESW'[d]}`);
    });
  }
  return out.sort();
}

describe('buildHallGeometry', () => {
  test('wall faces exist exactly where a solid cell meets an open one, and nowhere between two open cells', () => {
    for (const level of [mini(), drop()]) {
      const g = buildHallGeometry(level);
      expect([...g.wallFaces].sort()).toEqual(expectedWallFaces(level));
    }
  });

  test('a three-storey void gets wall faces on every storey of its ledge', () => {
    const g = buildHallGeometry(drop());
    for (const key of ['1,1,2,E', '1,1,1,E', '3,1,3,W', '3,1,2,W', '3,1,1,W']) expect(g.wallFaces.has(key), key).toBe(true);
  });

  test('floors exist only on standable cells, never over open air', () => {
    for (const level of [mini(), drop()]) {
      let standable = 0;
      for (let z = 0; z < level.layers; z++) for (let y = 0; y < level.h; y++) for (let x = 0; x < level.w; x++) {
        if (isStandable(level.cell({ x, y, z }).kind)) standable++;
      }
      expect(buildHallGeometry(level).floorQuads).toBe(standable);
    }
  });

  test('vertex arrays are consistent', () => {
    const g = buildHallGeometry(mini());
    expect(g.faces.positions.length).toBe(g.faces.colors.length);
    expect(g.faces.positions.length % 9).toBe(0);
    expect(g.lines.positions.length).toBe(g.lines.colors.length);
    expect(g.lines.positions.length / 3).toBe(g.lines.pulses.length);
    expect(g.lines.positions.length % 6).toBe(0);
  });

  test('torch and rune marks on walls make torches and glyph lines, one per open face', () => {
    const level = build([['#####', '#...#', '#####']], '1 1 0 E', ['mark 1 0 0 torch=1', 'mark 3 0 0 torch=1 rune=1']);
    const plain = buildHallGeometry(build([['#####', '#...#', '#####']], '1 1 0 E'));
    const g = buildHallGeometry(level);
    expect(g.torches).toHaveLength(2);
    expect(g.torches.every((t) => Math.abs(t.n[0]) + Math.abs(t.n[2]) === 1)).toBe(true);
    expect(g.lines.positions.length).toBeGreaterThan(plain.lines.positions.length);
  });

  test('faces take their colour from the palette of the area they face', () => {
    const level = build([['#####', '#...#', '#####']], '1 1 0 E', ['area crypt z=* x=0-4 y=0-2']);
    const g = buildHallGeometry(level);
    const want = [...PALETTES.crypt.wall].map((x) => x);
    expect(want).toBeTruthy();
    const w = PALETTES.crypt.wall;
    const first = [g.faces.colors[0], g.faces.colors[1], g.faces.colors[2]];
    expect(first[0]).toBeCloseTo(srgbToLinear(parseInt(w.slice(1, 3), 16) / 255), 4);
  });

  test('a door cell draws a frame', () => {
    const noDoor = buildHallGeometry(build([['#####', '#...#', '#####']], '1 1 0 E'));
    const door = buildHallGeometry(build([['#####', '#.D.#', '#####']], '1 1 0 E'));
    expect(door.lines.positions.length).toBeGreaterThan(noDoor.lines.positions.length);
  });
});

describe('palettes and settings', () => {
  test('structure colours stay muted: no wall, edge, grid or floor colour is neon', () => {
    for (const [name, p] of Object.entries(PALETTES)) {
      for (const k of ['wall', 'edge', 'grid', 'floor'] as const) {
        expect(hslSaturation(p[k]), `${name}.${k}`).toBeLessThanOrEqual(0.65);
      }
    }
  });

  test('an unknown area falls back to a default stone palette', () => {
    expect(paletteFor('no-such-area')).toBe(PALETTES.main);
  });

  test('the default look has lower bloom and more fog than the spike, and the automap on', () => {
    expect(DEFAULT_SETTINGS.bloom).toBeLessThan(1.05);
    expect(DEFAULT_SETTINGS.fog).toBeGreaterThan(0.17);
    expect(DEFAULT_SETTINGS.automap).toBe('on');
  });

  test('the low quality setting turns bloom off', () => {
    expect(effectiveBloom({ ...DEFAULT_SETTINGS, quality: 'low' })).toBe(0);
    expect(effectiveBloom({ ...DEFAULT_SETTINGS, quality: 'normal' })).toBe(DEFAULT_SETTINGS.bloom);
  });
});
