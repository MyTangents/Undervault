/**
 * Raster monster pictures, drawn entirely in code. A painter draws a grayscale height map (and glowing parts); this pipeline
 * lights it as relief, dithers it to a small colour ramp, and adds damage, hit flash and a cinder dissolve.
 * The layer is swappable: anything with a `draw(ctx, t, state)` can stand in (see image.ts for generated art).
 */
import { PAINTERS, PLACEHOLDER } from './painters';

export const PICTURE_W = 192;
export const PICTURE_H = 240;

export interface PictureState {
  /** 0-1: just struck (flash and shake) */
  hit: number;
  /** 0-1: lunging at the party (looms larger) */
  lunge: number;
  /** 0-1: how hurt it is (paler and cracked) */
  damage: number;
  /** 0-1: dissolving into cinders; 0 when alive */
  dying: number;
}

export interface MonsterPicture {
  width: number;
  height: number;
  draw(ctx: CanvasRenderingContext2D, t: number, s: PictureState): void;
}

export type RGB = [number, number, number];

export interface Painter<S extends PictureState = PictureState> {
  id: string;
  ramp: RGB[];
  /** draw the figure as a grayscale height map (brighter = nearer/higher), centred on x = 0 */
  paint(g: CanvasRenderingContext2D, t: number, s: S): void;
  /** draw glowing parts (eyes, flames) in colour, with alpha as strength */
  emit(g: CanvasRenderingContext2D, t: number, s: S): void;
}

type CanvasFactory = (w: number, h: number) => HTMLCanvasElement;
let makeCanvas: CanvasFactory = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
};
/** Tests run without a DOM and pass a Node canvas in here. */
export const setCanvasFactory = (f: CanvasFactory): void => { makeCanvas = f; };
/** A new canvas from the same factory the pictures use (a Node canvas in tests). */
export const newCanvas = (w: number, h: number): HTMLCanvasElement => makeCanvas(w, h);

function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function valueNoise(w: number, h: number, cell: number, seed: number): Float32Array {
  const r = seeded(seed), gw = Math.ceil(w / cell) + 2, gh = Math.ceil(h / cell) + 2, lat = new Float32Array(gw * gh);
  for (let i = 0; i < lat.length; i++) lat[i] = r();
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const fx = x / cell, fy = y / cell, ix = Math.floor(fx), iy = Math.floor(fy);
    let tx = fx - ix, ty = fy - iy; tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
    const a = lat[iy * gw + ix], b = lat[iy * gw + ix + 1], c = lat[(iy + 1) * gw + ix], d = lat[(iy + 1) * gw + ix + 1];
    out[y * w + x] = (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
  }
  return out;
}

interface Noise { grain: Float32Array; blotch: Float32Array; crack: Float32Array }
const noiseBySize = new Map<string, Noise>();
function noiseFor(w: number, h: number): Noise {
  const k = `${w}x${h}`;
  let n = noiseBySize.get(k);
  if (!n) { n = { grain: valueNoise(w, h, 3, 11), blotch: valueNoise(w, h, 9, 23), crack: valueNoise(w, h, 6, 41) }; noiseBySize.set(k, n); }
  return n;
}
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

/** The shared shading pipeline, one instance per painter. Geometry derives from the size; 192x240 is the monster size. */
export class ShadedPicture<S extends PictureState = PictureState> implements MonsterPicture {
  private hc?: HTMLCanvasElement; private bc?: HTMLCanvasElement; private ec?: HTMLCanvasElement;

  constructor(private painter: Painter<S>, readonly width: number = PICTURE_W, readonly height: number = PICTURE_H) {}

  draw(ctx: CanvasRenderingContext2D, t: number, s: S): void {
    const W = this.width, H = this.height;
    const { grain, blotch, crack } = noiseFor(W, H);
    const cx = W / 2, ground = H - 8, vcy = (H * 13) / 24, fadeFrom = H * 0.8125, fadeLen = H * 0.1875;
    this.hc ??= makeCanvas(W, H);
    this.bc ??= makeCanvas(W, H);
    this.ec ??= makeCanvas(W, H);
    const hg = this.hc.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    const bg = this.bc.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    const eg = this.ec.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    const loom = 1 + s.lunge * 0.09;

    hg.fillStyle = '#000'; hg.fillRect(0, 0, W, H);
    hg.save(); hg.translate(cx, ground); hg.scale(loom, loom); hg.translate(0, -ground); this.painter.paint(hg, t, s); hg.restore();
    eg.clearRect(0, 0, W, H);
    eg.save(); eg.translate(cx, ground); eg.scale(loom, loom); eg.translate(0, -ground); this.painter.emit(eg, t, s); eg.restore();

    bg.clearRect(0, 0, W, H);
    try { bg.filter = 'blur(1.3px)'; } catch { /* a canvas without filters just skips the blur */ }
    bg.drawImage(this.hc as unknown as CanvasImageSource, 0, 0);
    try { bg.filter = 'none'; } catch { /* ignore */ }

    const hd = bg.getImageData(0, 0, W, H).data;
    const ed = eg.getImageData(0, 0, W, H).data;
    const out = ctx.createImageData(W, H);
    const od = out.data;
    const ramp = this.painter.ramp;
    const flicker = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 3.1 + 1);
    const lx = -0.55 + 0.18 * Math.sin(t * 9.4), ly = -0.6, lz = 0.55, ll = Math.hypot(lx, ly, lz);
    const Lx = lx / ll, Ly = ly / ll, Lz = lz / ll;
    const lightI = 0.82 + 0.3 * flicker;
    const { hit, damage, dying } = s;

    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const p = y * W + x, i = p * 4, h = hd[i] / 255;
        let shade: number, burn = false, cracked = false;
        const mist = () => {
          const m = 0.5 + 0.5 * Math.sin(x * 0.045 + t * 0.35 + Math.sin(y * 0.05 - t * 0.22) * 2.2);
          const vx = (x - cx) / cx, vy = (y - vcy) / vcy, vig = Math.max(0, 1 - (vx * vx + vy * vy) * 0.7);
          return (0.05 + 0.17 * m * (0.35 + (y / H) * 0.65)) * vig;
        };
        if (h < 0.03) shade = mist();
        else {
          const dx = ((hd[i + 4] - hd[i - 4]) / 255) * 5, dy = ((hd[i + 4 * W] - hd[i - 4 * W]) / 255) * 5;
          const nl = (-dx * Lx - dy * Ly + Lz) / Math.sqrt(dx * dx + dy * dy + 1);
          shade = h * 0.5 + Math.max(0, nl) * 0.55 * lightI * (0.35 + h * 0.65) + (grain[p] - 0.5) * 0.16 * h;
          shade *= 1 - Math.max(0, (y - fadeFrom) / fadeLen) * 0.55;
          if (damage > 0) {
            shade = shade * (1 - 0.22 * damage) + 0.07 * damage; // paler, flatter
            if (Math.abs(crack[p] - 0.5) < 0.012 + damage * 0.03 && blotch[p] < damage * 1.1) cracked = true;
          }
          if (dying > 0) {
            const n = blotch[p];
            if (n < dying) shade = mist();
            else if (n - dying < 0.05) burn = true;
          }
          shade += hit * 0.6;
        }
        const b = BAYER[(y & 3) * 4 + (x & 3)];
        const v = Math.min(1, Math.max(0, cracked ? 0 : shade)) * (ramp.length - 1);
        let i0 = Math.floor(v);
        if (v - i0 > b) i0++;
        let c = ramp[Math.min(ramp.length - 1, i0)];
        const ea = ed[i + 3] / 255;
        if (ea > 0.12 && dying === 0 && ea > b * 0.85) c = [ed[i], ed[i + 1], ed[i + 2]];
        if (burn) c = b > 0.5 ? [255, 210, 120] : [255, 110, 30];
        od[i] = c[0]; od[i + 1] = c[1]; od[i + 2] = c[2]; od[i + 3] = 255;
      }
    }
    // the border pixels the lighting skips: plain black
    for (let x = 0; x < W; x++) { for (const y of [0, H - 1]) { const i = (y * W + x) * 4; od[i + 3] = 255; } }
    for (let y = 0; y < H; y++) { for (const x of [0, W - 1]) { const i = (y * W + x) * 4; od[i + 3] = 255; } }
    ctx.putImageData(out, 0, 0);
  }
}

const registry = new Map<string, MonsterPicture>();
for (const p of PAINTERS) registry.set(p.id, new ShadedPicture(p));
const placeholder = new ShadedPicture(PLACEHOLDER);

export const registerPicture = (id: string, p: MonsterPicture): void => { registry.set(id, p); };
export const hasPicture = (id: string): boolean => registry.has(id);
/** The picture for a monster, or a placeholder if there is none, so a missing picture never breaks a fight. */
export const getPicture = (id: string): MonsterPicture => registry.get(id) ?? placeholder;
