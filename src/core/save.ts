import type { Party } from './types';
import type { Chronicle } from './chronicle';
import type { Pos } from './dungeon/level';

export const SAVE_KEY = 'undervault.save.v1';
export const SAVE_VERSION = 1;

export interface Settings {
  automap: 'on' | 'off';
  bloom: number;
  flicker: number;
  fog: number;
  quality: 'low' | 'normal';
}

export interface SaveData {
  game: 'undervault';
  version: number;
  party: Party;
  chronicle: Chronicle;
  /** per level id: a serialised automap */
  automaps: Record<string, string>;
  position: { levelId: string; pos: Pos; facing: number };
  day: number;
  settings: Settings;
}

/** The slice of the browser's Storage API we use, so tests can pass a fake. */
export interface StorageLike {
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
  removeItem(k: string): void;
}

const BLOCKED: StorageLike = {
  getItem: () => { throw new Error('browser storage is unavailable'); },
  setItem: () => { throw new Error('browser storage is unavailable'); },
  removeItem: () => { throw new Error('browser storage is unavailable'); },
};

/** The browser's localStorage, or a stand-in that throws when it is blocked (private windows, cleared site data). */
export function defaultStore(): StorageLike {
  try {
    return (globalThis as { localStorage?: StorageLike }).localStorage ?? BLOCKED;
  } catch {
    return BLOCKED;
  }
}

export const exportSave = (s: SaveData): string => JSON.stringify(s, null, 1);

/** Checks and, if needed, upgrades a save's text. Never throws. */
function parseSave(text: string): { data: SaveData | null; message?: string } {
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { return { data: null, message: 'The save could not be read: it is corrupt.' }; }
  if (typeof raw !== 'object' || raw === null || (raw as { game?: unknown }).game !== 'undervault') {
    return { data: null, message: 'That file is not an Undervault save.' };
  }
  const d = raw as Partial<SaveData>;
  if (typeof d.version !== 'number') return { data: null, message: 'The save has no version, so it cannot be read.' };
  if (d.version > SAVE_VERSION) return { data: null, message: 'This save is from a newer version of the game. Update the game to open it.' };
  if (!d.party || !Array.isArray(d.party.members)) return { data: null, message: 'The save is missing its party.' };
  if (!d.chronicle || !d.position || !d.settings) return { data: null, message: 'The save is incomplete and cannot be read.' };
  return { data: d as SaveData };
}

export const importSave = (text: string): { data: SaveData | null; message?: string } => parseSave(text);

export function saveGame(s: SaveData, store: StorageLike = defaultStore()): { ok: boolean; message?: string } {
  try {
    store.setItem(SAVE_KEY, exportSave(s));
    return { ok: true };
  } catch {
    return { ok: false, message: 'Could not save to browser storage (it may be blocked or full). Use Save to file instead.' };
  }
}

export function loadGame(store: StorageLike = defaultStore()): { data: SaveData | null; message?: string } {
  let text: string | null;
  try { text = store.getItem(SAVE_KEY); } catch {
    return { data: null, message: 'Could not read browser storage, so no saved game was loaded. You can still load from a file.' };
  }
  if (text === null) return { data: null };
  return parseSave(text);
}

/** A file name that says who and when, and is safe on any system. */
export function saveFilename(s: SaveData): string {
  const first = s.party.members[0]?.name ?? 'party';
  const slug = first.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'party';
  return `undervault-${slug}-party-day${s.day}.json`;
}
