import { describe, expect, test } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { parseLevel } from '../src/core/dungeon/level';
import { newAutomap, reveal } from '../src/core/dungeon/automap';
import { AutomapView } from '../src/render/automapView';

const level = parseLevel(['name: T', 'start: 1 1 0 E', '', '@z 0', '#####', '#..<#', '#.^.#', '#####', '', '@z 1', '#####', '#..>#', '#...#', '#####', ''].join('\n'));
const seen = reveal(newAutomap(), level, { x: 1, y: 1, z: 0 }, 1);

function paint(mode: 'on' | 'off', z = 0) {
  const c = createCanvas(200, 200);
  const view = new AutomapView(c as unknown as HTMLCanvasElement);
  view.draw(seen, level, { x: 1, y: 1, z: 0 }, 1, z, mode);
  const d = (c.getContext('2d') as unknown as CanvasRenderingContext2D).getImageData(0, 0, 200, 200).data;
  let lit = 0;
  for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 90) lit++;
  return { lit, data: d };
}

describe('AutomapView', () => {
  test('with the automap on it draws the explored cells', () => {
    expect(paint('on').lit).toBeGreaterThan(300);
  });

  test('with the automap off it draws nothing at all', () => {
    expect(paint('off').lit).toBe(0);
  });

  test('another storey draws differently from the one the party is on', () => {
    const here = paint('on', 0).data, above = paint('on', 1).data;
    expect(here.some((v, i) => v !== above[i])).toBe(true);
  });

  test('a hidden trap looks like plain floor on the map until it is known', () => {
    const c = createCanvas(200, 200);
    const view = new AutomapView(c as unknown as HTMLCanvasElement);
    const near = reveal(newAutomap(), level, { x: 2, y: 1, z: 0 }, 2);
    view.draw(near, level, { x: 2, y: 1, z: 0 }, 2, 0, 'on');
    const ctx = c.getContext('2d') as unknown as CanvasRenderingContext2D;
    const cell = 200 / 5;
    const px = (x: number, y: number) => Array.from(ctx.getImageData(Math.floor((x + 0.5) * cell), Math.floor((y + 0.5) * cell), 1, 1).data);
    expect(px(2, 2)).toEqual(px(1, 2)); // the pit at (2,2) matches the floor beside it
  });
});
