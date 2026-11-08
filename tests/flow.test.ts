import { describe, expect, test } from 'vitest';
import { initialState, legalOrders, reduce, type AppAction, type AppState } from '../src/render/ui/flow';
import { hero, withHp } from './helpers';

const run = (s: AppState, ...actions: AppAction[]) => actions.reduce(reduce, s);
const fresh = () => initialState(false);

describe('screen flow', () => {
  test('title to town to dungeon to combat and back to the dungeon, then town', () => {
    let s = run(fresh(), { type: 'begin' });
    expect(s.screen).toBe('title');
    s = run(s, { type: 'newGame' });
    expect(s.screen).toBe('town');
    s = run(s, { type: 'enterDungeon' });
    expect(s.screen).toBe('dungeon');
    s = run(s, { type: 'encounter' });
    expect(s.screen).toBe('combat');
    s = run(s, { type: 'combatEnd', outcome: 'won' });
    expect(s.screen).toBe('dungeon');
    s = run(s, { type: 'returnToTown' });
    expect(s.screen).toBe('town');
  });

  test('fleeing returns to the dungeon, and a wiped party goes to game over, where a new game restarts', () => {
    const inFight = run(fresh(), { type: 'newGame' }, { type: 'enterDungeon' }, { type: 'encounter' });
    expect(reduce(inFight, { type: 'combatEnd', outcome: 'fled' }).screen).toBe('dungeon');
    const over = reduce(inFight, { type: 'combatEnd', outcome: 'wiped' });
    expect(over.screen).toBe('gameover');
    expect(reduce(over, { type: 'newGame' }).screen).toBe('town');
  });

  test('actions that make no sense on the current screen are ignored', () => {
    const t = fresh();
    expect(reduce(t, { type: 'enterDungeon' })).toEqual(t); // no game yet
    const town = run(fresh(), { type: 'newGame' });
    expect(reduce(town, { type: 'encounter' })).toEqual(town);
    expect(reduce(town, { type: 'combatEnd', outcome: 'won' })).toEqual(town);
  });

  test('the content notice shows until the first begin, and a returning visitor does not see it again', () => {
    expect(initialState(false).noticeSeen).toBe(false);
    expect(reduce(initialState(false), { type: 'begin' }).noticeSeen).toBe(true);
    expect(initialState(true).noticeSeen).toBe(true);
  });

  test('beginning unlocks audio, and continuing a save lands in town or the dungeon as saved', () => {
    expect(reduce(fresh(), { type: 'begin' }).audioUnlocked).toBe(true);
    expect(reduce(fresh(), { type: 'continue', inTown: true }).screen).toBe('town');
    expect(reduce(fresh(), { type: 'continue', inTown: false }).screen).toBe('dungeon');
  });

  test('the ending is reached from the dungeon', () => {
    const d = run(fresh(), { type: 'newGame' }, { type: 'enterDungeon' });
    expect(reduce(d, { type: 'ending' }).screen).toBe('ending');
  });
});

describe('legal combat orders', () => {
  test('running and parrying are always available', () => {
    const wright = { ...withHp(hero('Isolde', 'spellwright', { iq: 4, str: 0 }), 9), charges: [0, 0, 0, 0, 0, 0, 0], row: 'back' as const };
    expect(legalOrders(wright)).toEqual(expect.arrayContaining(['run', 'parry']));
  });

  test('a front-row fighter can fight, and a back-row one cannot', () => {
    const front = hero('Brannoc');
    expect(legalOrders({ ...front, row: 'front' })).toContain('fight');
    expect(legalOrders({ ...front, row: 'back' })).not.toContain('fight');
  });

  test('spells are offered only to someone who knows one and has a charge for it', () => {
    const wright = withHp(hero('Isolde', 'spellwright', { iq: 4, str: 0 }), 9);
    expect(legalOrders(wright)).toContain('spell');
    expect(legalOrders({ ...wright, charges: [0, 0, 0, 0, 0, 0, 0] })).not.toContain('spell');
    expect(legalOrders(hero('Brannoc'))).not.toContain('spell');
  });

  test('using an item is offered only to someone carrying a consumable', () => {
    expect(legalOrders({ ...hero('Brannoc'), inventory: ['short-sword'] })).not.toContain('use');
    expect(legalOrders({ ...hero('Brannoc'), inventory: ['mending-draught'] })).toContain('use');
  });
});
