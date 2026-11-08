import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import type { Alignment, Party, Stats } from '../src/core/types';
import {
  addToParty, createCharacter, eligibleClasses, emptyParty, isWiped, moveMember, rollBonusPool, setRow, sinkTheDead,
} from '../src/core/party';

const ZERO: Stats = { str: 0, iq: 0, pie: 0, vit: 0, agi: 0, luck: 0 };
const rng = () => createRng(5);

function mk(name: string, classId: string, alignment: Alignment, alloc: Partial<Stats>, raceId = 'human') {
  return createCharacter({ name, raceId, classId, alignment, pool: 12 }, { ...ZERO, ...alloc }, rng());
}
const blade = (n: string, a: Alignment = 'neutral') => mk(n, 'blade', a, { str: 4 });

describe('rollBonusPool', () => {
  test('is always at least 5 and at most 19, and sometimes reaches 10 or more', () => {
    const r = createRng(11);
    const pools = Array.from({ length: 5000 }, () => rollBonusPool(r));
    expect(Math.min(...pools)).toBeGreaterThanOrEqual(5);
    expect(Math.max(...pools)).toBeLessThanOrEqual(19);
    expect(pools.some((p) => p >= 10)).toBe(true);
  });
});

describe('eligibleClasses', () => {
  const good: Stats = { str: 15, iq: 11, pie: 14, vit: 14, agi: 11, luck: 13 };
  test('an elite class appears only when every attribute gate is met', () => {
    expect(eligibleClasses(good, 'good')).toContain('oathblade');
    expect(eligibleClasses({ ...good, str: 12 }, 'good')).not.toContain('oathblade');
  });
  test('an elite class respects alignment', () => {
    expect(eligibleClasses(good, 'evil')).not.toContain('oathblade');
  });
  test('basic classes need their one attribute', () => {
    expect(eligibleClasses({ ...good, str: 5 }, 'neutral')).not.toContain('blade');
    expect(eligibleClasses({ ...good }, 'neutral')).toContain('blade');
  });
});

describe('createCharacter', () => {
  test('adds the allocation to the race base and starts at the front with hit points', () => {
    const c = blade('Brannoc');
    expect(c.stats.str).toBe(12); // human base 8 + 4
    expect(c.maxHp).toBeGreaterThan(0);
    expect(c.hp).toBe(c.maxHp);
    expect(c.row).toBe('front');
    expect(c.dead).toBe(false);
  });
  test('throws when the allocation exceeds the bonus pool', () => {
    expect(() => mk('Greedy', 'blade', 'neutral', { str: 13 })).toThrow(/pool/i);
  });
  test('throws when the class is not eligible', () => {
    expect(() => mk('Weakling', 'oathblade', 'good', { str: 2 })).toThrow(/eligible/i);
  });
});

describe('party', () => {
  const six = (): Party => {
    let p = emptyParty();
    for (const n of ['A', 'B', 'C', 'D', 'E', 'F']) p = addToParty(p, blade(n));
    return p;
  };

  test('rejects a seventh member', () => {
    expect(() => addToParty(six(), blade('G'))).toThrow(/six|full/i);
  });
  test('rejects good and evil together but accepts good with neutral', () => {
    let p = addToParty(emptyParty(), blade('Good', 'good'));
    expect(() => addToParty(p, blade('Evil', 'evil'))).toThrow(/align/i);
    p = addToParty(p, blade('Meh', 'neutral'));
    expect(p.members).toHaveLength(2);
  });
  test('the first three members are the front row and the rest the back row', () => {
    const p = six();
    expect(p.members.map((m) => m.row)).toEqual(['front', 'front', 'front', 'back', 'back', 'back']);
  });
  test('setRow swaps a member into the other row', () => {
    const p = six();
    const q = setRow(p, p.members[0].id, 'back');
    expect(q.members.find((m) => m.id === p.members[0].id)!.row).toBe('back');
    expect(q.members.filter((m) => m.row === 'front')).toHaveLength(3);
  });
  test('a party of two is valid and not wiped', () => {
    let p = addToParty(emptyParty(), blade('A'));
    p = addToParty(p, blade('B'));
    expect(isWiped(p)).toBe(false);
  });
  test('isWiped is true when all are dead, or only ash remains', () => {
    const p = six();
    const dead = { ...p, members: p.members.map((m) => ({ ...m, dead: true })) };
    expect(isWiped(dead)).toBe(true);
    const ash = { ...p, members: p.members.map((m) => ({ ...m, dead: true, ash: true })) };
    expect(isWiped(ash)).toBe(true);
    const oneLeft = { ...p, members: p.members.map((m, i) => ({ ...m, dead: i !== 4 })) };
    expect(isWiped(oneLeft)).toBe(false);
  });
});

describe('review fixes: no one joins twice', () => {
  test('a character with the same id as a member cannot be added again', () => {
    const a = blade('Twin');
    const p = addToParty(emptyParty(), a);
    expect(() => addToParty(p, { ...a })).toThrow(/already/i);
  });
});

describe('party order', () => {
  const six = (): Party => {
    let p = emptyParty();
    for (const n of ['Ann', 'Bo', 'Cy', 'Di', 'Ed', 'Flo']) p = addToParty(p, blade(n));
    return p;
  };
  const names = (p: Party) => p.members.map((m) => m.name).join(',');
  const rows = (p: Party) => p.members.map((m) => m.row).join(',');
  const kill = (p: Party, ...ns: string[]): Party => ({
    ...p,
    members: p.members.map((m) => (ns.includes(m.name) ? { ...m, hp: 0, dead: true } : m)),
  });

  test('moveMember moves a member down and up, clamps the index, keeps the others in order, and renormalises rows', () => {
    const p = six();
    const down = moveMember(p, p.members[0].id, 3);
    expect(names(down)).toBe('Bo,Cy,Di,Ann,Ed,Flo');
    expect(rows(down)).toBe('front,front,front,back,back,back');
    const up = moveMember(down, down.members[3].id, 0);
    expect(names(up)).toBe('Ann,Bo,Cy,Di,Ed,Flo');
    expect(names(moveMember(p, p.members[1].id, 99))).toBe('Ann,Cy,Di,Ed,Flo,Bo');
    expect(names(moveMember(p, p.members[4].id, -5))).toBe('Ed,Ann,Bo,Cy,Di,Flo');
    expect(rows(moveMember(p, p.members[0].id, 5))).toBe('front,front,front,back,back,back');
  });

  test('moveMember can move a dead member and throws on an unknown id', () => {
    const p = kill(six(), 'Ann');
    const q = moveMember(p, p.members[0].id, 5);
    expect(q.members[5].name).toBe('Ann');
    expect(q.members[5].dead).toBe(true);
    expect(() => moveMember(p, 'nobody-0000', 1)).toThrow(/no such member nobody-0000/);
  });

  test('sinkTheDead puts dead and ash below the living, keeping order within each group, and renormalises rows', () => {
    let p = kill(six(), 'Ann', 'Di');
    p = { ...p, members: p.members.map((m) => (m.name === 'Flo' ? { ...m, dead: true, ash: true } : m)) };
    const q = sinkTheDead(p);
    expect(names(q)).toBe('Bo,Cy,Ed,Ann,Di,Flo');
    expect(rows(q)).toBe('front,front,front,back,back,back');
  });

  test('sinkTheDead with nobody dead changes nothing, and with everybody dead keeps the order', () => {
    const p = six();
    expect(sinkTheDead(p)).toEqual(p);
    const all = kill(p, 'Ann', 'Bo', 'Cy', 'Di', 'Ed', 'Flo');
    expect(names(sinkTheDead(all))).toBe('Ann,Bo,Cy,Di,Ed,Flo');
  });
});
