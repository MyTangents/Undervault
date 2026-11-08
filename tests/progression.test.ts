import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { addToParty, emptyParty } from '../src/core/party';
import type { Party } from '../src/core/types';
import {
  applyDiscovery, availablePaths, awardXp, canLevelUp, chargesFor, levelUp, xpForLevel,
} from '../src/core/progression';
import { hero } from './helpers';

const mixed = (): Party => {
  let p = emptyParty();
  p = addToParty(p, hero('Brannoc'));
  p = addToParty(p, hero('Isolde', 'spellwright', { iq: 4, str: 0 }));
  p = addToParty(p, hero('Orsk', 'votary', { pie: 4, str: 0 }));
  return p;
};

describe('experience and levelling', () => {
  test('xp is shared among the living, and the dead get none', () => {
    let p = mixed();
    p = { ...p, members: p.members.map((m, i) => (i === 2 ? { ...m, dead: true, hp: 0 } : m)) };
    const q = awardXp(p, 100);
    expect(q.members[0].xp).toBe(50);
    expect(q.members[1].xp).toBe(50);
    expect(q.members[2].xp).toBe(0);
  });

  test('a level needs enough xp, and only happens at the inn', () => {
    const c = hero('Brannoc');
    expect(canLevelUp(c)).toBe(false);
    const ready = { ...c, xp: xpForLevel(2) };
    expect(canLevelUp(ready)).toBe(true);
    expect(() => levelUp(ready, createRng(1), { atInn: false })).toThrow(/inn/i);
    expect(() => levelUp(c, createRng(1), { atInn: true })).toThrow(/experience/i);
  });

  test('levelling raises level and hit points but opens no new options for a fighter', () => {
    const c = { ...hero('Brannoc'), xp: xpForLevel(2) };
    const up = levelUp(c, createRng(1), { atInn: true });
    expect(up.level).toBe(2);
    expect(up.maxHp).toBeGreaterThan(c.maxHp);
    expect(up.known).toEqual(c.known);
    expect(up.techniques).toEqual(c.techniques);
  });

  test('a caster gains charges and learns the next spell level as they level', () => {
    expect(chargesFor(1, 1)).toBe(2);
    expect(chargesFor(2, 1)).toBeGreaterThan(chargesFor(1, 1));
    expect(chargesFor(2, 2)).toBe(0);
    expect(chargesFor(3, 2)).toBeGreaterThan(0);
    let w = hero('Isolde', 'spellwright', { iq: 4, str: 0 });
    for (const lvl of [2, 3]) w = levelUp({ ...w, xp: xpForLevel(lvl) }, createRng(lvl), { atInn: true });
    expect(w.known).toContain('ash-gust');
    expect(w.known).not.toContain('kiln-roar'); // still locked behind a discovery
    expect(w.maxCharges[1]).toBeGreaterThan(0);
  });
});

describe('discoveries', () => {
  test('a spell discovery teaches eligible casters of the right school and not fighters', () => {
    const p = applyDiscovery(mixed(), 'lienholders-primer');
    expect(p.discoveries).toContain('lienholders-primer');
    expect(p.members[1].known).toContain('kiln-roar'); // spellwright (arcane)
    expect(p.members[0].known).not.toContain('kiln-roar'); // blade
    expect(p.members[2].known).not.toContain('kiln-roar'); // votary (sacred)
  });

  test('a sacred discovery teaches the votary', () => {
    const p = applyDiscovery(mixed(), 'tally-hymnal');
    expect(p.members[2].known).toContain('mass-mend');
    expect(p.members[1].known).not.toContain('mass-mend');
  });

  test('a weapon discovery gives fighters a new technique', () => {
    const p = applyDiscovery(mixed(), 'overdraft-blade');
    expect(p.members[0].techniques).toContain('borrowed-blow');
    expect(p.members[1].techniques).not.toContain('borrowed-blow');
  });

  test('applying the same discovery twice changes nothing more', () => {
    const once = applyDiscovery(mixed(), 'lienholders-primer');
    const twice = applyDiscovery(once, 'lienholders-primer');
    expect(twice).toEqual(once);
    expect(twice.discoveries.filter((d) => d === 'lienholders-primer')).toHaveLength(1);
  });

  test('an unknown discovery id is rejected', () => {
    expect(() => applyDiscovery(mixed(), 'nope')).toThrow(/unknown/i);
  });

  test('parties with different discoveries have different build paths', () => {
    const a = applyDiscovery(mixed(), 'quiets-receipt');
    const b = mixed();
    expect(availablePaths(a.members[0], a)).toContain('installment');
    expect(availablePaths(b.members[0], b)).toEqual([]);
  });
});
