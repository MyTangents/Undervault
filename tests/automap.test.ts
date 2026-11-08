import { describe, expect, test } from 'vitest';
import { parseLevel } from '../src/core/dungeon/level';
import {
  deserializeAutomap, layerView, markKnown, newAutomap, reveal, serializeAutomap,
} from '../src/core/dungeon/automap';

function build(storeys: string[][], start = '1 1 0 E'): string {
  const out = ['name: T', `start: ${start}`, ''];
  storeys.forEach((rows, z) => out.push(`@z ${z}`, ...rows, ''));
  return out.join('\n');
}
const seen = (m: ReturnType<typeof newAutomap>, x: number, y: number, z: number) => m.seen.has(`${x},${y},${z}`);

describe('automap', () => {
  const walled = parseLevel(build([['#########', '#..#....#', '#..#....#', '#.......#', '#########']]));

  test('standing in a room reveals what is in sight, and the wall that blocks, not what is behind it', () => {
    const m = reveal(newAutomap(), walled, { x: 1, y: 1, z: 0 }, 1);
    expect(seen(m, 2, 1, 0)).toBe(true); // open floor ahead
    expect(seen(m, 3, 1, 0)).toBe(true); // the blocking wall itself
    expect(seen(m, 5, 1, 0)).toBe(false); // behind the wall
  });

  test('reveal does not mutate the map it was given', () => {
    const before = newAutomap();
    reveal(before, walled, { x: 1, y: 1, z: 0 }, 1);
    expect(before.seen.size).toBe(0);
  });

  test('a cavern edge reveals the storeys below through the void', () => {
    const drop = parseLevel(build(
      [['#####', '#...#', '#####'], ['#####', '##~##', '#####'], ['#####', '##~##', '#####'], ['#####', '#.~##', '#####']],
      '1 1 3 E',
    ));
    const m = reveal(newAutomap(), drop, { x: 1, y: 1, z: 3 }, 1);
    expect(seen(m, 2, 1, 3)).toBe(true);
    expect(seen(m, 2, 1, 2)).toBe(true);
    expect(seen(m, 2, 1, 0)).toBe(true); // the floor far below
  });

  test('trap tiles show as plain floor until they are marked known', () => {
    const lvl = parseLevel(build([['#####', '#.^.#', '#####']]));
    let m = reveal(newAutomap(), lvl, { x: 1, y: 1, z: 0 }, 1);
    const trap = () => layerView(m, lvl, 0).find((c) => c.x === 2 && c.y === 1)!;
    expect(trap().kind).toBe('floor');
    m = markKnown(m, { x: 2, y: 1, z: 0 });
    expect(trap().kind).toBe('pit');
  });

  test('the automap round-trips through serialisation', () => {
    const m = reveal(newAutomap(), walled, { x: 1, y: 1, z: 0 }, 1);
    const back = deserializeAutomap(serializeAutomap(m));
    expect([...back.seen].sort()).toEqual([...m.seen].sort());
  });

  test('layerView marks unseen cells unknown and cells above open air', () => {
    const m = reveal(newAutomap(), walled, { x: 1, y: 1, z: 0 }, 1);
    const view = layerView(m, walled, 0);
    expect(view.find((c) => c.x === 5 && c.y === 1)!.known).toBe(false);
    expect(view.find((c) => c.x === 2 && c.y === 1)!.known).toBe(true);
  });
});
