import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { makeGroup, startCombat } from '../src/core/combat/engine';
import { castSpell } from '../src/core/magic';
import { SPELLS } from '../src/core/data';
import { hero, ogre, partyOf, rat, withHp } from './helpers';

const rng = (s = 1) => createRng(s);

function caster(over: Record<string, unknown> = {}) {
  const c = hero('Isolde', 'spellwright', { iq: 4, str: 0 });
  const known = [...c.known, 'hush', 'ash-gust', 'name-thing']; // second-level spells learned by this caster
  return { ...withHp(c, 9), known, charges: [3, 2, 1, 0, 0, 0, 0], maxCharges: [3, 2, 1, 0, 0, 0, 0], ...over };
}
function fight(c = caster(), groups = [makeGroup(rat, 4, rng())]) {
  return startCombat(partyOf(3, (i) => (i === 0 ? c : withHp(hero(`F${i}`), 30))), groups);
}

describe('spell data', () => {
  test('a new spellwright knows the first-level arcane spells, and a votary the sacred ones, but not discovery-locked spells', () => {
    const w = hero('W', 'spellwright', { iq: 4, str: 0 });
    expect(w.known).toContain('cinder-dart');
    expect(w.known).not.toContain('kiln-roar');
    const v = hero('V', 'votary', { pie: 4, str: 0 });
    expect(v.known).toContain('mend');
    expect(SPELLS.length).toBeGreaterThanOrEqual(12);
  });
});

describe('castSpell', () => {
  test('casting spends exactly one charge of the spell level and damages the target group', () => {
    const s = fight();
    const c = s.party.members[0];
    const events = castSpell(s, c.id, 'cinder-dart', 0, rng());
    expect(s.party.members[0].charges).toEqual([2, 2, 1, 0, 0, 0, 0]);
    expect(events.some((e) => e.t === 'cast' && (e.dmg ?? 0) > 0)).toBe(true);
  });

  test('with no charge left the spell fizzles and nothing is damaged', () => {
    const s = fight(caster({ charges: [0, 0, 0, 0, 0, 0, 0] }));
    const before = JSON.stringify(s.groups);
    const events = castSpell(s, s.party.members[0].id, 'cinder-dart', 0, rng());
    expect(events).toEqual([{ t: 'fizzle', actor: s.party.members[0].id, spellId: 'cinder-dart', reason: 'no charge' }]);
    expect(JSON.stringify(s.groups)).toBe(before);
  });

  test('a silenced caster cannot cast', () => {
    const s = fight(caster({ status: ['silenced'] }));
    const events = castSpell(s, s.party.members[0].id, 'cinder-dart', 0, rng());
    expect(events[0]).toMatchObject({ t: 'fizzle', reason: 'silenced' });
    expect(s.party.members[0].charges[0]).toBe(3);
  });

  test('a spell the caster does not know fizzles', () => {
    const s = fight(caster({ known: [] }));
    expect(castSpell(s, s.party.members[0].id, 'cinder-dart', 0, rng())[0]).toMatchObject({ reason: 'unknown' });
  });

  test('a discovery-locked spell fizzles until the party has the discovery', () => {
    const c = caster({ known: ['kiln-roar'], charges: [0, 0, 2, 0, 0, 0, 0] });
    const s = fight(c);
    expect(castSpell(s, c.id, 'kiln-roar', 0, rng())[0]).toMatchObject({ reason: 'locked' });
    s.party.discoveries.push('lienholders-primer');
    expect(castSpell(s, c.id, 'kiln-roar', 0, rng())[0]).toMatchObject({ t: 'cast' });
  });

  test('sleep puts a group to sleep, and damage wakes it again', () => {
    let slept = false;
    for (let seed = 1; seed < 60 && !slept; seed++) {
      const s = fight(caster(), [makeGroup(rat, 3, rng())]);
      castSpell(s, s.party.members[0].id, 'lull', 0, rng(seed));
      if (s.groups[0].asleep) {
        slept = true;
        castSpell(s, s.party.members[0].id, 'cinder-dart', 0, rng(seed));
        expect(s.groups[0].asleep).toBe(false);
      }
    }
    expect(slept).toBe(true);
  });

  test('a silence spell stops a monster group casting', () => {
    const s = fight(caster(), [makeGroup(ogre, 2, rng())]);
    castSpell(s, s.party.members[0].id, 'hush', 0, rng());
    expect(s.groups[0].silenced).toBe(true);
  });

  test('healing never exceeds maximum hit points and cannot target the dead', () => {
    const healer = hero('Orsk', 'votary', { pie: 4, str: 0 });
    const hurt = { ...withHp(hero('Hurt'), 20), hp: 18 };
    const dead = { ...withHp(hero('Dead'), 20), hp: 0, dead: true };
    const s = startCombat(partyOf(3, (i) => [{ ...healer, charges: [2, 0, 0, 0, 0, 0, 0] }, hurt, dead][i]), [makeGroup(rat, 1, rng())]);
    castSpell(s, healer.id, 'mend', 1, rng());
    expect(s.party.members[1].hp).toBeLessThanOrEqual(20);
    const ev = castSpell(s, healer.id, 'mend', 2, rng());
    expect(s.party.members[2].hp).toBe(0);
    expect(ev[0]).toMatchObject({ t: 'fizzle' });
  });

  test('a group-damage spell hits every living monster in the group', () => {
    const s = fight(caster(), [makeGroup(rat, 5, rng(8))]);
    s.groups[0].hp = [30, 30, 30, 30, 30];
    castSpell(s, s.party.members[0].id, 'ash-gust', 0, rng());
    expect(s.groups[0].hp.every((h) => h < 30)).toBe(true);
  });
});
