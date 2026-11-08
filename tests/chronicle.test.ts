import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { parseLevel } from '../src/core/dungeon/level';
import { addEntry, CHRONICLE_LIMIT, newChronicle, renderChronicle } from '../src/core/chronicle';
import { triggerEvent } from '../src/core/events';
import { addToParty, emptyParty } from '../src/core/party';
import type { Party } from '../src/core/types';
import { hero, withHp } from './helpers';

const level = (rows: string[], mark: string, start = '1 1 0 E') =>
  parseLevel(['name: Test Hall', `start: ${start}`, mark, '', '@z 0', ...rows, ''].join('\n'));

// the collapse can close (2,1) because a loop (row 3) still leads back to the start
const loopHall = (kind: string, extra = '') => level(
  ['#######', '#..V..#', '#.###.#', '#.....#', '#######'],
  `mark 3 1 0 event=${kind} place=The_Tallow_Stair closes=2,1,0 ${extra}`,
);
// the collapse would seal the only way back, so it must not happen
const corridor = level(['#######', '#..V..#', '#######'], 'mark 3 1 0 event=collapse place=The_Tallow_Stair closes=2,1,0');

const party = (): Party => {
  let p = emptyParty();
  for (const n of ['Brannoc', 'Isolde', 'Orsk']) p = addToParty(p, withHp(hero(n), 12));
  return p;
};
const at = { x: 3, y: 1, z: 0 };

describe('chronicle', () => {
  test('entries get ids, render newest first, and the list is capped', () => {
    let c = newChronicle();
    for (let i = 0; i < CHRONICLE_LIMIT + 20; i++) c = addEntry(c, { day: i, kind: 'town', text: `entry ${i}` });
    expect(c.entries).toHaveLength(CHRONICLE_LIMIT);
    expect(new Set(c.entries.map((e) => e.id)).size).toBe(CHRONICLE_LIMIT);
    const lines = renderChronicle(c, 2);
    expect(lines).toEqual([`Day ${CHRONICLE_LIMIT + 19}: entry ${CHRONICLE_LIMIT + 19}`, `Day ${CHRONICLE_LIMIT + 18}: entry ${CHRONICLE_LIMIT + 18}`]);
  });

  test('survives a JSON round trip', () => {
    const c = addEntry(newChronicle(), { day: 1, kind: 'event', text: 'x', cause: 'tile:1,1,0' });
    expect(JSON.parse(JSON.stringify(c))).toEqual(c);
  });
});

describe('story events', () => {
  test('a tile with no event does nothing', () => {
    const r = triggerEvent(corridor, { x: 1, y: 1, z: 0 }, party(), createRng(1), { day: 1 });
    expect(r.entries).toEqual([]);
    expect(r.closed).toEqual([]);
  });

  test('a collapse closes its route when another way back exists, and hurts but never kills', () => {
    const p = { ...party(), members: party().members.map((m) => ({ ...m, hp: 2 })) };
    const r = triggerEvent(loopHall('collapse'), at, p, createRng(2), { day: 4 });
    expect(r.closed).toEqual([{ x: 2, y: 1, z: 0 }]);
    expect(r.party.members.every((m) => m.hp >= 1 && !m.dead)).toBe(true);
    expect(r.entries[0]).toMatchObject({ kind: 'event', day: 4 });
  });

  test('a collapse never seals the only way back', () => {
    const r = triggerEvent(corridor, at, party(), createRng(2), { day: 4 });
    expect(r.closed).toEqual([]);
    expect(r.entries[0].text).toMatch(/held/i);
  });

  test('every event entry names a cause the player could trace, and the place name is used', () => {
    for (const kind of ['collapse', 'flood', 'monstersClash', 'cursedRelic']) {
      const p = party();
      p.members[0] = { ...p.members[0], inventory: ['short-sword', 'bread-knife'] };
      const r = triggerEvent(loopHall(kind), at, p, createRng(5), { day: 2 });
      expect(r.entries.length, kind).toBeGreaterThan(0);
      for (const e of r.entries) {
        expect(e.cause, kind).toBeTruthy();
        expect(e.text, kind).toContain('Tallow Stair');
      }
    }
  });

  test('the cause points at an earlier chronicle entry when there is one', () => {
    const c = addEntry(newChronicle(), { day: 1, kind: 'discovery', text: 'found the hungry relic' });
    const p = party();
    p.members[0] = { ...p.members[0], inventory: ['short-sword', 'bread-knife'] };
    const r = triggerEvent(loopHall('cursedRelic'), at, p, createRng(5), { day: 2, chronicle: c });
    expect(r.entries[0].cause).toBe(c.entries[0].id);
  });

  test('a flood costs casters a first-level charge, and a monster clash pays gold', () => {
    const p = party();
    p.members[1] = { ...hero('Isolde', 'spellwright', { iq: 4, str: 0 }) };
    const flood = triggerEvent(loopHall('flood'), at, p, createRng(1), { day: 1 });
    expect(flood.party.members[1].charges[0]).toBe(p.members[1].charges[0] - 1);
    const clash = triggerEvent(loopHall('monstersClash'), at, party(), createRng(1), { day: 1 });
    expect(clash.party.gold).toBeGreaterThan(party().gold);
  });

  test('a cursed relic eats an item from someone\'s pack', () => {
    const p = party();
    p.members[0] = { ...p.members[0], inventory: ['short-sword', 'bread-knife'] };
    const r = triggerEvent(loopHall('cursedRelic'), at, p, createRng(9), { day: 1 });
    expect(r.party.members[0].inventory).toHaveLength(1);
  });

  test('the same seed gives the same outcome', () => {
    const a = triggerEvent(loopHall('collapse'), at, party(), createRng(8), { day: 1 });
    const b = triggerEvent(loopHall('collapse'), at, party(), createRng(8), { day: 1 });
    expect(a).toEqual(b);
  });
});
