/** A short running record of the party's story, kept in the save. */
export interface ChronicleEntry {
  id: string;
  day: number;
  kind: 'combat' | 'death' | 'discovery' | 'event' | 'town';
  text: string;
  /** what led to this: an earlier entry id, or `tile:x,y,z` for a spot in the dungeon */
  cause?: string;
}
export interface Chronicle { entries: ChronicleEntry[]; next: number }

export const CHRONICLE_LIMIT = 200;

export const newChronicle = (): Chronicle => ({ entries: [], next: 1 });

export function addEntry(c: Chronicle, e: Omit<ChronicleEntry, 'id'>): Chronicle {
  const entry: ChronicleEntry = { ...e, id: `c${c.next}` };
  const entries = [...c.entries, entry].slice(-CHRONICLE_LIMIT);
  return { entries, next: c.next + 1 };
}

/** Newest first. */
export function renderChronicle(c: Chronicle, limit = 10): string[] {
  return [...c.entries].reverse().slice(0, limit).map((e) => `Day ${e.day}: ${e.text}`);
}
