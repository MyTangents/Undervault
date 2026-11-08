/** Asking for orders one member at a time, the way the old crawlers did. Pure: no DOM, so it is tested on its own. */
import { ITEMS, SPELLS } from '../../core/data';
import type { CombatState, Order } from '../../core/combat/types';
import { canAct, groupLiving, isActive } from '../../core/combat/util';
import type { Character, SpellDef } from '../../core/types';
import { legalOrders } from './flow';
import type { OrderKind } from './flow';

export interface Choice { kind: OrderKind; key: string; label: string; enabled: boolean }

const KINDS: { kind: OrderKind; key: string; label: string }[] = [
  { kind: 'fight', key: 'f', label: 'Fight' },
  { kind: 'spell', key: 's', label: 'Spell' },
  { kind: 'parry', key: 'p', label: 'Parry' },
  { kind: 'use', key: 'u', label: 'Use' },
  { kind: 'run', key: 'r', label: 'Run' },
];

/** What a spell is aimed at: a monster group, one ally, or nobody in particular. */
export type SpellAim = 'group' | 'ally' | 'party';
export function spellAim(sp: SpellDef): SpellAim {
  if (['damage', 'sleep', 'silence', 'identify'].includes(sp.kind)) return 'group';
  if (sp.kind === 'heal' && sp.target === 'ally') return 'ally';
  return 'party';
}

/** The spells a member could cast right now: known, with a charge left, and unlocked by what the party has found. */
export function castable(s: CombatState, m: Character): SpellDef[] {
  const out: SpellDef[] = [];
  for (const id of m.known) {
    const sp = SPELLS.find((x) => x.id === id);
    if (!sp || (m.charges[sp.level - 1] ?? 0) <= 0) continue;
    if (sp.discoveryId && !s.party.discoveries.includes(sp.discoveryId)) continue;
    out.push(sp);
  }
  return out;
}

/** Distinct consumables a member is carrying. */
export function usable(m: Character): string[] {
  return [...new Set(m.inventory)].filter((id) => ITEMS.find((i) => i.id === id)?.kind === 'consumable');
}

export class CombatOrders {
  private asked: Character[];
  private at = 0;
  private given: Record<string, Order> = {};

  constructor(private state: CombatState, private previous: Record<string, Order> = {}) {
    this.asked = state.party.members.filter(canAct);
  }

  current(): Character | null { return this.asked[this.at] ?? null; }
  done(): boolean { return this.at >= this.asked.length; }

  /** All five orders, with only the legal ones enabled. */
  choices(): Choice[] {
    const m = this.current();
    if (!m) return [];
    const legal = legalOrders(m);
    return KINDS.map((k) => ({ ...k, enabled: legal.includes(k.kind) }));
  }

  answer(order: Order): void {
    const m = this.current();
    if (!m) return;
    this.given[m.id] = order;
    this.at++;
  }

  /** Steps back to the previous member and forgets their order. */
  takeBack(): void {
    if (this.at === 0) return;
    this.at--;
    delete this.given[this.asked[this.at].id];
  }

  /** Gives the current member last round's order if it still makes sense. */
  repeat(): boolean {
    const m = this.current();
    const o = m ? this.previous[m.id] : undefined;
    if (!m || !o || !this.stillLegal(m, o)) return false;
    this.answer(o);
    return true;
  }

  /** Answers every remaining member from `auto` (anyone it does not mention parries). */
  autoFill(auto: Record<string, Order>): void {
    while (!this.done()) this.answer(auto[this.current()!.id] ?? { kind: 'parry' });
  }

  orders(): Record<string, Order> { return { ...this.given }; }

  private stillLegal(m: Character, o: Order): boolean {
    if (!legalOrders(m).includes(o.kind)) return false;
    const s = this.state;
    if (o.kind === 'fight') { const g = s.groups[o.group]; return !!g && groupLiving(g) > 0; }
    if (o.kind === 'spell') {
      const sp = castable(s, m).find((x) => x.id === o.spellId);
      if (!sp) return false;
      const aim = spellAim(sp);
      if (aim === 'group') { const g = s.groups[o.target]; return !!g && groupLiving(g) > 0; }
      if (aim === 'ally') { const a = s.party.members[o.target]; return !!a && isActive(a); }
      return true;
    }
    if (o.kind === 'use') {
      const a = s.party.members[o.target];
      return usable(m).includes(o.itemId) && !!a && isActive(a);
    }
    return true;
  }
}
