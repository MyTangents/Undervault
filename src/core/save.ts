import type { Party } from './types';
import type { Chronicle } from './chronicle';
import type { Pos } from './dungeon/level';
import type { Settings } from './settings';

export type { Settings };

export const SAVE_KEY = 'undervault.save.v1';
export const SAVE_VERSION = 1;

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
  /** tiles whose one-time effects are spent, as "levelId:x,y,z" */
  triggered?: string[];
  /** cells closed for good by collapses and floods, as "levelId:x,y,z" */
  closed?: string[];
  /** true if the party was in town when the game was saved */
  inTown?: boolean;
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

const NUMBERS = ['level', 'xp', 'hp', 'maxHp'] as const;
function validMember(m: unknown): boolean {
  const c = m as Record<string, unknown> | null;
  if (!c || typeof c !== 'object') return false;
  if (typeof c.id !== 'string' || typeof c.name !== 'string' || typeof c.classId !== 'string' || typeof c.raceId !== 'string') return false;
  if (!c.stats || typeof c.stats !== 'object') return false;
  for (const k of NUMBERS) if (typeof c[k] !== 'number') return false;
  for (const k of ['charges', 'maxCharges', 'known', 'inventory', 'status', 'techniques']) if (!Array.isArray(c[k])) return false;
  return !!c.equipped && typeof c.equipped === 'object';
}

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
  const bad = d.party.members.findIndex((m) => !validMember(m));
  if (bad >= 0) return { data: null, message: `Party member ${bad + 1} in the save is incomplete, so it cannot be read.` };
  if (!d.chronicle || !Array.isArray(d.chronicle.entries) || !d.position || typeof d.position.levelId !== 'string' || !d.position.pos || !d.settings) {
    return { data: null, message: 'The save is incomplete and cannot be read.' };
  }
  return { data: { ...(d as SaveData), automaps: d.automaps ?? {} } };
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

/** Removes the browser save (used when a party is wiped: the dead stay dead). */
export function clearSave(store: StorageLike = defaultStore()): { ok: boolean } {
  try { store.removeItem(SAVE_KEY); return { ok: true }; } catch { return { ok: false }; }
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
