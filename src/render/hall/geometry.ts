import type { Level, Pos } from '../../core/dungeon/level';
import { DIRS, isStandable } from '../../core/dungeon/level';
import { hexToLinear, paletteFor, type RGB } from './palettes';

/** Height of one storey in world units. Storey z has its floor at y = z * STOREY_H. */
export const STOREY_H = 1.15;

export interface TorchSpec {
  /** wall normal (points into the open cell) and tangent along the wall */
  n: [number, number, number];
  t: [number, number, number];
  /** where the bracket meets the wall, and where the flame starts */
  P: [number, number, number];
  B: [number, number, number];
  /** where its light is cast from */
  light: [number, number, number];
  area: string;
  flicker: number;
  colour: RGB;
}
export interface RuneSpec { pos: [number, number, number]; kind: 'glyph' | 'sigil' | 'door' }

interface Buffers { positions: Float32Array; colors: Float32Array; pulses: Float32Array }
export interface HallGeometry {
  faces: Buffers;
  lines: Buffers;
  torches: TorchSpec[];
  runes: RuneSpec[];
  /** "x,y,z,N|E|S|W" for every wall face, for checking and for the automap */
  wallFaces: Set<string>;
  floorQuads: number;
  ceilQuads: number;
}

type V3 = [number, number, number];
const add = (a: V3, b: V3, s = 1): V3 => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s];
const UP: V3 = [0, 1, 0];

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

export function buildHallGeometry(level: Level): HallGeometry {
  const lp: number[] = [], lc: number[] = [], lu: number[] = [];
  const fp: number[] = [], fc: number[] = [];
  const torches: TorchSpec[] = [], runes: RuneSpec[] = [], wallFaces = new Set<string>();
  let floorQuads = 0, ceilQuads = 0;

  const L = (a: V3, b: V3, c: RGB, pulse = 0, k = 1) => {
    lp.push(...a, ...b);
    lc.push(c[0] * k, c[1] * k, c[2] * k, c[0] * k, c[1] * k, c[2] * k);
    lu.push(pulse, pulse);
  };
  const Q = (a: V3, b: V3, c: V3, d: V3, col: RGB) => {
    fp.push(...a, ...b, ...c, ...a, ...c, ...d);
    for (let i = 0; i < 6; i++) fc.push(col[0], col[1], col[2]);
  };
  const solid = (p: Pos) => !level.inBounds(p) || level.cell(p).kind === 'solid';
  const kindAt = (p: Pos) => (level.inBounds(p) ? level.cell(p).kind : 'solid');

  /** A line-drawn rune glyph on a wall (or door), seeded so it is the same every time. */
  function glyph(c: V3, n: V3, t: V3, y0: number, seed: number, col: RGB, pulse: number) {
    const r = seeded(seed), s = 0.26;
    const P = (u: number, v: number): V3 => add(add(add(c, n, 0.015), t, u), UP, y0 + 0.62 + v);
    const seg = 14;
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2, a1 = ((i + 1) / seg) * Math.PI * 2;
      L(P(Math.cos(a0) * s, Math.sin(a0) * s), P(Math.cos(a1) * s, Math.sin(a1) * s), col, pulse);
    }
    L(P(0, -s * 1.35), P(0, s * 1.35), col, pulse);
    for (let i = 0; i < 4; i++) {
      const a = r() * Math.PI * 2, b = r() * Math.PI * 2, k1 = 0.35 + r() * 0.65, k2 = 0.35 + r() * 0.65;
      L(P(Math.cos(a) * s * k1, Math.sin(a) * s * k1), P(Math.cos(b) * s * k2, Math.sin(b) * s * k2), col, pulse);
    }
    for (let i = 0; i < 3; i++) {
      const y = (r() - 0.5) * s * 1.8;
      L(P(-s * 1.25, y), P(-s * 0.8, y), col, pulse);
      L(P(s * 0.8, y), P(s * 1.25, y), col, pulse);
    }
  }

  function ring(cx: number, cz: number, y: number, rad: number, seg: number, col: RGB, pulse: number) {
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2, b = ((i + 1) / seg) * Math.PI * 2;
      L([cx + Math.cos(a) * rad, y, cz + Math.sin(a) * rad], [cx + Math.cos(b) * rad, y, cz + Math.sin(b) * rad], col, pulse);
    }
  }
  function sigil(cx: number, cz: number, y: number, r: number, col: RGB, pulse: number) {
    ring(cx, cz, y, r, 40, col, pulse);
    ring(cx, cz, y, r * 0.72, 32, col, pulse + 0.2);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2, b = (((i + 2) % 5) / 5) * Math.PI * 2 - Math.PI / 2;
      L([cx + Math.cos(a) * r * 0.72, y, cz + Math.sin(a) * r * 0.72], [cx + Math.cos(b) * r * 0.72, y, cz + Math.sin(b) * r * 0.72], col, pulse + 0.2);
    }
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      L([cx + Math.cos(a) * r * 0.9, y, cz + Math.sin(a) * r * 0.9], [cx + Math.cos(a) * r, y, cz + Math.sin(a) * r], col, pulse);
    }
  }

  for (let z = 0; z < level.layers; z++) {
    const y0 = z * STOREY_H;
    for (let y = 0; y < level.h; y++) {
      for (let x = 0; x < level.w; x++) {
        const here: Pos = { x, y, z };
        const cell = level.cell(here);

        if (cell.kind === 'solid') {
          for (let d = 0; d < 4; d++) {
            const [dx, dy] = DIRS[d];
            const nb: Pos = { x: x + dx, y: y + dy, z };
            if (!level.inBounds(nb) || level.cell(nb).kind === 'solid') continue;
            const pal = paletteFor(level.areaOf(nb));
            const edge = hexToLinear(pal.edge), wall = hexToLinear(pal.wall);
            const n: V3 = [dx, 0, dy], t: V3 = [-dy, 0, dx], c: V3 = [x + 0.5 + dx * 0.5, y0, y + 0.5 + dy * 0.5];
            const a = add(c, t, -0.5), b = add(c, t, 0.5), cc = add(b, UP, STOREY_H), dd = add(a, UP, STOREY_H);
            Q(a, b, cc, dd, wall);
            wallFaces.add(`${x},${y},${z},${'NESW'[d]}`);
            // chiselled stone: outline, a course joint, and offset block joints like masonry
            L(a, b, edge); L(b, cc, edge); L(cc, dd, edge); L(dd, a, edge);
            const mid = STOREY_H * 0.5;
            L(add(a, UP, mid), add(b, UP, mid), edge, 0, 0.42);
            L(add(c, UP, 0), add(c, UP, mid), edge, 0, 0.42);
            L(add(add(c, t, -0.25), UP, mid), add(add(c, t, -0.25), UP, STOREY_H), edge, 0, 0.42);
            L(add(add(c, t, 0.25), UP, mid), add(add(c, t, 0.25), UP, STOREY_H), edge, 0, 0.42);
            const r = seeded(x * 7919 + y * 104729 + z * 1299709 + d);
            if (r() < 0.25) {
              // a hairline crack running down the face
              let u = (r() - 0.5) * 0.6, v = STOREY_H;
              for (let i = 0; i < 5; i++) {
                const nu = u + (r() - 0.5) * 0.22, nv = v - (0.16 + r() * 0.12);
                L(add(add(c, t, u), UP, v), add(add(c, t, nu), UP, Math.max(0.02, nv)), edge, 0, 0.3);
                u = nu; v = nv;
              }
            }
            if (cell.data?.torch) {
              const P: V3 = add(add(add(c, n, 0.02), UP, 0.62), [0, 0, 0]);
              const B = add(add(P, n, 0.14), UP, 0.08);
              torches.push({ n, t, P, B, light: add(add(B, UP, 0.1), n, 0.1), area: level.areaOf(nb), flicker: pal.flicker, colour: hexToLinear(pal.torch) });
            }
            if (cell.data?.rune) {
              glyph(c, n, t, y0, x * 131 + y * 17 + z * 313 + d, hexToLinear(pal.rune), ((x * 7 + y * 3 + z) % 10) / 10 + 0.1);
              runes.push({ pos: [c[0], c[1], c[2]], kind: 'glyph' });
            }
          }
          continue;
        }

        const pal = paletteFor(level.areaOf(here));
        const grid = hexToLinear(pal.grid), edge = hexToLinear(pal.edge);
        const roofed = solid({ x, y, z: z + 1 });

        if (isStandable(cell.kind)) {
          Q([x, y0, y], [x + 1, y0, y], [x + 1, y0, y + 1], [x, y0, y + 1], hexToLinear(pal.floor));
          floorQuads++;
          const corners: V3[] = [[x, y0, y], [x + 1, y0, y], [x + 1, y0, y + 1], [x, y0, y + 1]];
          for (let i = 0; i < 4; i++) L(corners[i], corners[(i + 1) % 4], grid, 0, 0.45);
          // a ledge over open air gets a bright edge so the drop reads from far away
          const sides: [number, V3, V3][] = [[0, corners[0], corners[1]], [1, corners[1], corners[2]], [2, corners[2], corners[3]], [3, corners[3], corners[0]]];
          for (const [d, p1, p2] of sides) {
            const nb: Pos = { x: x + DIRS[d][0], y: y + DIRS[d][1], z };
            if (kindAt(nb) === 'void') L(p1, p2, edge, 0, 1);
          }
        }
        if (roofed) {
          const top = y0 + STOREY_H;
          Q([x, top, y], [x + 1, top, y], [x + 1, top, y + 1], [x, top, y + 1], hexToLinear(pal.ceil));
          ceilQuads++;
          const cs: V3[] = [[x, top, y], [x + 1, top, y], [x + 1, top, y + 1], [x, top, y + 1]];
          for (let i = 0; i < 4; i++) L(cs[i], cs[(i + 1) % 4], grid, 0, 0.3);
        }
        if (cell.kind === 'door') {
          const alongX = solid({ x, y: y - 1, z }) && solid({ x, y: y + 1, z });
          const Pt = (u: number, v: number): V3 => (alongX ? [x + 0.5, y0 + v, y + u] : [x + u, y0 + v, y + 0.5]);
          const col = hexToLinear(pal.door);
          for (const [u0, rad, hp] of [[0.1, 0.4, 0.72], [0.17, 0.33, 0.72]] as const) {
            const u1 = 1 - u0;
            L(Pt(u0, 0), Pt(u0, hp), col); L(Pt(u1, 0), Pt(u1, hp), col);
            const N = 12;
            for (let i = 0; i < N; i++) {
              const a0 = Math.PI - (i / N) * Math.PI, a1 = Math.PI - ((i + 1) / N) * Math.PI;
              L(Pt(0.5 + Math.cos(a0) * (0.5 - u0), hp + Math.sin(a0) * rad), Pt(0.5 + Math.cos(a1) * (0.5 - u0), hp + Math.sin(a1) * rad), col);
            }
          }
          glyph([x + 0.5, y0, y + 0.5], alongX ? [1, 0, 0] : [0, 0, 1], alongX ? [0, 0, 1] : [1, 0, 0], y0, 4242 + x * 31 + y, col, 0.5);
          runes.push({ pos: [x + 0.5, y0, y + 0.5], kind: 'door' });
        }
        if (cell.data?.sigil) {
          sigil(x + 0.5, y + 0.5, y0 + 0.012, Number(cell.data.sigil) || 1.2, hexToLinear(pal.rune), ((x * 3 + y * 5) % 10) / 10 + 0.1);
          runes.push({ pos: [x + 0.5, y0, y + 0.5], kind: 'sigil' });
        }
      }
    }
  }

  const buf = (p: number[], c: number[], u: number[]): Buffers => ({
    positions: new Float32Array(p), colors: new Float32Array(c), pulses: new Float32Array(u),
  });
  return {
    faces: buf(fp, fc, new Array(fp.length / 3).fill(0)),
    lines: buf(lp, lc, lu),
    torches, runes, wallFaces, floorQuads, ceilQuads,
  };
}
