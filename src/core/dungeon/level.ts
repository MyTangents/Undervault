/**
 * 3D level model: storeys of grid cells, tall caverns made from stacked open cells, and grid-step movement.
 * Text format (see levels/test-mini.level): header lines (name:, id:, start:, area, mark), then `@z <n>` storeys of rows.
 */

export interface Pos { x: number; y: number; z: number }
export type Move = 'fwd' | 'back' | 'left' | 'right' | 'up' | 'down';
/** 0 = north (-y), 1 = east (+x), 2 = south (+y), 3 = west (-x) */
export const DIRS: readonly [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];

export type CellKind =
  | 'solid' | 'floor' | 'void' | 'stairsUp' | 'stairsDown' | 'door' | 'pit'
  | 'teleporter' | 'spinner' | 'dark' | 'antimagic' | 'encounter' | 'event';

export interface Cell { kind: CellKind; area: string; data?: Record<string, string> }

export interface Level {
  id: string;
  name: string;
  w: number;
  h: number;
  layers: number;
  /** how deep this level is, which sets the monsters met here (header line: depth: N) */
  depth: number;
  start: Pos & { facing: number };
  cell(p: Pos): Cell;
  areaOf(p: Pos): string;
  inBounds(p: Pos): boolean;
}

export class LevelError extends Error {
  constructor(message: string, public line: number) {
    super(`line ${line}: ${message}`);
    this.name = 'LevelError';
  }
}

const GLYPHS: Record<string, CellKind> = {
  '#': 'solid', '.': 'floor', '~': 'void', '<': 'stairsUp', '>': 'stairsDown', D: 'door', '^': 'pit',
  P: 'teleporter', O: 'spinner', d: 'dark', a: 'antimagic', E: 'encounter', V: 'event', S: 'floor',
};

export const isStandable = (k: CellKind): boolean => k !== 'solid' && k !== 'void';

export function step(level: Level, pos: Pos, facing: number, move: Move): { pos: Pos; fell: number } | null {
  if (move === 'up' || move === 'down') {
    const want = move === 'up' ? 'stairsUp' : 'stairsDown';
    if (level.cell(pos).kind !== want) return null;
    const t = { ...pos, z: pos.z + (move === 'up' ? 1 : -1) };
    if (!level.inBounds(t)) return null;
    const match = move === 'up' ? 'stairsDown' : 'stairsUp';
    return level.cell(t).kind === match ? { pos: t, fell: 0 } : null;
  }
  const dir = move === 'fwd' ? facing : move === 'back' ? (facing + 2) % 4 : move === 'left' ? (facing + 3) % 4 : (facing + 1) % 4;
  const [dx, dy] = DIRS[dir];
  const t = { x: pos.x + dx, y: pos.y + dy, z: pos.z };
  if (!level.inBounds(t)) return null;
  const kind = level.cell(t).kind;
  if (kind === 'solid') return null;
  if (kind === 'void') {
    let z = t.z - 1;
    while (z >= 0 && level.cell({ ...t, z }).kind === 'void') z--;
    if (z < 0 || !isStandable(level.cell({ ...t, z }).kind)) return null;
    return { pos: { ...t, z }, fell: pos.z - z };
  }
  return { pos: t, fell: 0 };
}

const key = (p: Pos) => `${p.x},${p.y},${p.z}`;

export function parseLevel(text: string): Level {
  const lines = text.split(/\r?\n/);
  let name = 'Unnamed', id = '', depth = 1;
  let start: (Pos & { facing: number }) | null = null, startLine = 1;
  const areaDirs: { id: string; z: number | '*'; x0: number; x1: number; y0: number; y1: number }[] = [];
  const marks: { p: Pos; data: Record<string, string> }[] = [];
  const storeys = new Map<number, { text: string; line: number }[]>();
  let curZ: number | null = null;

  lines.forEach((raw, i) => {
    const line = i + 1, s = raw.trim();
    if (s === '' || s.startsWith('//')) return;
    if (s.startsWith('@z')) {
      const z = Number(s.slice(2));
      if (!Number.isInteger(z) || z < 0) throw new LevelError(`bad storey header "${s}"`, line);
      curZ = z; storeys.set(z, []);
      return;
    }
    if (curZ !== null) { storeys.get(curZ)!.push({ text: s, line }); return; }
    if (s.startsWith('name:')) name = s.slice(5).trim();
    else if (s.startsWith('id:')) id = s.slice(3).trim();
    else if (s.startsWith('depth:')) depth = Number(s.slice(6).trim()) || 1;
    else if (s.startsWith('start:')) {
      const [x, y, z, f] = s.slice(6).trim().split(/\s+/);
      const facing = 'NESW'.indexOf((f ?? '').toUpperCase());
      if (facing < 0 || [x, y, z].some((n) => !Number.isInteger(Number(n)))) throw new LevelError(`bad start "${s}"`, line);
      start = { x: Number(x), y: Number(y), z: Number(z), facing }; startLine = line;
    } else if (s.startsWith('area ')) {
      const m = s.match(/^area (\S+) z=(\*|\d+) x=(\d+)-(\d+) y=(\d+)-(\d+)$/);
      if (!m) throw new LevelError(`bad area directive "${s}"`, line);
      areaDirs.push({ id: m[1], z: m[2] === '*' ? '*' : Number(m[2]), x0: +m[3], x1: +m[4], y0: +m[5], y1: +m[6] });
    } else if (s.startsWith('mark ')) {
      const [, x, y, z, ...kv] = s.split(/\s+/);
      const data: Record<string, string> = {};
      for (const pair of kv) { const [k, v = ''] = pair.split('='); data[k] = v; }
      marks.push({ p: { x: Number(x), y: Number(y), z: Number(z) }, data });
    } else throw new LevelError(`unknown header line "${s}"`, line);
  });

  if (!start) throw new LevelError('missing start: line', 1);
  if (storeys.size === 0) throw new LevelError('no storeys (@z blocks)', 1);
  const layers = Math.max(...storeys.keys()) + 1;
  for (let z = 0; z < layers; z++) if (!storeys.has(z)) throw new LevelError(`missing storey @z ${z}`, 1);

  const first = storeys.get(0)!;
  const w = first[0]?.text.length ?? 0, h = first.length;
  const cells: Cell[][][] = [];
  const lineOf = new Map<string, number>();
  for (let z = 0; z < layers; z++) {
    const rows = storeys.get(z)!;
    if (rows.length !== h) throw new LevelError(`storey ${z} has ${rows.length} rows, expected ${h}`, rows[0]?.line ?? 1);
    cells.push(rows.map((row, y) => {
      if (row.text.length !== w) throw new LevelError(`row has ${row.text.length} cells, expected ${w}`, row.line);
      return [...row.text].map((g, x) => {
        const kind = GLYPHS[g];
        if (!kind) throw new LevelError(`unknown glyph "${g}"`, row.line);
        lineOf.set(key({ x, y, z }), row.line);
        return { kind, area: 'main' } as Cell;
      });
    }));
  }
  for (const a of areaDirs) {
    for (let z = 0; z < layers; z++) {
      if (a.z !== '*' && a.z !== z) continue;
      for (let y = a.y0; y <= a.y1 && y < h; y++) for (let x = a.x0; x <= a.x1 && x < w; x++) cells[z][y][x].area = a.id;
    }
  }
  for (const m of marks) {
    const c = cells[m.p.z]?.[m.p.y]?.[m.p.x];
    if (c) c.data = { ...c.data, ...m.data };
  }

  const inBounds = (p: Pos) => p.x >= 0 && p.y >= 0 && p.z >= 0 && p.x < w && p.y < h && p.z < layers;
  const SOLID: Cell = { kind: 'solid', area: 'main' };
  const level: Level = {
    id: id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, w, h, layers, depth, start,
    inBounds,
    cell: (p) => (inBounds(p) ? cells[p.z][p.y][p.x] : SOLID),
    areaOf: (p) => (inBounds(p) ? cells[p.z][p.y][p.x].area : 'main'),
  };

  if (!inBounds(start) || !isStandable(level.cell(start).kind)) throw new LevelError('start is not a standable cell', startLine);
  for (let z = 0; z < layers; z++) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = { x, y, z }, k = level.cell(p).kind, ln = lineOf.get(key(p)) ?? 1;
    if (k === 'stairsUp' && level.cell({ ...p, z: z + 1 }).kind !== 'stairsDown') {
      throw new LevelError(`stairs up at (${x},${y},${z}) have no matching stairs down above`, ln);
    }
    if (k === 'stairsDown' && level.cell({ ...p, z: z - 1 }).kind !== 'stairsUp') {
      throw new LevelError(`stairs down at (${x},${y},${z}) have no matching stairs up below`, ln);
    }
    if (k === 'void') {
      let zz = z - 1;
      while (zz >= 0 && level.cell({ ...p, z: zz }).kind === 'void') zz--;
      if (zz < 0 || !isStandable(level.cell({ ...p, z: zz }).kind)) {
        throw new LevelError(`void at (${x},${y},${z}) has no landing below`, ln);
      }
    }
  }

  // Reachability from the start (falling is one-way; teleporters may carry `to=x,y,z`).
  const seen = new Set<string>([key(start)]);
  const queue: Pos[] = [{ x: start.x, y: start.y, z: start.z }];
  while (queue.length) {
    const p = queue.pop()!;
    const next: Pos[] = [];
    for (let f = 0; f < 4; f++) { const r = step(level, p, f, 'fwd'); if (r) next.push(r.pos); }
    for (const m of ['up', 'down'] as const) { const r = step(level, p, 0, m); if (r) next.push(r.pos); }
    const to = level.cell(p).data?.to;
    if (level.cell(p).kind === 'teleporter' && to) { const [tx, ty, tz] = to.split(',').map(Number); next.push({ x: tx, y: ty, z: tz }); }
    for (const n of next) if (!seen.has(key(n)) && inBounds(n)) { seen.add(key(n)); queue.push(n); }
  }
  for (let z = 0; z < layers; z++) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = { x, y, z };
    if (isStandable(level.cell(p).kind) && !seen.has(key(p))) {
      throw new LevelError(`floor cell at (${x},${y},${z}) is unreachable from the start`, lineOf.get(key(p)) ?? 1);
    }
  }
  return level;
}
