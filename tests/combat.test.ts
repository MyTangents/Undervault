import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import type { Order } from '../src/core/combat/types';
import { fleeChance, makeGroup, resolveRound, startCombat, warnings } from '../src/core/combat/engine';
import { hero, ogre, partyOf, rat, withHp } from './helpers';

const rng = (s = 1) => createRng(s);
const strongParty = (n = 6) => partyOf(n, (i) => withHp(hero(`H${i}`), 40));

describe('startCombat', () => {
  test('rejects five groups', () => {
    const groups = Array.from({ length: 5 }, () => makeGroup(rat, 2, rng()));
    expect(() => startCombat(strongParty(), groups)).toThrow(/four groups/i);
  });
  test('rejects a group of ten', () => {
    expect(() => startCombat(strongParty(), [makeGroup(rat, 10, rng())])).toThrow(/nine/i);
  });
  test('accepts a nine-strong group plus three others and a round resolves', () => {
    const groups = [makeGroup(rat, 9, rng()), makeGroup(rat, 3, rng()), makeGroup(ogre, 1, rng()), makeGroup(rat, 2, rng())];
    const s = startCombat(strongParty(), groups);
    expect(() => resolveRound(s, {}, rng())).not.toThrow();
  });
});

describe('orders', () => {
  test('a back-row character cannot fight in melee', () => {
    const s = startCombat(strongParty(), [makeGroup(rat, 3, rng())]);
    const back = s.party.members[3];
    const { events } = resolveRound(s, { [back.id]: { kind: 'fight', group: 0 } }, rng());
    expect(events).toContainEqual({ t: 'miss', actor: back.id, reason: 'back row' });
  });

  test('a front-row fight can hit and kill, and kills fill the reward pool', () => {
    let s = startCombat(strongParty(3), [makeGroup(rat, 1, rng())]);
    const orders: Record<string, Order> = Object.fromEntries(s.party.members.map((m) => [m.id, { kind: 'fight', group: 0 } as Order]));
    let outcome = 'ongoing';
    for (let r = 0; r < 20 && outcome === 'ongoing'; r++) {
      const res = resolveRound(s, orders, rng(r + 1));
      s = res.state; outcome = res.outcome;
    }
    expect(outcome).toBe('won');
    expect(s.xpPool).toBe(5);
    expect(s.goldPool).toBeGreaterThan(0);
  });
});

describe('monster states', () => {
  test('sleeping groups do not act', () => {
    const g = makeGroup(ogre, 3, rng()); g.asleep = true;
    const s = startCombat(strongParty(), [g]);
    const { events } = resolveRound(s, {}, rng());
    expect(events.filter((e) => e.t === 'monsterHit' || e.t === 'monsterMiss')).toEqual([]);
  });

  test('all-friendly groups end the fight peacefully with no damage', () => {
    const g = makeGroup(ogre, 2, rng()); g.friendly = true;
    const s = startCombat(strongParty(), [g]);
    const res = resolveRound(s, {}, rng());
    expect(res.outcome).toBe('won');
    expect(res.events).toEqual([{ t: 'peace' }]);
    expect(res.state.party.members.every((m) => m.hp === 40)).toBe(true);
  });

  test('a group already at zero is treated as defeated', () => {
    const g = makeGroup(rat, 2, rng()); g.hp = [0, 0];
    const res = resolveRound(startCombat(strongParty(), [g]), {}, rng());
    expect(res.outcome).toBe('won');
  });
});

describe('running away', () => {
  const runAll = (s: ReturnType<typeof startCombat>): Record<string, Order> =>
    Object.fromEntries(s.party.members.map((m) => [m.id, { kind: 'run' } as Order]));

  test('running sometimes succeeds and sometimes fails, depending on the roll', () => {
    const s = startCombat(strongParty(), [makeGroup(rat, 4, rng())]);
    const outcomes = new Set<string>();
    for (let seed = 1; seed < 200; seed++) outcomes.add(resolveRound(s, runAll(s), rng(seed)).outcome);
    expect(outcomes.has('fled')).toBe(true);
    expect(outcomes.has('ongoing')).toBe(true);
  });

  test('a failed escape costs the round, not the party: nobody swings and nobody dies from the failure', () => {
    const s = startCombat(strongParty(), [makeGroup(rat, 4, rng())]);
    let sawFail = false;
    for (let seed = 1; seed < 200; seed++) {
      const mixed = { ...runAll(s), [s.party.members[1].id]: { kind: 'fight', group: 0 } as Order };
      const res = resolveRound(s, mixed, rng(seed));
      if (res.outcome !== 'ongoing') continue;
      sawFail = true;
      expect(res.events).toContainEqual({ t: 'runFail' });
      expect(res.events.some((e) => e.t === 'hit')).toBe(false);
      expect(res.state.party.members.every((m) => !m.dead)).toBe(true);
    }
    expect(sawFail).toBe(true);
  });

  test('a paralysed party has no chance to flee, and says why', () => {
    const base = strongParty();
    const frozen = { ...base, members: base.members.map((m) => ({ ...m, status: ['paralysed' as const] })) };
    const s = startCombat(frozen, [makeGroup(rat, 2, rng())]);
    expect(fleeChance(s)).toBe(0);
    const res = resolveRound(s, runAll(s), rng());
    expect(res.events).toContainEqual({ t: 'runFail', reason: 'paralysed' });
    expect(res.outcome).toBe('ongoing');
  });
});

describe('determinism and warnings', () => {
  test('the same seed gives identical events', () => {
    const s = startCombat(strongParty(), [makeGroup(ogre, 2, rng(4))]);
    const orders = Object.fromEntries(s.party.members.map((m) => [m.id, { kind: 'fight', group: 0 } as Order]));
    expect(JSON.stringify(resolveRound(s, orders, rng(9)).events)).toBe(JSON.stringify(resolveRound(s, orders, rng(9)).events));
  });

  test('a losing fight shows a red-hp warning before the party is wiped', () => {
    let s = startCombat(partyOf(3, (i) => withHp(hero(`W${i}`), 12)), [makeGroup(ogre, 4, rng(2))]);
    const orders = Object.fromEntries(s.party.members.map((m) => [m.id, { kind: 'parry' } as Order]));
    let sawRed = false, outcome = 'ongoing';
    for (let r = 0; r < 40 && outcome === 'ongoing'; r++) {
      if (warnings(s).includes('redHp')) sawRed = true;
      const res = resolveRound(s, orders, rng(r + 1));
      s = res.state; outcome = res.outcome;
    }
    expect(outcome).toBe('wiped');
    expect(sawRed).toBe(true);
  });

  test('a full-health party facing weak odds has no warnings', () => {
    expect(warnings(startCombat(strongParty(), [makeGroup(rat, 1, rng())]))).toEqual([]);
  });
});
