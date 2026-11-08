import { describe, expect, test } from 'vitest';
import { addToParty, emptyParty } from '../src/core/party';
import { addEntry, newChronicle } from '../src/core/chronicle';
import {
  SAVE_KEY, SAVE_VERSION, exportSave, importSave, loadGame, saveFilename, saveGame, type SaveData, type StorageLike,
} from '../src/core/save';
import { hero } from './helpers';

const data = (): SaveData => ({
  game: 'undervault',
  version: SAVE_VERSION,
  party: addToParty(addToParty(emptyParty(), hero('Brannoc')), hero('Gudrun')),
  chronicle: addEntry(newChronicle(), { day: 1, kind: 'town', text: 'Went down. Came up.' }),
  automaps: { crypt: '{"seen":["1,1,0"],"known":[]}' },
  position: { levelId: 'crypt', pos: { x: 1, y: 1, z: 0 }, facing: 1 },
  day: 3,
  settings: { automap: 'on', bloom: 0.5, flicker: 1, fog: 0.28, lamp: 0.8, quality: 'normal' },
});

const memory = (): StorageLike & { map: Map<string, string> } => {
  const map = new Map<string, string>();
  return { map, getItem: (k) => map.get(k) ?? null, setItem: (k, v) => { map.set(k, v); }, removeItem: (k) => { map.delete(k); } };
};
const broken: StorageLike = {
  getItem: () => { throw new Error('blocked'); },
  setItem: () => { throw new Error('blocked'); },
  removeItem: () => { throw new Error('blocked'); },
};

describe('browser storage', () => {
  test('a save round-trips through storage', () => {
    const store = memory();
    expect(saveGame(data(), store).ok).toBe(true);
    expect(store.map.has(SAVE_KEY)).toBe(true);
    expect(loadGame(store).data).toEqual(data());
  });

  test('with no save, load returns nothing and no message', () => {
    expect(loadGame(memory())).toEqual({ data: null });
  });

  test('storage that throws on read and write gives a message, never an exception', () => {
    const s = saveGame(data(), broken);
    expect(s.ok).toBe(false);
    expect(s.message).toMatch(/storage|browser/i);
    const l = loadGame(broken);
    expect(l.data).toBeNull();
    expect(l.message).toBeTruthy();
  });

  test('a corrupt save or one from a newer version starts fresh with a message', () => {
    const store = memory();
    store.setItem(SAVE_KEY, '{not json');
    const corrupt = loadGame(store);
    expect(corrupt.data).toBeNull();
    expect(corrupt.message).toMatch(/corrupt|read/i);
    store.setItem(SAVE_KEY, JSON.stringify({ ...data(), version: SAVE_VERSION + 1 }));
    const newer = loadGame(store);
    expect(newer.data).toBeNull();
    expect(newer.message).toMatch(/newer/i);
  });
});

describe('save files (play on any device)', () => {
  test('export then import returns identical data, as a file moved between devices would', () => {
    const text = exportSave(data());
    expect(JSON.parse(text).game).toBe('undervault');
    expect(importSave(text)).toEqual({ data: data() });
  });

  test('import rejects a JSON file that is not an Undervault save', () => {
    const r = importSave(JSON.stringify({ hello: 'world' }));
    expect(r.data).toBeNull();
    expect(r.message).toMatch(/not an undervault save/i);
    expect(importSave(JSON.stringify({ ...data(), game: 'other' })).data).toBeNull();
  });

  test('import rejects text that is not JSON, and a file with the party missing', () => {
    expect(importSave('hello').data).toBeNull();
    const { party: _party, ...rest } = data();
    expect(importSave(JSON.stringify(rest)).message).toMatch(/party/i);
  });

  test('the file name says who and when, and is safe on any system', () => {
    expect(saveFilename(data())).toBe('undervault-brannoc-party-day3.json');
    const odd = data();
    odd.party.members[0].name = 'A/B:C*?';
    expect(saveFilename(odd)).toMatch(/^[a-z0-9.-]+$/);
  });
});

describe('review fixes: save hygiene', () => {
  test('clearSave removes the browser save, so a dead party cannot be reloaded', async () => {
    const { clearSave } = await import('../src/core/save');
    const store = memory();
    saveGame(data(), store);
    expect(loadGame(store).data).not.toBeNull();
    expect(clearSave(store).ok).toBe(true);
    expect(loadGame(store)).toEqual({ data: null });
    expect(clearSave(broken).ok).toBe(false);
  });

  test('a save whose party members are missing required fields is refused with a message', () => {
    const d = JSON.parse(exportSave(data()));
    delete d.party.members[0].stats;
    const r = importSave(JSON.stringify(d));
    expect(r.data).toBeNull();
    expect(r.message).toMatch(/member|incomplete/i);
  });

  test('a save from before automaps were kept still loads, with an empty map', () => {
    const d = JSON.parse(exportSave(data()));
    delete d.automaps;
    const r = importSave(JSON.stringify(d));
    expect(r.data?.automaps).toEqual({});
  });
});
