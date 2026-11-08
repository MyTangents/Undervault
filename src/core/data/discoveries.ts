import type { DiscoveryDef } from '../types';

/** Things the party can find below. Each opens options, not raw numbers. Texts are placeholders until the content pass. */
export const DISCOVERIES: DiscoveryDef[] = [
  {
    id: 'cinder-codex', name: 'The Cinder Codex', kind: 'knowledge',
    text: 'A scorched ledger of spells nobody has had permission to cast in three hundred years.',
    unlocks: [{ kind: 'spell', spellId: 'kiln-roar' }],
  },
  {
    id: 'martyrs-psalter', name: "The Martyr's Psalter", kind: 'knowledge',
    text: 'Hymns written for the dying, with margin notes by people who clearly lived.',
    unlocks: [{ kind: 'spell', spellId: 'mass-mend' }],
  },
  {
    id: 'toll-blade', name: "The Tollkeeper's Blade", kind: 'weapon',
    text: 'It collects what it is owed. Mostly from whoever is holding it.',
    unlocks: [{ kind: 'technique', id: 'toll-strike' }],
  },
  {
    id: 'debt-seal', name: 'The Debt-Seal', kind: 'relic',
    text: 'A wax seal that has never melted. Whoever carries it is, legally, someone else\'s property.',
    unlocks: [{ kind: 'path', id: 'sealbearer' }],
  },
  {
    id: 'ledger-fragment', name: 'A Torn Page of the Ledger', kind: 'lore',
    text: 'The page shows the sum owed. Somebody has crossed it out and written a larger one.',
    unlocks: [{ kind: 'shop', itemId: 'sealed-ledger-key' }],
  },
];
