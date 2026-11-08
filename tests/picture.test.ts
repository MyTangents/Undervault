import { beforeAll, describe, expect, test } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { MONSTERS } from '../src/core/data';
import {
  PICTURE_H, PICTURE_W, getPicture, hasPicture, setCanvasFactory, type PictureState,
} from '../src/render/monster/picture';

const calm: PictureState = { hit: 0, lunge: 0, damage: 0, dying: 0 };

beforeAll(() => {
  setCanvasFactory((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement);
});

/** Draws a picture and returns its pixels. */
function pixels(id: string, t = 1.2, s: PictureState = calm): Uint8ClampedArray {
  const c = createCanvas(PICTURE_W, PICTURE_H);
  const ctx = c.getContext('2d') as unknown as CanvasRenderingContext2D;
  getPicture(id).draw(ctx, t, s);
  return ctx.getImageData(0, 0, PICTURE_W, PICTURE_H).data;
}
const same = (a: Uint8ClampedArray, b: Uint8ClampedArray) => a.length === b.length && a.every((v, i) => v === b[i]);
const litPixels = (d: Uint8ClampedArray) => { let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 60) n++; return n; };

describe('monster pictures', () => {
  test('a picture is 192 by 240 and draws something visible, fully opaque', () => {
    expect([PICTURE_W, PICTURE_H]).toEqual([192, 240]);
    const d = pixels('wraith');
    expect(d.length).toBe(PICTURE_W * PICTURE_H * 4);
    expect(litPixels(d)).toBeGreaterThan(1500);
    expect(d[3]).toBe(255);
  });

  test('every demo monster has a picture, and each looks different from the others', () => {
    const seen = new Set<string>();
    for (const m of MONSTERS) {
      expect(hasPicture(m.pictureId), m.pictureId).toBe(true);
      const d = pixels(m.pictureId);
      expect(litPixels(d), m.pictureId).toBeGreaterThan(800);
      seen.add(Array.from(d.filter((_, i) => i % 97 === 0)).join(','));
    }
    expect(seen.size).toBe(MONSTERS.length);
  });

  test('a hit flashes the picture, damage weakens it, and the dissolve removes it', () => {
    const calmPx = pixels('skeleton');
    expect(same(calmPx, pixels('skeleton', 1.2, { ...calm, hit: 1 }))).toBe(false);
    expect(same(calmPx, pixels('skeleton', 1.2, { ...calm, damage: 0.8 }))).toBe(false);
    const gone = pixels('skeleton', 1.2, { ...calm, dying: 0.95 });
    expect(litPixels(gone)).toBeLessThan(litPixels(calmPx));
  });

  test('the same time and state always give the same picture, and time makes it move', () => {
    expect(same(pixels('slime', 2.0), pixels('slime', 2.0))).toBe(true);
    expect(same(pixels('slime', 2.0), pixels('slime', 2.7))).toBe(false);
  });

  test('an unknown picture id gets a placeholder instead of an error', () => {
    expect(hasPicture('no-such-monster')).toBe(false);
    expect(() => pixels('no-such-monster')).not.toThrow();
    expect(litPixels(pixels('no-such-monster'))).toBeGreaterThan(300);
  });
});
