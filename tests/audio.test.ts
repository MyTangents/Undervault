import { describe, expect, test } from 'vitest';
import { createAudio } from '../src/render/audio';

/** A fake AudioContext that counts what the game asks it to make. */
class FakeParam { setValueAtTime() {} exponentialRampToValueAtTime() {} linearRampToValueAtTime() {} value = 0 }
class FakeNode { gain = new FakeParam(); frequency = new FakeParam(); Q = new FakeParam(); type = ''; buffer: unknown = null; loop = false;
  connect() { return this; } disconnect() {} start() {} stop() {} }
class FakeContext {
  static made = { oscillators: 0, sources: 0 };
  state = 'suspended'; currentTime = 0; sampleRate = 8000; destination = {};
  calls: string[] = [];
  createOscillator() { FakeContext.made.oscillators++; return new FakeNode(); }
  createGain() { return new FakeNode(); }
  createBiquadFilter() { return new FakeNode(); }
  createBufferSource() { FakeContext.made.sources++; return new FakeNode(); }
  createBuffer(_c: number, n: number) { return { getChannelData: () => new Float32Array(n) }; }
  resume() { this.calls.push('resume'); this.state = 'running'; return Promise.resolve(); }
  suspend() { this.calls.push('suspend'); this.state = 'suspended'; return Promise.resolve(); }
}
const made = () => FakeContext.made.oscillators + FakeContext.made.sources;
const reset = () => { FakeContext.made = { oscillators: 0, sources: 0 }; };

describe('procedural audio', () => {
  test('with no AudioContext every call is a silent no-op', () => {
    const a = createAudio({});
    expect(() => { a.unlock(); a.play('hit'); a.setMuted(true); a.onVisibilityChange(true); }).not.toThrow();
    expect(a.unlocked).toBe(false);
  });

  test('nothing plays before the first gesture unlocks audio', () => {
    reset();
    const a = createAudio({ AudioContext: FakeContext as never });
    a.play('hit');
    expect(made()).toBe(0);
    a.unlock();
    a.play('hit');
    expect(made()).toBeGreaterThan(0);
    expect(a.unlocked).toBe(true);
  });

  test('every sound effect can be played once audio is unlocked', () => {
    reset();
    const a = createAudio({ AudioContext: FakeContext as never });
    a.unlock();
    for (const name of ['step', 'door', 'torch', 'hit', 'cast', 'death', 'drone'] as const) {
      const before = made();
      expect(() => a.play(name), name).not.toThrow();
      expect(made(), name).toBeGreaterThan(before);
    }
  });

  test('muting silences new sounds, and unmuting brings them back', () => {
    reset();
    const a = createAudio({ AudioContext: FakeContext as never });
    a.unlock();
    a.setMuted(true);
    const before = made();
    a.play('hit');
    expect(made()).toBe(before);
    a.setMuted(false);
    a.play('hit');
    expect(made()).toBeGreaterThan(before);
  });

  test('a hidden tab suspends the context and showing it again resumes it', () => {
    reset();
    const ctxs: FakeContext[] = [];
    class Spy extends FakeContext { constructor() { super(); ctxs.push(this); } }
    const a = createAudio({ AudioContext: Spy as never });
    a.unlock();
    a.onVisibilityChange(true);
    expect(ctxs[0].calls).toContain('suspend');
    a.onVisibilityChange(false);
    expect(ctxs[0].calls.filter((c) => c === 'resume').length).toBeGreaterThanOrEqual(2);
  });

  test('a context that fails to start does not break the game', () => {
    class Broken { constructor() { throw new Error('no audio device'); } }
    const a = createAudio({ AudioContext: Broken as never });
    expect(() => { a.unlock(); a.play('hit'); }).not.toThrow();
    expect(a.unlocked).toBe(false);
  });
});
