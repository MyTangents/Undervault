import { describe, expect, test } from 'vitest';
import { createRng } from '../src/core/rng';
import { createCharacter, emptyParty, addToParty } from '../src/core/party';
import { armourClass } from '../src/core/combat/util';
import type { Character, Party } from '../src/core/types';
import {
  buy, displayName, equip, identifyItem, sell, unequip, visibleStock, INVENTORY_LIMIT, type ShopDef,
} from '../src/core/items';
import { hero, ZERO } from './helpers';

const blade = (inv: string[] = []): Character => ({ ...hero('Brannoc'), inventory: inv });
const shade = (): Character => createCharacter(
  { name: 'Shade', raceId: 'human', classId: 'shade', alignment: 'neutral', pool: 30 },
  { ...ZERO, str: 5, iq: 3, pie: 2, vit: 4, agi: 7, luck: 4 }, createRng(1),
);
const partyWith = (c: Character, gold = 100, discoveries: string[] = []): Party => ({ ...addToParty(emptyParty(), c), gold, discoveries });
const shop: ShopDef = { stock: [{ itemId: 'short-sword' }, { itemId: 'leather-jerkin' }, { itemId: 'sealed-ledger-key', requiresDiscovery: 'saint-orrels-ledger' }] };

describe('equipment', () => {
  test('equipping moves an item from the pack to its slot, and unequipping returns it', () => {
    const c = equip(blade(['short-sword']), 'short-sword');
    expect(c.inventory).toEqual([]);
    expect(c.equipped.weapon).toBe('short-sword');
    const back = unequip(c, 'weapon');
    expect(back.inventory).toEqual(['short-sword']);
    expect(back.equipped.weapon).toBeUndefined();
  });

  test('a class cannot equip gear outside its tags', () => {
    const wright = hero('Isolde', 'spellwright', { iq: 4, str: 0 });
    expect(() => equip({ ...wright, inventory: ['chain-shirt'] }, 'chain-shirt')).toThrow(/cannot use/i);
  });

  test('an item not in the pack cannot be equipped', () => {
    expect(() => equip(blade(), 'short-sword')).toThrow(/not carrying/i);
  });

  test('a cursed item stays equipped and blocks replacement', () => {
    const c = equip(blade(['overdraft-blade', 'short-sword']), 'overdraft-blade');
    expect(() => unequip(c, 'weapon')).toThrow(/cursed/i);
    expect(() => equip(c, 'short-sword')).toThrow(/cursed/i);
  });

  test('equipped armour lowers armour class', () => {
    const c = equip(blade(['leather-jerkin']), 'leather-jerkin');
    expect(armourClass(blade())).toBe(10);
    expect(armourClass(c)).toBe(8);
  });
});

describe('identification', () => {
  test('an unidentified item shows a vague name until a class with the ability identifies it', () => {
    let p = partyWith(shade());
    expect(displayName(p, 'overdraft-blade')).toBe('Odd Sword');
    const byBlade = identifyItem(partyWith(blade()), 'overdraft-blade', blade());
    expect(displayName(byBlade, 'overdraft-blade')).toBe('Odd Sword');
    p = identifyItem(p, 'overdraft-blade', p.members[0]);
    expect(displayName(p, 'overdraft-blade')).toBe('The Overdraft Blade');
  });
});

describe('shop', () => {
  test('buying costs gold and adds the item to the buyer', () => {
    const c = blade();
    const p = buy(partyWith(c, 100), 'short-sword', shop, c.id);
    expect(p.gold).toBe(100 - 40);
    expect(p.members[0].inventory).toContain('short-sword');
  });

  test('buying fails without enough gold, or with a full pack', () => {
    const c = blade();
    expect(() => buy(partyWith(c, 5), 'short-sword', shop, c.id)).toThrow(/gold/i);
    const full = { ...c, inventory: Array(INVENTORY_LIMIT).fill('bread-knife') };
    expect(() => buy(partyWith(full, 500), 'short-sword', shop, c.id)).toThrow(/full/i);
  });

  test('stock that needs a discovery is hidden until the party has it', () => {
    const c = blade();
    expect(visibleStock(partyWith(c), shop).map((i) => i.id)).toEqual(['short-sword', 'leather-jerkin']);
    expect(visibleStock(partyWith(c, 100, ['saint-orrels-ledger']), shop).map((i) => i.id)).toContain('sealed-ledger-key');
    expect(() => buy(partyWith(c, 5000), 'sealed-ledger-key', shop, c.id)).toThrow(/not for sale/i);
  });

  test('selling pays half the price and removes the item', () => {
    const c = blade(['short-sword']);
    const p = sell(partyWith(c, 0), c.id, 'short-sword');
    expect(p.gold).toBe(20);
    expect(p.members[0].inventory).toEqual([]);
  });
});
