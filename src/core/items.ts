import type { Character, ItemDef, Party } from './types';
import { CLASSES, ITEMS } from './data';

export const INVENTORY_LIMIT = 8;

export interface ShopDef {
  stock: { itemId: string; requiresDiscovery?: string }[];
}

const def = (id: string): ItemDef => {
  const it = ITEMS.find((i) => i.id === id);
  if (!it) throw new Error(`unknown item ${id}`);
  return it;
};

const SLOT: Record<string, string | undefined> = { weapon: 'weapon', armour: 'armour', shield: 'shield', helm: 'helm', trinket: 'trinket' };

export function equip(c: Character, itemId: string): Character {
  if (!c.inventory.includes(itemId)) throw new Error(`${c.name} is not carrying ${itemId}`);
  const it = def(itemId);
  const slot = SLOT[it.kind];
  if (!slot) throw new Error(`${it.name} cannot be equipped`);
  const cls = CLASSES.find((k) => k.id === c.classId)!;
  if (!cls.canUse.includes(it.tag)) throw new Error(`a ${cls.name} cannot use ${it.name}`);
  const current = c.equipped[slot];
  if (current && def(current).cursed) throw new Error(`${def(current).name} is cursed and will not come off`);
  const inventory = [...c.inventory];
  inventory.splice(inventory.indexOf(itemId), 1);
  if (current) inventory.push(current);
  return { ...c, inventory, equipped: { ...c.equipped, [slot]: itemId } };
}

export function unequip(c: Character, slot: string): Character {
  const current = c.equipped[slot];
  if (!current) return c;
  if (def(current).cursed) throw new Error(`${def(current).name} is cursed and will not come off`);
  if (c.inventory.length >= INVENTORY_LIMIT) throw new Error(`${c.name}'s pack is full`);
  const equipped = { ...c.equipped };
  delete equipped[slot];
  return { ...c, inventory: [...c.inventory, current], equipped };
}

export function displayName(p: Party, itemId: string): string {
  const it = def(itemId);
  return it.unidentifiedName && !(p.identified ?? []).includes(itemId) ? it.unidentifiedName : it.name;
}

/** Identification is a fact about the whole party; only a class with the ability can do it. */
export function identifyItem(p: Party, itemId: string, by: Character): Party {
  const cls = CLASSES.find((k) => k.id === by.classId);
  if (!cls?.abilities.includes('identify')) return p;
  return { ...p, identified: Array.from(new Set([...(p.identified ?? []), itemId])) };
}

export function visibleStock(p: Party, shop: ShopDef): ItemDef[] {
  return shop.stock
    .filter((s) => !s.requiresDiscovery || p.discoveries.includes(s.requiresDiscovery))
    .map((s) => def(s.itemId));
}

export function buy(p: Party, itemId: string, shop: ShopDef, memberId: string): Party {
  if (!visibleStock(p, shop).some((i) => i.id === itemId)) throw new Error(`${itemId} is not for sale here`);
  const it = def(itemId);
  if (p.gold < it.price) throw new Error(`not enough gold for ${it.name} (${it.price})`);
  const m = p.members.find((x) => x.id === memberId);
  if (!m) throw new Error(`no such member ${memberId}`);
  if (m.inventory.length >= INVENTORY_LIMIT) throw new Error(`${m.name}'s pack is full`);
  return {
    ...p,
    gold: p.gold - it.price,
    members: p.members.map((x) => (x.id === memberId ? { ...x, inventory: [...x.inventory, itemId] } : x)),
  };
}

export function sell(p: Party, memberId: string, itemId: string): Party {
  const m = p.members.find((x) => x.id === memberId);
  if (!m || !m.inventory.includes(itemId)) throw new Error(`${memberId} is not carrying ${itemId}`);
  const inventory = [...m.inventory];
  inventory.splice(inventory.indexOf(itemId), 1);
  return {
    ...p,
    gold: p.gold + Math.floor(def(itemId).price / 2),
    members: p.members.map((x) => (x.id === memberId ? { ...x, inventory } : x)),
  };
}
