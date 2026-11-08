import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { Game } from '../src/core/game';
import { demoParty } from '../src/core/sim';
import { loadLevel } from '../src/core/levels';
import { makeGroup } from '../src/core/combat/engine';
import { MONSTERS } from '../src/core/data';
import { isActive } from '../src/core/combat/util';

const def = (id: string) => MONSTERS.find((m) => m.id === id)!;
const newGame = (seed = 1) => Game.newGame(demoParty(), createRng(seed));
const goto = (g: Game, level: string, x: number, y: number, z: number, facing = 1) => {
  g.enterLevel(level, { x, y, z, facing });
};

describe('starting out', () => {
  test('a new game begins at the Gullet in the first level, with the area around it already on the map', () => {
    const g = newGame();
    expect(g.state.levelId).toBe('crypt');
    expect(g.state.pos).toEqual({ x: 3, y: 3, z: 0 });
    expect(g.automap().seen.has('3,3,0')).toBe(true);
  });

  test('walking back onto the Gullet returns to town, and entering the dungeon again starts there', () => {
    const g = newGame();
    expect(g.onArrive({ x: 3, y: 3, z: 0 }, 0, 1)).toContainEqual({ kind: 'exit', to: 'town' });
    g.returnToTown();
    g.enterDungeon();
    expect(g.state.levelId).toBe('crypt');
    expect(g.state.pos).toEqual({ x: 3, y: 3, z: 0 });
  });
});

describe('what a tile does', () => {
  test('a discovery is picked up once, recorded in the chronicle, and opens what it unlocks', () => {
    const g = newGame();
    goto(g, 'crypt', 26, 3, 0);
    const first = g.onArrive({ x: 27, y: 3, z: 0 }, 0, 1);
    expect(first).toContainEqual({ kind: 'discovery', id: 'lienholders-primer' });
    expect(g.state.party.discoveries).toContain('lienholders-primer');
    expect(g.state.party.members.find((m) => m.classId === 'spellwright')!.known).toContain('kiln-roar');
    expect(g.state.chronicle.entries.some((e) => e.kind === 'discovery')).toBe(true);
    expect(g.onArrive({ x: 27, y: 3, z: 0 }, 0, 1).some((r) => r.kind === 'discovery')).toBe(false);
  });

  test('an exit to another level moves the party to the named cell and facing', () => {
    const g = newGame();
    goto(g, 'crypt', 28, 3, 0);
    const res = g.onArrive({ x: 29, y: 3, z: 0 }, 0, 1);
    expect(res).toContainEqual({ kind: 'exit', to: 'caverns' });
    g.followExit('caverns');
    expect(g.state.levelId).toBe('caverns');
    expect(g.state.pos).toEqual({ x: 11, y: 2, z: 4 });
    expect(g.state.facing).toBe(2);
  });

  test('a fixed encounter brings its monsters, and is cleared only by winning', () => {
    const g = newGame();
    goto(g, 'crypt', 14, 10, 0, 2);
    const res = g.onArrive({ x: 14, y: 11, z: 0 }, 0, 2);
    const enc = res.find((r) => r.kind === 'encounter') as { kind: 'encounter'; groups: ReturnType<typeof makeGroup>[]; fixedKey?: string };
    expect(enc.groups.map((x) => [x.def.id, x.hp.length])).toEqual([['tally-skeleton', 4], ['drum-orc', 2]]);
    g.finishEncounter({ outcome: 'fled', xp: 0, gold: 0, party: g.state.party, groups: enc.groups }, enc.fixedKey);
    expect(g.onArrive({ x: 14, y: 11, z: 0 }, 0, 2).some((r) => r.kind === 'encounter')).toBe(true); // still there
    g.finishEncounter({ outcome: 'won', xp: 100, gold: 20, party: g.state.party, groups: enc.groups }, enc.fixedKey);
    expect(g.onArrive({ x: 14, y: 11, z: 0 }, 0, 2).some((r) => r.kind === 'encounter' && r.fixedKey)).toBe(false);
  });

  test('a collapse closes the route for good, and the closure survives saving and loading', () => {
    const g = newGame();
    goto(g, 'crypt', 14, 6, 0, 2);
    const res = g.onArrive({ x: 14, y: 7, z: 0 }, 0, 2);
    expect(res.some((r) => r.kind === 'event')).toBe(true);
    expect(loadLevel('crypt').cell({ x: 14, y: 6, z: 0 }).kind).toBe('solid');
    const back = Game.fromSave(g.toSave(), createRng(2));
    expect(back.level().cell({ x: 14, y: 6, z: 0 }).kind).toBe('solid');
    expect(back.state.chronicle.entries.some((e) => e.kind === 'event')).toBe(true);
    expect(g.onArrive({ x: 14, y: 7, z: 0 }, 0, 2).some((r) => r.kind === 'event')).toBe(false); // only once
  });

  test('a fall hurts every living member but never kills, and is written down', () => {
    const g = newGame();
    goto(g, 'caverns', 11, 9, 0);
    const before = g.state.party.members.map((m) => m.hp);
    const res = g.onArrive({ x: 11, y: 9, z: 0 }, 3, 1);
    expect(res.some((r) => r.kind === 'fall')).toBe(true);
    g.state.party.members.forEach((m, i) => { expect(m.hp).toBeLessThan(before[i] + 1); expect(m.hp).toBeGreaterThanOrEqual(1); });
    expect(g.state.chronicle.entries.length).toBeGreaterThan(0);
  });

  test('a pit costs hit points but leaves everyone alive', () => {
    const g = newGame();
    goto(g, 'deep', 3, 8, 3);
    const res = g.onArrive({ x: 4, y: 8, z: 3 }, 0, 1);
    expect(res.some((r) => r.kind === 'pit')).toBe(true);
    expect(g.state.party.members.every((m) => m.hp >= 1)).toBe(true);
  });
});

describe('random encounters', () => {
  test('a modest share of ordinary steps meet monsters native to the depth', () => {
    const g = newGame(7);
    let met = 0;
    const n = 600;
    for (let i = 0; i < n; i++) {
      goto(g, 'crypt', 10, 3, 0);
      const r = g.onArrive({ x: 11, y: 2, z: 0 }, 0, 1).find((x) => x.kind === 'encounter');
      if (r && r.kind === 'encounter') {
        met++;
        expect(r.groups.length).toBeGreaterThan(0);
        for (const grp of r.groups) expect(grp.def.depth[0]).toBeLessThanOrEqual(1);
      }
    }
    expect(met / n).toBeGreaterThan(0.03);
    expect(met / n).toBeLessThan(0.2);
  });

  test('a wiped party meets nothing and the game is over', () => {
    const g = newGame();
    g.state.party = { ...g.state.party, members: g.state.party.members.map((m) => ({ ...m, hp: 0, dead: true })) };
    expect(g.isOver()).toBe(true);
    expect(g.onArrive({ x: 11, y: 2, z: 0 }, 0, 1)).toEqual([]);
  });
});

describe('after a fight', () => {
  test('winning pays xp and gold to the living and is written in the chronicle', () => {
    const g = newGame();
    const groups = [makeGroup(def('ledger-rat'), 3, createRng(1))];
    const gold = g.state.party.gold;
    g.finishEncounter({ outcome: 'won', xp: 60, gold: 12, party: g.state.party, groups });
    expect(g.state.party.gold).toBe(gold + 12);
    expect(g.state.party.members.filter(isActive).reduce((n, m) => n + m.xp, 0)).toBe(60);
    expect(g.state.chronicle.entries.at(-1)!.kind).toBe('combat');
  });

  test('fleeing pays nothing, and a death is recorded by name', () => {
    const g = newGame();
    const groups = [makeGroup(def('ledger-rat'), 3, createRng(1))];
    const dead = { ...g.state.party, members: g.state.party.members.map((m, i) => (i === 1 ? { ...m, hp: 0, dead: true } : m)) };
    const xpBefore = g.state.party.members.reduce((n, m) => n + m.xp, 0);
    g.finishEncounter({ outcome: 'fled', xp: 50, gold: 10, party: dead, groups });
    expect(g.state.party.members.reduce((n, m) => n + m.xp, 0)).toBe(xpBefore);
    expect(g.state.chronicle.entries.some((e) => e.kind === 'death' && e.text.includes(dead.members[1].name))).toBe(true);
  });
});

describe('the inn and saving', () => {
  test('resting costs a day, heals, and lets members who earned it level up', () => {
    const g = newGame();
    g.state.party = { ...g.state.party, gold: 500, members: g.state.party.members.map((m) => ({ ...m, hp: 1, xp: 130 })) };
    const day = g.state.day;
    const result = g.restAtInn(2);
    expect(g.state.day).toBe(day + 1);
    expect(g.state.party.members.every((m) => m.level === 2)).toBe(true);
    expect(g.state.party.members.every((m) => m.hp === m.maxHp)).toBe(true);
    expect(result.leveled.length).toBe(6);
  });

  test('a game round-trips through a save', () => {
    const g = newGame();
    goto(g, 'crypt', 26, 3, 0);
    g.onArrive({ x: 27, y: 3, z: 0 }, 0, 1);
    const back = Game.fromSave(g.toSave(), createRng(3));
    expect(back.state.party).toEqual(g.state.party);
    expect(back.state.levelId).toBe(g.state.levelId);
    expect(back.state.chronicle).toEqual(g.state.chronicle);
    expect(back.automap().seen.size).toBe(g.automap().seen.size);
    expect(back.onArrive({ x: 27, y: 3, z: 0 }, 0, 1).some((r) => r.kind === 'discovery')).toBe(false);
  });
});
