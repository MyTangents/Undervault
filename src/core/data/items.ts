import type { ItemDef } from '../types';

/** Demo items. Tags match the `canUse` lists in classes.ts. */
export const ITEMS: ItemDef[] = [
  { id: 'bread-knife', name: 'Bread Knife', kind: 'weapon', tag: 'dagger', price: 8, damage: [1, 3] },
  { id: 'short-sword', name: "Candler's Shortsword", kind: 'weapon', tag: 'sword', price: 40, damage: [1, 6] },
  { id: 'hand-axe', name: "Quarryman's Axe", kind: 'weapon', tag: 'axe', price: 55, damage: [1, 8] },
  { id: 'iron-mace', name: "Ash-Sister's Mace", kind: 'weapon', tag: 'mace', price: 45, damage: [1, 6] },
  { id: 'oak-staff', name: 'Oak Staff', kind: 'weapon', tag: 'staff', price: 20, damage: [1, 4] },
  { id: 'leather-jerkin', name: 'Leather Jerkin', kind: 'armour', tag: 'light', price: 50, ac: 2 },
  { id: 'chain-shirt', name: 'Chain Shirt', kind: 'armour', tag: 'heavy', price: 200, ac: 4 },
  { id: 'scholar-robe', name: "Scholar's Robe", kind: 'armour', tag: 'robe', price: 60, ac: 1 },
  { id: 'round-shield', name: 'Round Shield', kind: 'shield', tag: 'shield', price: 35, ac: 1 },
  { id: 'iron-cap', name: 'Iron Cap', kind: 'helm', tag: 'helm', price: 30, ac: 1 },
  { id: 'mending-draught', name: 'Mending Draught', kind: 'consumable', tag: 'potion', price: 30, spellId: 'mend' },
  { id: 'overdraft-blade', name: 'The Overdraft Blade', kind: 'weapon', tag: 'sword', price: 600, damage: [2, 8],
    cursed: true, unidentifiedName: 'Odd Sword' },
  { id: 'sealed-ledger-key', name: 'Key to the Sealed Ledger', kind: 'trinket', tag: 'trinket', price: 900 },
];
