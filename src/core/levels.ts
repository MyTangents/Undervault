import type { Level } from './dungeon/level';
import { parseLevel } from './dungeon/level';

/** The demo levels, in order. Their text lives in /levels/*.level and is bundled with the game. */
export const LEVEL_IDS = ['crypt', 'caverns', 'deep'] as const;
export type LevelId = (typeof LEVEL_IDS)[number];

const sources = import.meta.glob('../../levels/*.level', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const cache = new Map<string, Level>();

/** Parses (once) and returns a level by id. Throws a LevelError with a line number if the file is malformed. */
export function loadLevel(id: string): Level {
  const hit = cache.get(id);
  if (hit) return hit;
  const path = Object.keys(sources).find((p) => p.endsWith(`/${id}.level`));
  if (!path) throw new Error(`no such level ${id}`);
  const level = parseLevel(sources[path]);
  cache.set(id, level);
  return level;
}

/** A fresh copy for a new game, since closures (collapses) edit a level in place. */
export function freshLevel(id: string): Level {
  cache.delete(id);
  return loadLevel(id);
}
