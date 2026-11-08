import type { Rng } from './rng';
import type { Alignment, Character, Party, Stats, TaleDef } from './types';
import { DISCOVERIES, TALES } from './data';
import { createCharacter } from './party';
import type { ShopDef } from './items';
import { isActive } from './combat/util';

export interface PlaceDef {
  id: string;
  name: string;
  kind: 'recruiter' | 'shop' | 'temple' | 'inn' | 'informant' | 'tales';
  blurb: string;
}

/** Crowhithe is a menu, not a map: you pick a place and you are there. */
export const PLACES: PlaceDef[] = [
  { id: 'tavern', name: 'The Sump Tap', kind: 'recruiter', blurb: 'Dennis Brannoch pours, lies about his past, and finds you people who need work.' },
  { id: 'smith', name: "Ferrule's Forge", kind: 'shop', blurb: 'Hobb Ferrule names every blade and refuses to sell the ones he likes.' },
  { id: 'temple', name: 'The House of Ash', kind: 'temple', blurb: 'The Sisters believe a body is a loan and ash is the receipt. They are kind, tired, and bad at bookkeeping.' },
  { id: 'inn', name: 'The Last Mattress', kind: 'inn', blurb: 'Wenna Ashby remembers every guest\'s last words, if they were rude enough.' },
  { id: 'informant', name: "Maud's Pawnshop", kind: 'informant', blurb: 'Maud pays in tiny coins, each wrapped in a new rumour.' },
  { id: 'tales', name: 'The Lamp and Lung', kind: 'tales', blurb: 'Old Tamsin Quell tells every story as if she were there, and corrects anyone who says she wasn\'t.' },
];

export const canTravel = (from: string, to: string): boolean =>
  from !== to && PLACES.some((p) => p.id === from) && PLACES.some((p) => p.id === to);

/** What the forge sells. Items that need a discovery appear only once the party has found it. */
export const SHOP: ShopDef = {
  stock: [
    { itemId: 'bread-knife' }, { itemId: 'short-sword' }, { itemId: 'hand-axe' }, { itemId: 'iron-mace' },
    { itemId: 'oak-staff' }, { itemId: 'leather-jerkin' }, { itemId: 'chain-shirt' }, { itemId: 'scholar-robe' },
    { itemId: 'round-shield' }, { itemId: 'iron-cap' }, { itemId: 'mending-draught' },
    { itemId: 'sealed-ledger-key', requiresDiscovery: 'saint-orrels-ledger' },
  ],
};

interface RecruitSpec { name: string; raceId: string; classId: string; alignment: Alignment; alloc: Partial<Stats> }
const Z: Stats = { str: 0, iq: 0, pie: 0, vit: 0, agi: 0, luck: 0 };
const POOL: RecruitSpec[] = [
  { name: 'Perrin Lowe', raceId: 'thornborn', classId: 'votary', alignment: 'good', alloc: { pie: 2, vit: 5 } },
  { name: 'Gudrun Sixfingers', raceId: 'barrowfolk', classId: 'blade', alignment: 'neutral', alloc: { str: 3, vit: 4 } },
  { name: 'Thessaly Vane', raceId: 'thornborn', classId: 'spellwright', alignment: 'neutral', alloc: { iq: 3, vit: 4 } },
  { name: 'Brother Kesk', raceId: 'cinderkin', classId: 'blade', alignment: 'evil', alloc: { str: 3, vit: 4 } },
  { name: 'Joss Marrow', raceId: 'lanternkin', classId: 'cutpurse', alignment: 'evil', alloc: { agi: 2, str: 5 } },
  { name: 'Hedda Vole', raceId: 'human', classId: 'blade', alignment: 'good', alloc: { str: 5, vit: 5 } },
  { name: 'Aldous Pike', raceId: 'lanternkin', classId: 'votary', alignment: 'neutral', alloc: { pie: 3, vit: 4 } },
  { name: 'Wick Tanner', raceId: 'human', classId: 'spellwright', alignment: 'evil', alloc: { iq: 6, vit: 4 } },
];

/** Up to four recruits waiting at the tavern, none whose alignment clashes with the party's. */
export function recruits(day: number, rng: Rng, party: Party): Character[] {
  const hasGood = party.members.some((m) => m.alignment === 'good');
  const hasEvil = party.members.some((m) => m.alignment === 'evil');
  const ok = POOL.filter((s) => !(hasGood && s.alignment === 'evil') && !(hasEvil && s.alignment === 'good'));
  const picks = [...ok];
  // a seeded shuffle (Fisher-Yates) keeps the choice repeatable; callers seed it from the day
  for (let i = picks.length - 1; i > 0; i--) { const j = rng.int(0, i); [picks[i], picks[j]] = [picks[j], picks[i]]; }
  void day; // the caller seeds `rng` from the day; kept in the signature so a later version can age the pool
  return picks.slice(0, 4).map((s) => createCharacter(
    { name: s.name, raceId: s.raceId, classId: s.classId, alignment: s.alignment, pool: 19 }, { ...Z, ...s.alloc }, rng));
}

const ROOMS = [
  { cost: 0, heal: 0, charges: false },
  { cost: 10, heal: 0.5, charges: false },
  { cost: 30, heal: 1, charges: true },
  { cost: 80, heal: 1, charges: true },
];

/** The Last Mattress. Tier 0 is the stable (free, heals nothing); tier 2 and 3 restore everything. */
export function rest(p: Party, tier: number): Party {
  const room = ROOMS[Math.max(0, Math.min(ROOMS.length - 1, tier))];
  if (p.gold < room.cost) throw new Error(`not enough gold for that room (${room.cost})`);
  return {
    ...p,
    gold: p.gold - room.cost,
    members: p.members.map((m) => {
      if (!isActive(m)) return m;
      const hp = room.heal >= 1 ? m.maxHp : Math.min(m.maxHp, m.hp + Math.ceil((m.maxHp - m.hp) * room.heal));
      return { ...m, hp, charges: room.charges ? [...m.maxCharges] : m.charges, status: tier >= 2 ? [] : m.status };
    }),
  };
}

/**
 * The House of Ash. The ordinary rite (tier 1) raises the dead and sometimes fails, and a failure can leave ash.
 * Ash needs the costly ash rite (tier 2); if that fails too, the person is gone for good.
 */
export function raise(p: Party, id: string, rng: Rng, tier = 1): Party {
  const m = p.members.find((x) => x.id === id);
  if (!m) throw new Error(`no such member ${id}`);
  if (!m.dead && !m.ash) throw new Error(`${m.name} is not dead`);
  if (m.ash && tier < 2) throw new Error(`${m.name} is ash. The ordinary rite will not do; it needs the ash rite`);
  const cost = Math.max(100, m.level * 100) * (tier >= 2 ? 3 : 1);
  if (p.gold < cost) throw new Error(`not enough gold for the rite (${cost})`);
  const paid = { ...p, gold: p.gold - cost };
  const chance = tier >= 2 ? 0.5 : Math.min(0.9, 0.55 + m.stats.vit * 0.02);
  if (rng.chance(chance)) {
    return { ...paid, members: paid.members.map((x) => (x.id === id ? { ...x, dead: false, ash: false, hp: tier >= 2 ? Math.ceil(x.maxHp / 2) : 1 } : x)) };
  }
  if (tier >= 2) return { ...paid, members: paid.members.filter((x) => x.id !== id) };
  if (rng.chance(0.5)) return { ...paid, members: paid.members.map((x) => (x.id === id ? { ...x, ash: true } : x)) };
  return paid;
}

const BASE_INFO = [
  'The Undervault goes down further than the Wardens will admit. The first layers are mostly rats, bones and candle fat.',
  'Light is everything. Burn it slow, and carry spare oil.',
  'The Sisters at the House of Ash can raise you, mostly. Do not count on the "mostly".',
];
const INFO_BY_DISCOVERY: Record<string, string> = {
  'lienholders-primer': 'That primer you found teaches casting against tomorrow. Good for a bad day, ruinous for a bad week.',
  'tally-hymnal': 'The Tally-Singers will want that hymnal back. They sing the count, and a lost song is a lost sum.',
  'overdraft-blade': 'A blade that bills the wielder. Ask yourself who the first creditor was, and whether they are still down there.',
  'quiets-receipt': 'A receipt from the Quiet Below. Nobody gets one. Keep it somewhere dry, and do not let the Wardens see.',
  'saint-orrels-ledger': 'Orrel\'s ledger has a last page that is a key. Ferrule says he can make the lock, if someone buys it.',
};

/** Maud's information: some for everyone, more for a party that has found things. */
export function informant(p: Party): string[] {
  const lines = [...BASE_INFO];
  for (const id of p.discoveries) {
    const line = INFO_BY_DISCOVERY[id];
    if (line && DISCOVERIES.some((d) => d.id === id)) lines.push(line);
  }
  return lines;
}

/** A tale the party has not heard yet, skipping any that point at something they already found. Null when they have heard them all. */
export function tale(p: Party, rng: Rng): { party: Party; tale: TaleDef | null } {
  const heard = p.heardTales ?? [];
  const fresh = TALES.filter((t) => !heard.includes(t.id));
  const useful = fresh.filter((t) => !t.hints || !p.discoveries.includes(t.hints));
  const pool = useful.length > 0 ? useful : fresh;
  if (pool.length === 0) return { party: p, tale: null };
  const t = rng.pick(pool);
  return { party: { ...p, heardTales: [...heard, t.id] }, tale: t };
}
