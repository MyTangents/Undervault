import type { ClassDef } from '../types';

export const CLASSES: ClassDef[] = [
  {
    id: 'blade', name: 'Blade', elite: false, gates: { str: 11 },
    alignments: ['good', 'neutral', 'evil'], hpDie: 10, abilities: [],
    canUse: ['sword', 'axe', 'mace', 'dagger', 'heavy', 'light', 'shield', 'helm', 'trinket'],
  },
  {
    id: 'spellwright', name: 'Spellwright', elite: false, gates: { iq: 11 },
    alignments: ['good', 'neutral', 'evil'], hpDie: 4, school: 'arcane', abilities: [],
    canUse: ['dagger', 'staff', 'robe', 'trinket'],
  },
  {
    id: 'votary', name: 'Votary', elite: false, gates: { pie: 11 },
    alignments: ['good', 'neutral'], hpDie: 8, school: 'sacred', abilities: [],
    canUse: ['mace', 'staff', 'light', 'shield', 'helm', 'trinket'],
  },
  {
    id: 'cutpurse', name: 'Cutpurse', elite: false, gates: { agi: 11 },
    alignments: ['neutral', 'evil'], hpDie: 6, abilities: ['disarm'],
    canUse: ['dagger', 'sword', 'light', 'trinket'],
  },
  {
    id: 'oathblade', name: 'Oathblade', elite: true,
    gates: { str: 14, iq: 10, pie: 13, vit: 13, agi: 10, luck: 12 },
    alignments: ['good'], hpDie: 10, school: 'sacred', abilities: [],
    canUse: ['sword', 'axe', 'mace', 'heavy', 'light', 'shield', 'helm', 'trinket'],
  },
  {
    id: 'shade', name: 'Shade', elite: true,
    gates: { str: 13, iq: 11, pie: 10, vit: 12, agi: 15, luck: 12 },
    alignments: ['neutral', 'evil'], hpDie: 6, abilities: ['disarm', 'identify'],
    canUse: ['dagger', 'sword', 'light', 'trinket'],
  },
];
