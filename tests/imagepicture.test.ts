import { describe, expect, test } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { ImagePicture } from '../src/render/monster/image';
import { PICTURE_H, PICTURE_W, registerPicture, getPicture } from '../src/render/monster/picture';

function source() {
  const c = createCanvas(64, 80);
  const g = c.getContext('2d');
  g.fillStyle = '#c04030'; g.fillRect(0, 0, 64, 80);
  g.fillStyle = '#f0e0b0'; g.fillRect(16, 16, 32, 48);
  return c as unknown as CanvasImageSource;
}
const draw = (p: ImagePicture, t: number, s = { hit: 0, lunge: 0, damage: 0, dying: 0 }) => {
  const c = createCanvas(PICTURE_W, PICTURE_H);
  const ctx = c.getContext('2d') as unknown as CanvasRenderingContext2D;
  p.draw(ctx, t, s);
  return ctx.getImageData(0, 0, PICTURE_W, PICTURE_H).data;
};
const bright = (d: Uint8ClampedArray) => { let n = 0; for (let i = 0; i < d.length; i += 4) n += d[i] + d[i + 1] + d[i + 2]; return n; };

describe('ImagePicture (generated art behind the same interface)', () => {
  test('draws the supplied image, breathing a little over time', () => {
    const p = new ImagePicture(source());
    const a = draw(p, 0.0), b = draw(p, 1.0);
    expect(bright(a)).toBeGreaterThan(0);
    expect(a.some((v, i) => v !== b[i])).toBe(true);
  });

  test('a hit brightens it, damage dims it, and dying fades it out', () => {
    const p = new ImagePicture(source());
    const base = bright(draw(p, 0.5));
    expect(bright(draw(p, 0.5, { hit: 1, lunge: 0, damage: 0, dying: 0 }))).toBeGreaterThan(base);
    expect(bright(draw(p, 0.5, { hit: 0, lunge: 0, damage: 0.9, dying: 0 }))).toBeLessThan(base);
    expect(bright(draw(p, 0.5, { hit: 0, lunge: 0, damage: 0, dying: 1 }))).toBeLessThan(base * 0.2);
  });

  test('a registered image picture is what getPicture returns for its id', () => {
    const p = new ImagePicture(source());
    registerPicture('generated-test', p);
    expect(getPicture('generated-test')).toBe(p);
  });
});
