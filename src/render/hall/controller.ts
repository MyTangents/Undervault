import type { Level, Move, Pos } from '../../core/dungeon/level';
import { DIRS, step } from '../../core/dungeon/level';
import { STOREY_H } from './geometry';

export type Command = Move | 'turnLeft' | 'turnRight';
export interface CameraState { x: number; y: number; z: number; yaw: number; pitch: number }

export const EYE = 0.55;

type Anim =
  | { type: 'move' | 'climb' | 'fall'; t0: number; dur: number; from: CameraState; to: CameraState; fell: number }
  | { type: 'turn'; t0: number; dur: number; from: number; to: number }
  | { type: 'bump'; t0: number; dur: number; base: CameraState; dx: number; dz: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

/**
 * Grid-step first-person movement with smooth animation: steps, quarter turns, stairs, falls and bumps.
 * Pure of the DOM and of Three.js: feed it the clock through `update`. At most one command waits in the queue.
 */
export class Controller {
  facing: number;
  pending: Command | null = null;
  onArrive: (pos: Pos, fell: number) => void = () => {};
  private logical: Pos;
  private clock = 0;
  private anim: Anim | null = null;
  private cam: CameraState;
  private pitchTarget = 0;

  constructor(private level: Level, start: Pos, facing: number) {
    this.logical = { ...start };
    this.facing = facing;
    this.cam = this.restingCamera(start, -facing * (Math.PI / 2));
  }

  get pos(): Pos { return { ...this.logical }; }
  get busy(): boolean { return this.anim !== null; }

  private restingCamera(p: Pos, yaw: number): CameraState {
    return { x: p.x + 0.5, y: p.z * STOREY_H + EYE, z: p.y + 0.5, yaw, pitch: 0 };
  }

  command(c: Command): void {
    if (this.anim) { this.pending = c; return; }
    this.start(c);
  }

  /** Look up or down (radians); eased in `update`. */
  look(delta: number): void {
    this.pitchTarget = Math.max(-0.6, Math.min(0.6, this.pitchTarget + delta));
  }

  private start(c: Command): void {
    const t0 = this.clock;
    if (c === 'turnLeft' || c === 'turnRight') {
      const left = c === 'turnLeft';
      this.facing = (this.facing + (left ? 3 : 1)) % 4;
      this.anim = { type: 'turn', t0, dur: 200, from: this.cam.yaw, to: this.cam.yaw + (left ? 1 : -1) * (Math.PI / 2) };
      return;
    }
    const r = step(this.level, this.logical, this.facing, c);
    if (!r) {
      const dir = c === 'fwd' ? this.facing : c === 'back' ? (this.facing + 2) % 4 : c === 'left' ? (this.facing + 3) % 4 : c === 'right' ? (this.facing + 1) % 4 : -1;
      const [dx, dz] = dir >= 0 ? DIRS[dir] : [0, 0];
      this.anim = { type: 'bump', t0, dur: 170, base: { ...this.cam }, dx, dz };
      return;
    }
    const from = { ...this.cam };
    const to = this.restingCamera(r.pos, this.cam.yaw);
    const type = r.fell > 0 ? 'fall' : r.pos.z !== this.logical.z ? 'climb' : 'move';
    const dur = type === 'fall' ? 300 + 150 * r.fell : type === 'climb' ? 450 : 230;
    this.logical = r.pos;
    this.anim = { type, t0, dur, from, to: { ...to, pitch: from.pitch }, fell: r.fell };
  }

  update(nowMs: number): CameraState {
    this.clock = Math.max(this.clock, nowMs); // time never runs backwards
    const a = this.anim;
    if (a) {
      const k = clamp01((this.clock - a.t0) / a.dur);
      if (a.type === 'turn') {
        this.cam = { ...this.cam, yaw: a.from + (a.to - a.from) * ease(k) };
      } else if (a.type === 'bump') {
        const s = Math.sin(k * Math.PI) * 0.09;
        this.cam = { ...a.base, x: a.base.x + a.dx * s, z: a.base.z + a.dz * s };
      } else {
        const h = a.type === 'fall' ? clamp01(k / 0.4) : ease(k);
        const v = a.type === 'fall' ? k * k : ease(k);
        const bob = a.type === 'move' ? Math.sin(k * Math.PI * 2) * 0.02 : 0;
        this.cam = {
          ...this.cam,
          x: a.from.x + (a.to.x - a.from.x) * h,
          z: a.from.z + (a.to.z - a.from.z) * h,
          y: a.from.y + (a.to.y - a.from.y) * v + bob,
        };
      }
      if (k >= 1) {
        this.anim = null;
        if (a.type === 'turn') this.cam = { ...this.cam, yaw: a.to };
        else if (a.type === 'bump') this.cam = { ...a.base };
        else { this.cam = { ...a.to, pitch: this.cam.pitch }; this.onArrive(this.pos, a.fell); }
        const next = this.pending;
        this.pending = null;
        if (next) this.start(next);
      }
    }
    this.cam = { ...this.cam, pitch: this.cam.pitch + (this.pitchTarget - this.cam.pitch) * 0.2 };
    return this.cam;
  }
}

export const createController = (level: Level, start: Pos, facing: number): Controller => new Controller(level, start, facing);
