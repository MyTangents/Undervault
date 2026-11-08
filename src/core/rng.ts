/** Seeded random numbers (mulberry32). All game randomness goes through this so fights can be replayed and simulated. */
export interface Rng {
  next(): number;
  int(min: number, max: number): number;
  pick<T>(a: readonly T[]): T;
  chance(p: number): boolean;
  state(): number;
}

export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p,
    state: () => a,
  };
}
