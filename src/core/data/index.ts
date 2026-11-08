import type { ClassDef, DiscoveryDef, ItemDef, MonsterDef, RaceDef, SpellDef, TaleDef } from '../types';
import { ATTRS } from '../types';
import { RACES } from './races';
import { CLASSES } from './classes';
import { SPELLS } from './spells';
import { ITEMS } from './items';
import { MONSTERS } from './monsters';
import { TALES } from './tales';
import { DISCOVERIES } from './discoveries';

export { RACES, CLASSES, SPELLS, ITEMS, MONSTERS, TALES, DISCOVERIES };

export interface DataTables {
  races: RaceDef[];
  classes: ClassDef[];
  spells: SpellDef[];
  items: ItemDef[];
  monsters: MonsterDef[];
  tales: TaleDef[];
  discoveries: DiscoveryDef[];
}

/** Returns a list of problems with the data tables (empty when valid). Pass overrides to test bad data. */
export function validateData(over: Partial<DataTables> = {}): string[] {
  const t: DataTables = {
    races: RACES, classes: CLASSES, spells: SPELLS, items: ITEMS, monsters: MONSTERS,
    tales: TALES, discoveries: DISCOVERIES, ...over,
  };
  const problems: string[] = [];
  const ids = (xs: { id: string }[]) => new Set(xs.map((x) => x.id));
  const spellIds = ids(t.spells), discoveryIds = ids(t.discoveries), itemIds = ids(t.items);

  for (const s of t.spells) {
    if (s.discoveryId && !discoveryIds.has(s.discoveryId)) problems.push(`spell ${s.id}: missing discovery ${s.discoveryId}`);
    if (s.level < 1 || s.level > 7) problems.push(`spell ${s.id}: level ${s.level} out of range`);
  }
  for (const m of t.monsters) for (const sp of m.spells ?? []) {
    if (!spellIds.has(sp)) problems.push(`monster ${m.id}: missing spell ${sp}`);
  }
  for (const c of t.classes) for (const a of Object.keys(c.gates)) {
    if (!ATTRS.includes(a as never)) problems.push(`class ${c.id}: unknown attribute ${a}`);
  }
  for (const it of t.items) if (it.spellId && !spellIds.has(it.spellId)) problems.push(`item ${it.id}: missing spell ${it.spellId}`);
  for (const tale of t.tales) if (tale.hints && !discoveryIds.has(tale.hints)) problems.push(`tale ${tale.id}: missing discovery ${tale.hints}`);
  for (const d of t.discoveries) for (const u of d.unlocks) {
    if (u.kind === 'spell' && !spellIds.has(u.spellId)) problems.push(`discovery ${d.id}: missing spell ${u.spellId}`);
    if (u.kind === 'shop' && !itemIds.has(u.itemId)) problems.push(`discovery ${d.id}: missing item ${u.itemId}`);
  }
  return problems;
}
