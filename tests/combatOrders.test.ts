import { describe, expect, test } from 'vitest';
import { MONSTERS } from '../src/core/data';
import { startCombat } from '../src/core/combat/engine';
import { makeGroup } from '../src/core/combat/engine';
import type { CombatState, Order } from '../src/core/combat/types';
import { autoOrders, demoParty } from '../src/core/sim';
import { createRng } from '../src/core/rng';
import { CombatOrders } from '../src/render/ui/combatOrders';

const def = (id: string) => MONSTERS.find((m) => m.id === id)!;
function fight(patch?: (members: any[]) => any[]): CombatState {
  const party = demoParty();
  const state = startCombat(structuredClone(party), [makeGroup(def('ledger-rat'), 3, createRng(1)), makeGroup(def('tally-skeleton'), 2, createRng(2))]);
  if (patch) state.party = { ...state.party, members: patch(state.party.members) };
  return state;
}
const parry: Order = { kind: 'parry' };

describe('CombatOrders', () => {
  test('members are asked in roster order and dead, ash and unable members are skipped', () => {
    const s = fight((ms) => ms.map((m, i) => (i === 1 ? { ...m, hp: 0, dead: true } : i === 3 ? { ...m, status: ['asleep'] } : i === 4 ? { ...m, ash: true, dead: true } : m)));
    const co = new CombatOrders(s);
    const asked: string[] = [];
    while (!co.done()) { asked.push(co.current()!.name); co.answer(parry); }
    expect(asked).toEqual([s.party.members[0].name, s.party.members[2].name, s.party.members[5].name]);
    expect(Object.keys(co.orders()).length).toBe(3);
    expect(co.current()).toBeNull();
  });

  test('choices mark only legalOrders as enabled', () => {
    const s = fight();
    const co = new CombatOrders(s);
    const byKind = (c: ReturnType<CombatOrders['choices']>) => Object.fromEntries(c.map((x) => [x.kind, x.enabled]));
    // slot 1 is a front-row blade: fights, parries and runs; no spell, and Brannoc carries nothing to use
    expect(byKind(co.choices())).toEqual({ fight: true, spell: false, parry: true, use: false, run: true });
    expect(co.choices().map((c) => c.key)).toEqual(['f', 's', 'p', 'u', 'r']);
    // the back-row caster cannot fight but can cast
    while (co.current()!.name !== 'Isolde') co.answer(parry);
    expect(byKind(co.choices())).toEqual({ fight: false, spell: true, parry: true, use: false, run: true });
  });

  test('answer advances, takeBack restores the previous member\'s slot, done() is true after the last', () => {
    const s = fight();
    const co = new CombatOrders(s);
    const first = co.current()!.id;
    co.answer({ kind: 'fight', group: 0 });
    const second = co.current()!.id;
    expect(second).not.toBe(first);
    co.takeBack();
    expect(co.current()!.id).toBe(first);
    expect(co.orders()[first]).toBeUndefined();
    co.takeBack(); // nothing before the first member: stays put
    expect(co.current()!.id).toBe(first);
    while (!co.done()) co.answer(parry);
    expect(co.done()).toBe(true);
    co.takeBack();
    expect(co.done()).toBe(false);
  });

  test('repeat reuses last round\'s order only when still legal, otherwise returns false', () => {
    const s = fight();
    const [a, b] = s.party.members;
    const co = new CombatOrders(s, { [a.id]: { kind: 'fight', group: 1 }, [b.id]: { kind: 'fight', group: 2 }, });
    expect(co.repeat()).toBe(true); // a fights group 1 (alive)
    expect(co.orders()[a.id]).toEqual({ kind: 'fight', group: 1 });
    expect(co.repeat()).toBe(false); // b's group 2 does not exist
    expect(co.current()!.id).toBe(b.id);
    // a spell with no charges left is not legal either
    const s2 = fight();
    const caster = s2.party.members[3];
    const co2 = new CombatOrders({ ...s2, party: { ...s2.party, members: s2.party.members.map((m) => (m.id === caster.id ? { ...m, charges: [0, 0, 0, 0, 0, 0, 0] } : m)) } },
      { [caster.id]: { kind: 'spell', spellId: caster.known[0], target: 0 } });
    while (co2.current()!.id !== caster.id) co2.answer(parry);
    expect(co2.repeat()).toBe(false);
    // nothing recorded for a member: false
    expect(new CombatOrders(fight()).repeat()).toBe(false);
  });

  test('autoFill answers every remaining member with the supplied orders', () => {
    const s = fight();
    const co = new CombatOrders(s);
    co.answer({ kind: 'run' });
    co.autoFill(autoOrders(s));
    expect(co.done()).toBe(true);
    const orders = co.orders();
    expect(Object.keys(orders).length).toBe(s.party.members.length);
    expect(orders[s.party.members[0].id]).toEqual({ kind: 'run' });
    // a member the supplied orders do not mention parries
    const co2 = new CombatOrders(s);
    co2.autoFill({});
    expect(Object.values(co2.orders()).every((o) => o.kind === 'parry')).toBe(true);
  });

  test('when nobody can act done() is true at once and orders() is empty', () => {
    const s = fight((ms) => ms.map((m, i) => (i % 2 ? { ...m, status: ['paralysed'] } : { ...m, status: ['asleep'] })));
    const co = new CombatOrders(s);
    expect(co.done()).toBe(true);
    expect(co.current()).toBeNull();
    expect(co.choices()).toEqual([]);
    expect(co.orders()).toEqual({});
    co.answer(parry); // harmless
    co.takeBack();
    expect(co.repeat()).toBe(false);
  });
});
