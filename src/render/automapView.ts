import type { CellKind, Level, Pos } from '../core/dungeon/level';
import { layerView, type Automap } from '../core/dungeon/automap';

const COLORS: Record<CellKind, string> = {
  solid: '#6b5f46', floor: '#2b2519', void: '#0d141a', stairsUp: '#7f9468', stairsDown: '#6a7f58', door: '#b8923e',
  pit: '#a8402e', teleporter: '#8a5aa8', spinner: '#a8742e', dark: '#15130f', antimagic: '#3a3a52', encounter: '#2b2519', event: '#2b2519',
};

/**
 * The overhead map of one storey at a time, filled in as the party explores. With the automap setting off it draws
 * nothing (the model still records what was seen, so turning it back on shows everything so far).
 */
export class AutomapView {
  constructor(private canvas: HTMLCanvasElement) {}

  draw(map: Automap, level: Level, pos: Pos, facing: number, z: number, mode: 'on' | 'off'): void {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    const { width: w, height: h } = this.canvas;
    ctx.fillStyle = '#0a0806';
    ctx.fillRect(0, 0, w, h);
    if (mode === 'off') return;
    const cell = Math.min(w / level.w, h / level.h);
    for (const c of layerView(map, level, z)) {
      if (!c.known) continue;
      const x = c.x * cell, y = c.y * cell;
      ctx.fillStyle = COLORS[c.kind];
      ctx.fillRect(x, y, cell, cell);
      if (c.kind !== 'solid') {
        ctx.strokeStyle = '#3a3020';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
      }
      if (c.kind === 'stairsUp' || c.kind === 'stairsDown') {
        ctx.fillStyle = '#10140c';
        ctx.font = `${Math.max(8, cell * 0.8)}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(c.kind === 'stairsUp' ? '▲' : '▼', x + cell / 2, y + cell / 2);
      }
      if (c.overheadVoid) {
        // open air above this cell: a tall space
        ctx.fillStyle = '#9ab0c0';
        ctx.fillRect(x + cell / 2 - 1, y + cell / 2 - 1, 2, 2);
      }
    }
    if (pos.z === z) {
      const cx = (pos.x + 0.5) * cell, cy = (pos.y + 0.5) * cell, r = Math.max(3, cell * 0.38);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(facing * (Math.PI / 2));
      ctx.fillStyle = '#f0e0a0';
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.8, r * 0.8);
      ctx.lineTo(-r * 0.8, r * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#c8b88a';
    ctx.font = '11px Georgia, serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`storey ${z + 1} of ${level.layers}`, 4, h - 5);
  }
}
