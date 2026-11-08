import type { CellKind, Level, Pos } from './level';
import { DIRS, isStandable } from './level';

/** What the party has seen (and which hidden tiles it knows are traps). Immutable: every function returns a new map. */
export interface Automap { seen: Set<string>; known: Set<string> }

const key = (p: Pos) => `${p.x},${p.y},${p.z}`;
export const newAutomap = (): Automap => ({ seen: new Set(), known: new Set() });

const SIGHT = 8;
const HIDDEN: ReadonlySet<CellKind> = new Set(['pit', 'teleporter', 'spinner']);

/** Cells strictly between a and b on a grid line (Bresenham), same storey. */
function between(a: Pos, b: Pos): Pos[] {
  const out: Pos[] = [];
  let x = a.x, y = a.y;
  const dx = Math.abs(b.x - a.x), dy = Math.abs(b.y - a.y);
  const sx = a.x < b.x ? 1 : -1, sy = a.y < b.y ? 1 : -1;
  let err = dx - dy;
  while (!(x === b.x && y === b.y)) {
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
    if (!(x === b.x && y === b.y)) out.push({ x, y, z: a.z });
  }
  return out;
}

export function reveal(map: Automap, level: Level, pos: Pos, facing: number): Automap {
  const seen = new Set(map.seen);
  const [fx, fy] = DIRS[facing];
  seen.add(key(pos));
  for (let dy = -SIGHT; dy <= SIGHT; dy++) {
    for (let dx = -SIGHT; dx <= SIGHT; dx++) {
      if (dx * dx + dy * dy > SIGHT * SIGHT) continue;
      const near = Math.max(Math.abs(dx), Math.abs(dy)) <= 1;
      if (!near && dx * fx + dy * fy < 0) continue; // behind the party
      const t = { x: pos.x + dx, y: pos.y + dy, z: pos.z };
      if (!level.inBounds(t)) continue;
      if (!near && between(pos, t).some((c) => level.cell(c).kind === 'solid')) continue;
      seen.add(key(t));
      if (level.cell(t).kind === 'void') {
        // look down through open air to the first standable cell
        for (let z = t.z - 1; z >= 0; z--) {
          const below = { ...t, z };
          seen.add(key(below));
          if (isStandable(level.cell(below).kind)) break;
        }
      }
    }
  }
  return { seen, known: map.known };
}

export function markKnown(map: Automap, pos: Pos): Automap {
  return { seen: map.seen, known: new Set(map.known).add(key(pos)) };
}

export interface MapCell { x: number; y: number; kind: CellKind; known: boolean; overheadVoid: boolean }

export function layerView(map: Automap, level: Level, z: number): MapCell[] {
  const out: MapCell[] = [];
  for (let y = 0; y < level.h; y++) {
    for (let x = 0; x < level.w; x++) {
      const p = { x, y, z };
      const k = level.cell(p).kind;
      const isKnown = map.seen.has(key(p));
      const shown: CellKind = HIDDEN.has(k) && !map.known.has(key(p)) ? 'floor' : k;
      out.push({ x, y, kind: shown, known: isKnown, overheadVoid: level.cell({ x, y, z: z + 1 }).kind === 'void' });
    }
  }
  return out;
}

export const serializeAutomap = (m: Automap): string =>
  JSON.stringify({ seen: [...m.seen], known: [...m.known] });

export function deserializeAutomap(text: string): Automap {
  const d = JSON.parse(text) as { seen?: string[]; known?: string[] };
  return { seen: new Set(d.seen ?? []), known: new Set(d.known ?? []) };
}
