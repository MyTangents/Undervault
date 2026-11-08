import { ShadedPicture, newCanvas } from '../monster/picture';
import { makeRamp } from '../monster/painters';
import type { RGB } from '../monster/picture';
import { painterFor } from './faces';
import { PORTRAIT_H, PORTRAIT_W, specKey } from './spec';
import type { PortraitSpec, PortraitState } from './spec';

export * from './spec';

export interface Portrait {
  width: number;
  height: number;
  draw(ctx: CanvasRenderingContext2D, t: number, s: PortraitState): void;
}

/** The ramp a fallen character is drawn in: the colour has gone out of them. */
export const DEAD_RAMP: RGB[] = makeRamp(['#060606', '#262626', '#7a7a7a', '#d8d8d8'], 12);

const cache = new Map<string, Portrait>();

/** The living picture for a spec, cached. A dead one is drawn through a grey ramp with the eyes shut. */
export function getPortrait(spec: PortraitSpec): Portrait {
  const key = specKey(spec);
  let p = cache.get(key);
  if (!p) {
    const painter = painterFor(spec);
    const live = new ShadedPicture<PortraitState>(painter, PORTRAIT_W, PORTRAIT_H);
    const grey = new ShadedPicture<PortraitState>({ ...painter, ramp: DEAD_RAMP }, PORTRAIT_W, PORTRAIT_H);
    p = {
      width: PORTRAIT_W,
      height: PORTRAIT_H,
      draw: (ctx, t, s) => (s.dead ? grey : live).draw(ctx, t, s),
    };
    cache.set(key, p);
  }
  return p;
}

export const THUMB_W = 32;
export const THUMB_H = 40;
const thumbs = new Map<string, HTMLCanvasElement>();

/** A 32x40 still of a face for the roster strip, cached by spec and the state flags that change how it looks. */
export function portraitThumb(spec: PortraitSpec, s: PortraitState): HTMLCanvasElement {
  const key = `${specKey(spec)}|${s.dead ? 'x' : 'o'}|${Math.round(s.damage * 4)}|${Math.round(s.dying * 4)}`;
  let c = thumbs.get(key);
  if (c) return c;
  c = newCanvas(THUMB_W, THUMB_H);
  thumbs.set(key, c);
  try {
    const big = newCanvas(PORTRAIT_W, PORTRAIT_H);
    const bg = big.getContext('2d') as CanvasRenderingContext2D | null;
    const g = c.getContext('2d') as CanvasRenderingContext2D | null;
    if (bg && g) {
      getPortrait(spec).draw(bg, 0.6, { ...s, damage: Math.round(s.damage * 4) / 4, dying: Math.round(s.dying * 4) / 4, speaking: false });
      g.imageSmoothingEnabled = true;
      g.drawImage(big as unknown as CanvasImageSource, 0, 0, THUMB_W, THUMB_H);
    }
  } catch { /* a canvas that cannot draw leaves the thumb blank */ }
  return c;
}
