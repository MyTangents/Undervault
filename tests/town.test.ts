import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { addToParty, emptyParty, isWiped } from '../src/core/party';
import { TALES, validateData } from '../src/core/data';
import type { Party } from '../src/core/types';
import { applyDiscovery } from '../src/core/progression';
import { SHOP, PLACES, canTravel, informant, raise, recruits, rest, tale } from '../src/core/town';
import { visibleStock } from '../src/core/items';
import { hero, withHp } from './helpers';

const party = (gold = 500): Party => {
  let p = emptyParty();
  for (const n of ['Brannoc', 'Gudrun', 'Pell']) p = addToParty(p, withHp(hero(n), 20));
  return { ...p, gold };
};
const wiped = (): Party => { const p = party(); return { ...p, members: p.members.map((m) => ({ ...m, hp: 0, dead: true })) }; };

describe('places', () => {
  test('there are six places, and every place can be reached from every other', () => {
    expect(PLACES.map((p) => p.kind).sort()).toEqual(['informant', 'inn', 'recruiter', 'shop', 'tales', 'temple']);
    for (const a of PLACES) for (const b of PLACES) if (a.id !== b.id) expect(canTravel(a.id, b.id)).toBe(true);
    expect(canTravel('inn', 'nowhere')).toBe(false);
  });

  test('the shop sells ordinary gear and gates the rest behind a discovery', () => {
    const p = party();
    const ids = visibleStock(p, SHOP).map((i) => i.id);
    expect(ids).toContain('short-sword');
    expect(ids).not.toContain('sealed-ledger-key');
    expect(visibleStock(applyDiscovery(p, 'saint-orrels-ledger'), SHOP).map((i) => i.id)).toContain('sealed-ledger-key');
  });
});

describe('recruiting', () => {
  test('recruits are legal characters, and never an alignment that clashes with the party', () => {
    const good = addToParty(emptyParty(), hero('Saint', 'blade', {}, 'good'));
    const evil = addToParty(emptyParty(), hero('Villain', 'blade', {}, 'evil'));
    for (let seed = 1; seed < 40; seed++) {
      expect(recruits(seed, createRng(seed), good).every((c) => c.alignment !== 'evil')).toBe(true);
      expect(recruits(seed, createRng(seed), evil).every((c) => c.alignment !== 'good')).toBe(true);
    }
    expect(recruits(1, createRng(1), emptyParty()).length).toBeGreaterThan(0);
  });

  test('the same day and seed give the same recruits', () => {
    expect(recruits(3, createRng(3), emptyParty()).map((c) => c.name)).toEqual(recruits(3, createRng(3), emptyParty()).map((c) => c.name));
  });
});

describe('inn', () => {
  test('a good room heals everyone to full and restores spell charges, and costs gold', () => {
    const p = party(500);
    const hurt = { ...p, members: p.members.map((m) => ({ ...m, hp: 1 })) };
    const rested = rest(hurt, 2);
    expect(rested.members.every((m) => m.hp === m.maxHp)).toBe(true);
    expect(rested.gold).toBeLessThan(500);
  });

  test('a cheap room heals only part and never above the maximum', () => {
    const p = party(500);
    const hurt = { ...p, members: p.members.map((m) => ({ ...m, hp: m.maxHp - 3 })) };
    const rested = rest(hurt, 1);
    expect(rested.members.every((m) => m.hp <= m.maxHp && m.hp > m.maxHp - 3)).toBe(true);
  });

  test('the stable is free and heals nothing', () => {
    const p = party(0);
    const hurt = { ...p, members: p.members.map((m) => ({ ...m, hp: 2 })) };
    const r = rest(hurt, 0);
    expect(r.gold).toBe(0);
    expect(r.members.every((m) => m.hp === 2)).toBe(true);
  });

  test('without the gold the room is refused, and the dead stay dead', () => {
    expect(() => rest(party(0), 2)).toThrow(/gold/i);
    const p = party(500);
    const withDead = { ...p, members: p.members.map((m, i) => (i === 0 ? { ...m, hp: 0, dead: true } : m)) };
    expect(rest(withDead, 2).members[0].dead).toBe(true);
  });
});

describe('temple', () => {
  const dead = (): Party => { const p = party(2000); return { ...p, members: p.members.map((m, i) => (i === 0 ? { ...m, hp: 0, dead: true } : m)) }; };

  test('raising the dead can succeed and can fail, and a failure can leave ash', () => {
    const outcomes = new Set<string>();
    for (let seed = 1; seed < 200; seed++) {
      const m = raise(dead(), dead().members[0].id, createRng(seed)).members[0];
      outcomes.add(m.ash ? 'ash' : m.dead ? 'dead' : 'alive');
    }
    expect(outcomes).toEqual(new Set(['alive', 'dead', 'ash']));
  });

  test('ash cannot be raised by the ordinary rite, but the costly ash rite can work', () => {
    const p = dead();
    const ash = { ...p, members: p.members.map((m, i) => (i === 0 ? { ...m, ash: true } : m)) };
    expect(() => raise(ash, ash.members[0].id, createRng(1))).toThrow(/ash/i);
    let worked = false;
    for (let seed = 1; seed < 100 && !worked; seed++) {
      const r = raise(ash, ash.members[0].id, createRng(seed), 2);
      worked = !!r.members.find((m) => m.id === ash.members[0].id && !m.dead && !m.ash);
    }
    expect(worked).toBe(true);
  });

  test('the rite costs gold, and a living member cannot be raised', () => {
    const p = dead();
    expect(raise(p, p.members[0].id, createRng(1)).gold).toBeLessThan(2000);
    expect(() => raise(party(0), party().members[0].id, createRng(1))).toThrow();
    expect(() => raise({ ...p, gold: 0 }, p.members[0].id, createRng(1))).toThrow(/gold/i);
  });
});

describe('information and tales', () => {
  test('there are twelve tales and every hint points at a real discovery', () => {
    expect(TALES).toHaveLength(12);
    expect(validateData()).toEqual([]);
    expect(new Set(TALES.map((t) => t.tone))).toEqual(new Set(['funny', 'sad', 'uplifting', 'memorable']));
  });

  test('a tale is never repeated for the same party until they run out', () => {
    let p = party();
    const heard = new Set<string>();
    for (let i = 0; i < 12; i++) {
      const r = tale(p, createRng(i + 1));
      expect(r.tale).not.toBeNull();
      expect(heard.has(r.tale!.id)).toBe(false);
      heard.add(r.tale!.id);
      p = r.party;
    }
    expect(tale(p, createRng(99)).tale).toBeNull();
  });

  test('the informant knows more once the party has found things', () => {
    const base = informant(party());
    const more = informant(applyDiscovery(party(), 'lienholders-primer'));
    expect(more.length).toBeGreaterThan(base.length);
  });

  test('the town copes with a wiped party without crashing', () => {
    const w = wiped();
    expect(isWiped(w)).toBe(true);
    expect(() => rest(w, 0)).not.toThrow();
    expect(() => informant(w)).not.toThrow();
    expect(tale(w, createRng(1)).tale).not.toBeUndefined();
    expect(recruits(1, createRng(1), w).length).toBeGreaterThan(0);
  });
});

describe('review fixes: recruiting', () => {
  test('someone already in the party is never offered again, whatever the shuffle', () => {
    const base = party();
    for (let seed = 1; seed <= 20; seed++) {
      const hired = recruits(1, createRng(seed), emptyParty())[0];
      const p = addToParty(base, hired);
      for (let again = 100; again < 140; again++) {
        expect(recruits(1, createRng(again), p).some((c) => c.name === hired.name), ).toBe(false);
      }
    }
  });
});
