import type { Rng } from './rng';
import type { Attr, Character, Party } from './types';
import { ATTRS } from './types';
import { CLASSES, DISCOVERIES, SPELLS } from './data';
import { isActive, roll } from './combat/util';

// paced for a short demo: a few fights earn the first level, and each later level takes a little longer
const THRESHOLDS = [0, 40, 110, 230, 420, 700, 1100, 1700, 2500, 3500];
/** Experience needed to reach `level`. */
export function xpForLevel(level: number): number {
  if (level <= THRESHOLDS.length) return THRESHOLDS[level - 1];
  return THRESHOLDS[THRESHOLDS.length - 1] + (level - THRESHOLDS.length) * 1500;
}

/** Splits experience among the living; the remainder goes to the first of them. */
export function awardXp(p: Party, xp: number): Party {
  const alive = p.members.filter(isActive);
  if (alive.length === 0) return p;
  const each = Math.floor(xp / alive.length);
  const extra = xp - each * alive.length;
  let first = true;
  return {
    ...p,
    members: p.members.map((m) => {
      if (!isActive(m)) return m;
      const gain = each + (first ? extra : 0);
      first = false;
      return { ...m, xp: m.xp + gain };
    }),
  };
}

export const canLevelUp = (c: Character): boolean => isActive(c) && c.xp >= xpForLevel(c.level + 1);

/** Spell charges for spell level `n` at character level `level`: none until the level is reached, then growing. */
export function chargesFor(level: number, n: number): number {
  const avail = level - (2 * n - 2);
  return avail <= 0 ? 0 : Math.min(9, avail + 1);
}

/** Levelling happens at the inn. Raises hit points, shifts attributes a little, grows casters' charges and spell lists. */
export function levelUp(c: Character, rng: Rng, ctx: { atInn: boolean }): Character {
  if (!ctx.atInn) throw new Error('levelling up happens at the inn');
  if (!canLevelUp(c)) throw new Error(`${c.name} does not have enough experience to level up`);
  const cls = CLASSES.find((k) => k.id === c.classId)!;
  const level = c.level + 1;
  const stats = { ...c.stats };
  for (const a of ATTRS as readonly Attr[]) {
    if (rng.chance(0.25)) stats[a] = Math.min(18, Math.max(3, stats[a] + (rng.chance(0.6) ? 1 : -1)));
  }
  const gain = Math.max(1, roll([1, cls.hpDie], rng) + Math.max(0, Math.floor((stats.vit - 8) / 3)));
  const out: Character = { ...c, level, stats, maxHp: c.maxHp + gain, hp: c.hp + gain, charges: [...c.charges], maxCharges: [...c.maxCharges], known: [...c.known] };
  if (cls.school) {
    let highest = 0;
    for (let n = 1; n <= 7; n++) {
      const max = chargesFor(level, n);
      const diff = max - out.maxCharges[n - 1];
      if (max > 0) highest = n;
      if (diff > 0) { out.maxCharges[n - 1] = max; out.charges[n - 1] += diff; }
    }
    for (const sp of SPELLS) {
      if (sp.school === cls.school && sp.level <= highest && !sp.discoveryId && !out.known.includes(sp.id)) out.known.push(sp.id);
    }
  }
  return out;
}

const isFighter = (c: Character): boolean => {
  const cls = CLASSES.find((k) => k.id === c.classId)!;
  return cls.canUse.includes('sword') || cls.canUse.includes('axe');
};

/** Records a discovery and opens what it unlocks. Applying it again changes nothing. */
export function applyDiscovery(p: Party, id: string): Party {
  const d = DISCOVERIES.find((x) => x.id === id);
  if (!d) throw new Error(`unknown discovery ${id}`);
  if (p.discoveries.includes(id)) return p;
  let members = p.members;
  for (const u of d.unlocks) {
    if (u.kind === 'spell') {
      const spell = SPELLS.find((s) => s.id === u.spellId)!;
      members = members.map((m) => {
        const cls = CLASSES.find((k) => k.id === m.classId)!;
        return cls.school === spell.school && !m.known.includes(spell.id) ? { ...m, known: [...m.known, spell.id] } : m;
      });
    } else if (u.kind === 'technique') {
      members = members.map((m) => (isFighter(m) && !m.techniques.includes(u.id) ? { ...m, techniques: [...m.techniques, u.id] } : m));
    }
  }
  return { ...p, members, discoveries: [...p.discoveries, id] };
}

/** Build paths the party has opened that this character's class can take. */
const PATH_CLASSES: Record<string, string[]> = {
  installment: ['blade', 'spellwright', 'votary', 'cutpurse', 'oathblade', 'shade'],
};
export function availablePaths(c: Character, p: Party): string[] {
  const out: string[] = [];
  for (const id of p.discoveries) {
    const d = DISCOVERIES.find((x) => x.id === id);
    for (const u of d?.unlocks ?? []) {
      if (u.kind === 'path' && (PATH_CLASSES[u.id] ?? []).includes(c.classId)) out.push(u.id);
    }
  }
  return out;
}
