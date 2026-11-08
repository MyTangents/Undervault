import type { SpellDef } from '../types';

/** Demo spell list: levels 1-3 of two schools. The model supports seven levels. */
export const SPELLS: SpellDef[] = [
  // arcane
  { id: 'cinder-dart', name: 'Cinder Dart', school: 'arcane', level: 1, kind: 'damage', target: 'single', power: [2, 4] },
  { id: 'lull', name: 'Lull', school: 'arcane', level: 1, kind: 'sleep', target: 'group', power: [0, 0] },
  { id: 'gloamward', name: 'Gloamward', school: 'arcane', level: 1, kind: 'buff', target: 'party', power: [0, 0] },
  { id: 'seam-sight', name: 'Seam Sight', school: 'arcane', level: 1, kind: 'detect', target: 'party', power: [0, 0] },
  { id: 'ash-gust', name: 'Ash Gust', school: 'arcane', level: 2, kind: 'damage', target: 'group', power: [2, 5] },
  { id: 'hush', name: 'Hush', school: 'arcane', level: 2, kind: 'silence', target: 'group', power: [0, 0] },
  { id: 'name-thing', name: 'Name the Thing', school: 'arcane', level: 2, kind: 'identify', target: 'single', power: [0, 0] },
  { id: 'kiln-roar', name: 'Kiln Roar', school: 'arcane', level: 3, kind: 'damage', target: 'group', power: [4, 6], discoveryId: 'cinder-codex' },
  { id: 'slip-knot', name: 'Slip the Knot', school: 'arcane', level: 3, kind: 'escape', target: 'party', power: [0, 0] },
  // sacred
  { id: 'mend', name: 'Mend', school: 'sacred', level: 1, kind: 'heal', target: 'ally', power: [1, 8] },
  { id: 'rebuke', name: 'Rebuke', school: 'sacred', level: 1, kind: 'damage', target: 'single', power: [1, 6] },
  { id: 'deeper-mend', name: 'Deeper Mend', school: 'sacred', level: 2, kind: 'heal', target: 'ally', power: [3, 8] },
  { id: 'still-tongue', name: 'Still Tongue', school: 'sacred', level: 2, kind: 'silence', target: 'single', power: [0, 0] },
  { id: 'mass-mend', name: 'Mass Mend', school: 'sacred', level: 3, kind: 'heal', target: 'party', power: [2, 8], discoveryId: 'martyrs-psalter' },
  { id: 'lantern-ward', name: 'Lantern Ward', school: 'sacred', level: 3, kind: 'buff', target: 'party', power: [0, 0] },
];
