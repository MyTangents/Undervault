import { ShadedPicture } from '../monster/picture';
import { makeRamp } from '../monster/painters';
import type { RGB } from '../monster/picture';
import { adventurerPainter } from './faces';
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
    const painter = adventurerPainter(spec);
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
