import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { LevelError, parseLevel, step } from '../src/core/dungeon/level';

const mini = () => parseLevel(readFileSync('levels/test-mini.level', 'utf8'));

/** Build level text from header lines and storeys (arrays of row strings). */
function build(storeys: string[][], header: string[] = ['name: T', 'start: 1 1 0 E']): string {
  const out = [...header, ''];
  storeys.forEach((rows, z) => out.push(`@z ${z}`, ...rows, ''));
  return out.join('\n');
}
const lineOf = (text: string, needle: string) => text.split('\n').findIndex((l) => l.includes(needle)) + 1;

describe('parseLevel', () => {
  test('reads size, storeys, start and cell kinds from test-mini.level', () => {
    const L = mini();
    expect([L.w, L.h, L.layers]).toEqual([5, 4, 2]);
    expect(L.start).toEqual({ x: 1, y: 1, z: 0, facing: 1 });
    expect(L.cell({ x: 3, y: 1, z: 0 }).kind).toBe('stairsUp');
    expect(L.cell({ x: 3, y: 1, z: 1 }).kind).toBe('stairsDown');
    expect(L.cell({ x: 2, y: 2, z: 1 }).kind).toBe('door');
    expect(L.cell({ x: 0, y: 0, z: 0 }).kind).toBe('solid');
  });

  test('area directives assign areas', () => {
    expect(mini().areaOf({ x: 2, y: 1, z: 0 })).toBe('hall');
  });

  test('rejects stairs with no matching stairs above, naming the line', () => {
    const text = build([['#####', '#.<.#', '#####'], ['#####', '#...#', '#####']], ['name: T', 'start: 1 1 0 E']);
    expect(() => parseLevel(text)).toThrowError(LevelError);
    expect(() => parseLevel(text)).toThrow(new RegExp(`line ${lineOf(text, '#.<.#')}\\b.*stairs`, 'i'));
  });

  test('rejects a void column that has no landing', () => {
    const text = build([['#####', '#.~.#', '#####']]);
    expect(() => parseLevel(text)).toThrow(/landing/i);
  });

  test('rejects an unreachable floor cell, naming the line', () => {
    const text = build([['#######', '#.#...#', '#######']]);
    expect(() => parseLevel(text)).toThrow(new RegExp(`line ${lineOf(text, '#.#...#')}\\b.*unreachable`, 'i'));
  });

  test('rejects ragged rows with a line number', () => {
    const text = build([['#####', '#...', '#####']]);
    expect(() => parseLevel(text)).toThrow(/line \d+.*row/i);
  });
});

describe('step', () => {
  test('a wall blocks the step', () => {
    expect(step(mini(), { x: 1, y: 1, z: 0 }, 0, 'fwd')).toBeNull();
  });

  test('walking forward moves one cell in the facing direction', () => {
    expect(step(mini(), { x: 1, y: 1, z: 0 }, 1, 'fwd')).toEqual({ pos: { x: 2, y: 1, z: 0 }, fell: 0 });
  });

  test('left and back are relative to facing', () => {
    expect(step(mini(), { x: 2, y: 1, z: 0 }, 1, 'back')?.pos).toEqual({ x: 1, y: 1, z: 0 });
    expect(step(mini(), { x: 2, y: 1, z: 0 }, 1, 'right')?.pos).toEqual({ x: 2, y: 2, z: 0 });
  });

  test('stairs up lands on the matching stairs one storey up, and stairs down returns', () => {
    const L = mini();
    const up = step(L, { x: 3, y: 1, z: 0 }, 1, 'up');
    expect(up?.pos).toEqual({ x: 3, y: 1, z: 1 });
    expect(step(L, up!.pos, 1, 'down')?.pos).toEqual({ x: 3, y: 1, z: 0 });
    expect(step(L, { x: 2, y: 1, z: 0 }, 1, 'up')).toBeNull();
  });

  test('stepping off a ledge into a three-storey void falls three storeys', () => {
    const text = build(
      [['#####', '#...#', '#####'], ['#####', '##~##', '#####'], ['#####', '##~##', '#####'], ['#####', '#.~##', '#####']],
      ['name: Drop', 'start: 1 1 3 E'],
    );
    const L = parseLevel(text);
    const r = step(L, { x: 1, y: 1, z: 3 }, 1, 'fwd');
    expect(r).toEqual({ pos: { x: 2, y: 1, z: 0 }, fell: 3 });
  });
});
