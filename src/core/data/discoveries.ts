import type { DiscoveryDef } from '../types';

/**
 * Things the party can find below. Each opens options rather than raw numbers (see the story kit, section 7).
 * Where they are found is set by the level files; the tales in tales.ts point toward them.
 */
export const DISCOVERIES: DiscoveryDef[] = [
  {
    id: 'lienholders-primer', name: "The Lienholders' Primer on Loans", kind: 'knowledge',
    text: 'Chiselled into a wall of the Receiving Hall: how to cast from tomorrow\'s reserves. Strong now, weaker later, and the bill always arrives.',
    unlocks: [{ kind: 'spell', spellId: 'kiln-roar' }],
  },
  {
    id: 'tally-hymnal', name: "The Tally-Singers' Hymnal", kind: 'knowledge',
    text: 'Held in the hands of a skeleton in the Drainage Shrine. The songs keep the count, and sung properly they turn losses into mercy.',
    unlocks: [{ kind: 'spell', spellId: 'mass-mend' }],
  },
  {
    id: 'overdraft-blade', name: 'The Overdraft Blade', kind: 'weapon',
    text: 'It hits harder than steel should. The damage is borrowed, and it shows up later on whoever swung it.',
    unlocks: [{ kind: 'technique', id: 'borrowed-blow' }],
  },
  {
    id: 'quiets-receipt', name: "The Quiet's Receipt", kind: 'relic',
    text: 'Given by the voice in the walls to a party that said yes. It acknowledges payments, and every death is an installment.',
    unlocks: [{ kind: 'path', id: 'installment' }],
  },
  {
    id: 'saint-orrels-ledger', name: "Saint Orrel's Ledger", kind: 'lore',
    text: 'A saint tried to write down everything the Vault owed and ran out of pages. The last entry is a key.',
    unlocks: [{ kind: 'shop', itemId: 'sealed-ledger-key' }],
  },
];
