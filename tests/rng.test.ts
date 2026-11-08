import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';

describe('createRng', () => {
  test('same seed gives the same first 10 values', () => {
    const a = createRng(42), b = createRng(42);
    const xs = Array.from({ length: 10 }, () => a.next());
    const ys = Array.from({ length: 10 }, () => b.next());
    expect(xs).toEqual(ys);
  });

  test('int(3,5) only returns 3, 4 or 5 and hits all three', () => {
    const r = createRng(7);
    const seen = new Set<number>();
    for (let i = 0; i < 1000; i++) seen.add(r.int(3, 5));
    expect([...seen].sort()).toEqual([3, 4, 5]);
  });

  test('chance(0) is always false and chance(1) always true', () => {
    const r = createRng(1);
    for (let i = 0; i < 200; i++) {
      expect(r.chance(0)).toBe(false);
      expect(r.chance(1)).toBe(true);
    }
  });

  test('a generator resumed from state() continues the same sequence', () => {
    const a = createRng(99);
    a.next(); a.next();
    const resumed = createRng(a.state());
    expect(resumed.next()).toBe(a.next());
  });
});
