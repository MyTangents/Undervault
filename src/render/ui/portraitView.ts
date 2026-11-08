/** A live face: a canvas that redraws a portrait every frame (breathing, blinking, speaking). */
import { PORTRAIT_H, PORTRAIT_W, getPortrait } from '../portrait';
import type { PortraitSpec, PortraitState } from '../portrait';

const CALM: PortraitState = { hit: 0, lunge: 0, damage: 0, dying: 0, dead: false, speaking: false };

export class PortraitView {
  readonly el: HTMLCanvasElement;
  private spec: PortraitSpec | null = null;
  private state: PortraitState = { ...CALM };
  private raf = 0;
  private running = false;
  private reduced = false;

  constructor() {
    this.el = document.createElement('canvas');
    this.el.width = PORTRAIT_W;
    this.el.height = PORTRAIT_H;
    this.el.className = 'portrait';
    try { this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false; } catch { /* no matchMedia */ }
  }

  setSpec(spec: PortraitSpec): void {
    this.spec = spec;
    this.el.dataset.portrait = spec.kind === 'person' ? spec.id : 'adv';
    this.paint();
  }

  setSpeaking(on: boolean): void { this.state.speaking = on; this.paint(); }
  setState(patch: Partial<PortraitState>): void { this.state = { ...this.state, ...patch }; this.paint(); }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.paint();
    if (this.reduced) return; // a still face for people who asked for less motion
    const loop = () => {
      if (!this.running) return;
      this.paint();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private paint(): void {
    if (!this.spec) return;
    try {
      const g = this.el.getContext('2d');
      if (!g) return;
      getPortrait(this.spec).draw(g, this.reduced ? 0.6 : performance.now() / 1000, this.state);
    } catch { /* a face that cannot draw never breaks a screen */ }
  }
}

/** A fresh 32x40 element for a roster row (the cached thumbs are shared, so rows get their own copy). */
export function thumbCopy(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  try { c.getContext('2d')?.drawImage(src, 0, 0); } catch { /* blank thumb */ }
  return c;
}
