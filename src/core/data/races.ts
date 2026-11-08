import type { RaceDef } from '../types';

export const RACES: RaceDef[] = [
  { id: 'human', name: 'Human', base: { str: 8, iq: 8, pie: 8, vit: 8, agi: 8, luck: 8 } },
  { id: 'barrowfolk', name: 'Barrowfolk', base: { str: 10, iq: 6, pie: 7, vit: 10, agi: 6, luck: 7 } },
  { id: 'lanternkin', name: 'Lanternkin', base: { str: 6, iq: 8, pie: 9, vit: 7, agi: 10, luck: 10 } },
  { id: 'thornborn', name: 'Thornborn', base: { str: 7, iq: 10, pie: 10, vit: 6, agi: 9, luck: 6 } },
  { id: 'cinderkin', name: 'Cinderkin', base: { str: 9, iq: 7, pie: 5, vit: 9, agi: 8, luck: 9 } },
];
