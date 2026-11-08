/** Sound made in code: bleeps, thumps, torch crackle and a low drone. Browsers only allow audio after a click or key press. */
export type SfxName = 'step' | 'door' | 'torch' | 'hit' | 'cast' | 'death' | 'drone';

export interface AudioSystem {
  readonly unlocked: boolean;
  /** call from the first click or key press */
  unlock(): void;
  play(name: SfxName): void;
  setMuted(muted: boolean): void;
  /** suspend sound while the tab is hidden */
  onVisibilityChange(hidden: boolean): void;
}

interface Win { AudioContext?: new () => unknown; webkitAudioContext?: new () => unknown }
/* eslint-disable @typescript-eslint/no-explicit-any */
type Ctx = any;

export function createAudio(win: Win): AudioSystem {
  const Ctor = win.AudioContext ?? win.webkitAudioContext;
  let ctx: Ctx = null, master: Ctx = null, noise: Ctx = null;
  let muted = false, droneWanted = false, droneNodes: Ctx[] = [];
  let unlocked = false;

  const tone = (type: string, f0: number, f1: number, dur: number, vol: number, delay = 0) => {
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.02);
  };
  const hiss = (dur: number, vol: number, cutoff: number, delay = 0) => {
    const t = ctx.currentTime + delay;
    if (!noise) {
      noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.6), ctx.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; f.type = 'lowpass'; f.frequency.setValueAtTime(cutoff, t);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t); s.stop(t + dur + 0.02);
  };
  const startDrone = () => {
    if (droneNodes.length > 0) return;
    for (const [f, vol] of [[55, 0.05], [82.6, 0.03]] as const) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f, ctx.currentTime); g.gain.setValueAtTime(vol, ctx.currentTime);
      o.connect(g); g.connect(master); o.start(ctx.currentTime);
      droneNodes.push(o);
    }
  };
  const stopDrone = () => { for (const o of droneNodes) { try { o.stop(); } catch { /* already stopped */ } } droneNodes = []; };

  return {
    get unlocked() { return unlocked; },
    unlock() {
      if (unlocked || !Ctor) return;
      try {
        ctx = new Ctor();
        master = ctx.createGain();
        master.gain.setValueAtTime(0.5, ctx.currentTime);
        master.connect(ctx.destination);
        void ctx.resume?.();
        unlocked = true;
      } catch {
        ctx = null; unlocked = false; // no audio device: the game stays silent
      }
    },
    play(name) {
      if (!ctx || muted) return;
      try {
        switch (name) {
          case 'step': tone('sine', 95, 48, 0.09, 0.22); break;
          case 'door': hiss(0.35, 0.3, 700); tone('sawtooth', 70, 40, 0.3, 0.08); break;
          case 'torch': hiss(0.05, 0.12, 5000); hiss(0.04, 0.1, 6000, 0.07); break;
          case 'hit': hiss(0.18, 0.45, 2200); tone('sine', 130, 40, 0.2, 0.35); break;
          case 'cast': tone('sine', 300, 1100, 0.35, 0.18); tone('triangle', 450, 1500, 0.3, 0.1, 0.05); break;
          case 'death': tone('sawtooth', 220, 35, 0.9, 0.2); hiss(0.6, 0.2, 500); break;
          case 'drone': droneWanted = true; startDrone(); break;
        }
      } catch { /* a sound that fails should never stop the game */ }
    },
    setMuted(m) {
      muted = m;
      if (!ctx) return;
      if (m) stopDrone();
      else if (droneWanted) startDrone();
    },
    onVisibilityChange(hidden) {
      if (!ctx) return;
      try { void (hidden ? ctx.suspend?.() : ctx.resume?.()); } catch { /* ignore */ }
    },
  };
}
