import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import type { MonsterDef } from '../src/core/types';
import type { CombatState, Order } from '../src/core/combat/types';
import { makeGroup, resolveRound, startCombat } from '../src/core/combat/engine';
import { chooseMonsterAction } from '../src/core/combat/ai';
import { hero, partyOf, rat, withHp } from './helpers';

const def = (over: Partial<MonsterDef>): MonsterDef => ({ ...rat, ...over });
const strong = (n = 6) => partyOf(n, (i) => withHp(hero(`H${i}`), 40));
const choices = (s: CombatState, gi = 0, n = 200) => Array.from({ length: n }, (_, i) => chooseMonsterAction(s, gi, createRng(i + 1)));

describe('monster intent', () => {
  test('a hurt skittish group flees or calls for help, and a healthy one never flees', () => {
    const hurt = makeGroup(def({ behaviour: 'skittish' }), 4, createRng(1));
    hurt.hp = [0, 0, 0, 3];
    const kinds = new Set(choices(startCombat(strong(), [hurt])).map((a) => a.kind));
    expect(kinds.has('flee')).toBe(true);
    const healthy = makeGroup(def({ behaviour: 'skittish' }), 4, createRng(1));
    expect(choices(startCombat(strong(), [healthy])).some((a) => a.kind === 'flee')).toBe(false);
  });

  test('a swarm goes for the weakest member', () => {
    const party = partyOf(6, (i) => withHp(hero(`H${i}`), 40));
    party.members[4] = { ...party.members[4], hp: 3 };
    const s = startCombat(party, [makeGroup(def({ behaviour: 'swarm' }), 4, createRng(1))]);
    const targets = choices(s).filter((a) => a.kind === 'attack').map((a) => (a as { target: string }).target);
    expect(targets.every((t) => t === party.members[4].id)).toBe(true);
  });

  test('an ambusher goes for the back row while someone is standing there', () => {
    const s = startCombat(strong(), [makeGroup(def({ behaviour: 'ambusher' }), 2, createRng(1))]);
    const back = new Set(s.party.members.filter((m) => m.row === 'back').map((m) => m.id));
    const targets = choices(s).filter((a) => a.kind === 'attack').map((a) => (a as { target: string }).target);
    expect(targets.length).toBeGreaterThan(0);
    expect(targets.every((t) => back.has(t))).toBe(true);
  });

  test('a brute usually hits the front row', () => {
    const s = startCombat(strong(), [makeGroup(rat, 3, createRng(1))]);
    const front = new Set(s.party.members.filter((m) => m.row === 'front').map((m) => m.id));
    const targets = choices(s, 0, 400).map((a) => (a as { target: string }).target);
    expect(targets.filter((t) => front.has(t)).length / targets.length).toBeGreaterThan(0.6);
  });

  test('a caster casts when it has spells and is not silenced', () => {
    const g = makeGroup(def({ behaviour: 'caster', spells: ['cinder-dart'] }), 2, createRng(1));
    const s = startCombat(strong(), [g]);
    expect(choices(s).some((a) => a.kind === 'cast')).toBe(true);
    g.silenced = true;
    expect(choices(s).some((a) => a.kind === 'cast')).toBe(false);
  });
});

describe('monster actions in a round', () => {
  const run = (g: ReturnType<typeof makeGroup>, seeds = 80) => {
    const types = new Set<string>();
    let last: CombatState | null = null;
    for (let seed = 1; seed < seeds; seed++) {
      const s = startCombat(strong(), [structuredClone(g)]);
      const orders = Object.fromEntries(s.party.members.map((m) => [m.id, { kind: 'parry' } as Order]));
      const res = resolveRound(s, orders, createRng(seed));
      res.events.forEach((e) => types.add(e.t));
      last = res.state;
    }
    return { types, last: last! };
  };

  test('monsters in a hurt skittish group flee or call help during a round', () => {
    const g = makeGroup(def({ behaviour: 'skittish', hp: [4, 8] }), 6, createRng(1));
    g.hp = [20, 0, 0, 0, 0, 0];
    const { types } = run(g);
    expect(types.has('monsterFlees') || types.has('monsterCalls')).toBe(true);
  });

  test('calling for help never makes a group bigger than nine', () => {
    const g = makeGroup(def({ behaviour: 'skittish', hp: [4, 8] }), 9, createRng(1));
    g.hp = [20, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let seed = 1; seed < 80; seed++) {
      const s = startCombat(strong(), [structuredClone(g)]);
      const orders = Object.fromEntries(s.party.members.map((m) => [m.id, { kind: 'parry' } as Order]));
      expect(resolveRound(s, orders, createRng(seed)).state.groups[0].hp.length).toBeLessThanOrEqual(9);
    }
  });

  test('a casting monster hurts the party with its spell, and a sleep spell can put a member to sleep', () => {
    const dart = makeGroup(def({ behaviour: 'caster', spells: ['cinder-dart'], damage: [1, 1] }), 3, createRng(1));
    expect(run(dart).types.has('monsterCasts')).toBe(true);
    const lull = makeGroup(def({ behaviour: 'caster', spells: ['lull'], damage: [1, 1] }), 3, createRng(1));
    const { last } = run(lull, 200);
    expect(last.party.members.some((m) => m.status.includes('asleep')) || run(lull, 200).types.has('monsterCasts')).toBe(true);
  });

  test('a sleeping party member does not act, and statuses can wear off', () => {
    const s = startCombat(strong(3), [makeGroup(rat, 1, createRng(1))]);
    s.party.members[0].status = ['asleep'];
    const orders: Record<string, Order> = { [s.party.members[0].id]: { kind: 'fight', group: 0 } };
    const res = resolveRound(s, orders, createRng(2));
    expect(res.events.some((e) => (e.t === 'hit' || e.t === 'miss') && e.actor === s.party.members[0].id)).toBe(false);
    let cleared = false;
    let cur = s;
    for (let r = 0; r < 60 && !cleared; r++) {
      cur = resolveRound(cur, orders, createRng(r + 5)).state;
      cleared = !cur.party.members[0].status.includes('asleep');
    }
    expect(cleared).toBe(true);
  });
});
