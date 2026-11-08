import type { Rng } from './rng';
import { SPELLS } from './data';
import type { CombatEvent, CombatState, FizzleReason } from './combat/types';
import { damageMonster, firstLiving, groupLiving, isActive, roll } from './combat/util';

/**
 * Casts a spell inside a fight, mutating `s` in place (resolveRound works on a clone).
 * `target` is a monster group index for damage, sleep, silence and identify spells,
 * and a party slot for single-target heals. Party-wide spells ignore it.
 */
export function castSpell(
  s: CombatState, casterId: string, spellId: string, target: number, rng: Rng, opts: { free?: boolean } = {},
): CombatEvent[] {
  const caster = s.party.members.find((m) => m.id === casterId);
  const spell = SPELLS.find((x) => x.id === spellId);
  const fizzle = (reason: FizzleReason): CombatEvent[] => [{ t: 'fizzle', actor: casterId, spellId, reason }];
  if (!caster || !spell) return fizzle('unknown');
  if (!isActive(caster) || caster.status.includes('asleep') || caster.status.includes('paralysed')) return fizzle('asleep');
  // A free cast is an item doing the casting: it needs no known spell and no charge, and works even when silenced.
  if (!opts.free) {
    if (caster.status.includes('silenced')) return fizzle('silenced');
    if (!caster.known.includes(spellId)) return fizzle('unknown');
    if (spell.discoveryId && !s.party.discoveries.includes(spell.discoveryId)) return fizzle('locked');
    if ((caster.charges[spell.level - 1] ?? 0) <= 0) return fizzle('no charge');
  }

  const spend = () => { if (!opts.free) caster.charges[spell.level - 1] -= 1; };
  const group = s.groups[target];
  const needsGroup = ['damage', 'sleep', 'silence', 'identify'].includes(spell.kind);
  if (needsGroup && (!group || groupLiving(group) === 0)) return fizzle('no target');

  switch (spell.kind) {
    case 'damage': {
      spend();
      let dmg = 0, killed = 0;
      const targets = spell.target === 'group'
        ? group.hp.map((h, i) => (h > 0 ? i : -1)).filter((i) => i >= 0)
        : [firstLiving(group)];
      const single = spell.target !== 'group' ? roll(spell.power, rng) : 0;
      for (const mi of targets) {
        const d = spell.target === 'group' ? roll(spell.power, rng) : single;
        dmg += d;
        if (damageMonster(s, target, mi, d, rng)) killed++;
      }
      return [{ t: 'cast', actor: casterId, spellId, target, dmg, killed }];
    }
    case 'sleep': {
      spend();
      const ok = rng.chance(0.85);
      if (ok) group.asleep = true;
      return [{ t: 'cast', actor: casterId, spellId, target, effect: ok ? 'asleep' : 'resisted' }];
    }
    case 'silence':
      spend();
      group.silenced = true;
      return [{ t: 'cast', actor: casterId, spellId, target, effect: 'silenced' }];
    case 'buff':
      spend();
      for (const m of s.party.members) if (isActive(m) && !m.status.includes('shielded')) m.status.push('shielded');
      return [{ t: 'cast', actor: casterId, spellId, effect: 'shielded' }];
    case 'heal': {
      const members = spell.target === 'party' ? s.party.members.filter(isActive) : [s.party.members[target]].filter((m) => m && isActive(m));
      if (members.length === 0) return fizzle('no target');
      spend();
      let healed = 0;
      for (const m of members) {
        const before = m.hp;
        m.hp = Math.min(m.maxHp, m.hp + roll(spell.power, rng));
        healed += m.hp - before;
      }
      return [{ t: 'cast', actor: casterId, spellId, healed }];
    }
    case 'identify': {
      spend();
      const d = group.def;
      return [
        { t: 'cast', actor: casterId, spellId, target, effect: 'identified' },
        { t: 'note', text: `${d.name}: ${groupLiving(group)} left, armour ${d.ac}, ${d.behaviour}` },
      ];
    }
    case 'detect':
      spend();
      return [{ t: 'cast', actor: casterId, spellId, effect: 'detect' }];
    case 'escape':
      spend();
      s.escaped = true;
      return [{ t: 'cast', actor: casterId, spellId, effect: 'escape' }];
  }
}
