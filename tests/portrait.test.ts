import { createHash } from 'node:crypto';
import { beforeAll, describe, expect, test } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { CLASSES, RACES } from '../src/core/data';
import type { Alignment } from '../src/core/types';
import { setCanvasFactory } from '../src/render/monster/picture';
import {
  PORTRAIT_H, PORTRAIT_W, faceNumber, getPortrait, portraitForCharacter, portraitThumb,
} from '../src/render/portrait';
import type { PortraitSpec, PortraitState } from '../src/render/portrait';

const calm: PortraitState = { hit: 0, lunge: 0, damage: 0, dying: 0, dead: false, speaking: false };

beforeAll(() => { setCanvasFactory((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement); });

function pixels(spec: PortraitSpec, t = 1.2, s: Partial<PortraitState> = {}): Uint8ClampedArray {
  const c = createCanvas(PORTRAIT_W, PORTRAIT_H);
  const ctx = c.getContext('2d') as unknown as CanvasRenderingContext2D;
  getPortrait(spec).draw(ctx, t, { ...calm, ...s });
  return ctx.getImageData(0, 0, PORTRAIT_W, PORTRAIT_H).data;
}
const sha = (d: Uint8ClampedArray) => createHash('sha1').update(Buffer.from(d)).digest('hex');
const colours = (d: Uint8ClampedArray) => {
  const set = new Set<number>();
  for (let i = 0; i < d.length; i += 4) set.add((d[i] << 16) | (d[i + 1] << 8) | d[i + 2]);
  return set.size;
};
const adv = (raceId = 'human', classId = 'blade', alignment: Alignment = 'neutral', face = 1234): PortraitSpec =>
  ({ kind: 'adventurer', raceId, classId, alignment, face });
const alignments: Alignment[] = ['good', 'neutral', 'evil'];

describe('portrait ids', () => {
  test('faceNumber reads the trailing integer: gudrun-1234 is 1234, weird is 0, a-12-9999 is 9999, an empty id is 0', () => {
    expect(faceNumber('gudrun-1234')).toBe(1234);
    expect(faceNumber('weird')).toBe(0);
    expect(faceNumber('a-12-9999')).toBe(9999);
    expect(faceNumber('')).toBe(0);
  });

  test('portraitForCharacter builds an adventurer spec from race, class, alignment and the id number', () => {
    const spec = portraitForCharacter({ id: 'pell-4321', name: 'Pell', raceId: 'thornborn', classId: 'shade', alignment: 'evil' });
    expect(spec).toEqual({ kind: 'adventurer', raceId: 'thornborn', classId: 'shade', alignment: 'evil', face: 4321 });
  });
});

describe('adventurer faces', () => {
  test('every race, class and alignment draws a face that is not blank (at least 8 distinct colours)', () => {
    expect([PORTRAIT_W, PORTRAIT_H]).toEqual([128, 160]);
    for (const r of RACES) for (const c of CLASSES) for (const a of alignments) {
      const d = pixels(adv(r.id, c.id, a));
      expect(d.length).toBe(PORTRAIT_W * PORTRAIT_H * 4);
      expect(colours(d), `${r.id}/${c.id}/${a}`).toBeGreaterThanOrEqual(8);
    }
  });

  test('the same spec, time and state draw identical pixels', () => {
    expect(sha(pixels(adv()))).toBe(sha(pixels(adv())));
  });

  test('different races differ, different classes differ, and at least 30 of 40 face numbers give distinct pictures', () => {
    const races = new Set(RACES.map((r) => sha(pixels(adv(r.id)))));
    expect(races.size).toBe(RACES.length);
    const classes = new Set(CLASSES.map((c) => sha(pixels(adv('human', c.id)))));
    expect(classes.size).toBe(CLASSES.length);
    const faces = new Set(Array.from({ length: 40 }, (_, i) => sha(pixels(adv('human', 'blade', 'neutral', i + 1)))));
    expect(faces.size).toBeGreaterThanOrEqual(30);
  });

  test('the picture breathes: t=0 and t=1 differ', () => {
    expect(sha(pixels(adv(), 0))).not.toBe(sha(pixels(adv(), 1)));
  });

  test('dead differs from alive, dying 0.5 differs from alive, damage 0.8 differs from 0', () => {
    const alive = sha(pixels(adv()));
    expect(sha(pixels(adv(), 1.2, { dead: true }))).not.toBe(alive);
    expect(sha(pixels(adv(), 1.2, { dying: 0.5 }))).not.toBe(alive);
    expect(sha(pixels(adv(), 1.2, { damage: 0.8 }))).not.toBe(alive);
  });

  test('ids with no numeric suffix still draw', () => {
    const spec = portraitForCharacter({ id: 'weird', name: 'Nobody Known', raceId: 'human', classId: 'blade', alignment: 'neutral' });
    expect(colours(pixels(spec))).toBeGreaterThanOrEqual(8);
    expect(sha(pixels(spec))).toBe(sha(pixels(spec)));
  });
});

describe('portrait life and thumbnails', () => {
  test('speaking differs from silent at the same time, and two speaking frames 0.15s apart differ', () => {
    const quiet = sha(pixels(adv(), 1.2));
    const talk = sha(pixels(adv(), 1.2, { speaking: true }));
    expect(talk).not.toBe(quiet);
    expect(sha(pixels(adv(), 1.35, { speaking: true }))).not.toBe(talk);
  });

  test('portraitThumb is 32x40, returns the same canvas for the same input, and a dead thumb differs from a living one', () => {
    const a = portraitThumb(adv(), calm);
    expect([a.width, a.height]).toEqual([32, 40]);
    expect(portraitThumb(adv(), calm)).toBe(a);
    expect(portraitThumb(adv(), { ...calm, damage: 0.1 })).toBe(a); // damage rounds to the nearest quarter
    const dead = portraitThumb(adv(), { ...calm, dead: true });
    expect(dead).not.toBe(a);
    const px = (c: HTMLCanvasElement) => (c.getContext('2d') as CanvasRenderingContext2D).getImageData(0, 0, 32, 40).data;
    expect(sha(px(dead))).not.toBe(sha(px(a)));
    expect(colours(px(a))).toBeGreaterThan(8);
  });
});
