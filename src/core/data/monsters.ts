import type { MonsterDef } from '../types';

/**
 * Demo bestiary: ten classic dungeon monsters with one readable quirk each (see the story kit, table F).
 * Behaviours: brute (hits the front), skittish (flees or calls help when hurt), caster (casts its spells),
 * swarm (piles on the weakest), ambusher (goes for the back row).
 */
export const MONSTERS: MonsterDef[] = [
  { id: 'ledger-rat', name: 'Ledger Rat', depth: [1, 2], hp: [1, 4], ac: 1, attacks: 1, damage: [1, 3], group: [3, 7],
    behaviour: 'swarm', xp: 3, gold: [1, 2], pictureId: 'rat' },
  { id: 'wick-slime', name: 'Wick Slime', depth: [1, 2], hp: [2, 8], ac: 1, attacks: 1, damage: [1, 4], group: [1, 4],
    behaviour: 'brute', xp: 8, gold: [2, 8], pictureId: 'slime' },
  { id: 'tally-skeleton', name: 'Tally Skeleton', depth: [1, 3], hp: [1, 8], ac: 3, attacks: 1, damage: [1, 4], group: [2, 6],
    behaviour: 'swarm', xp: 10, gold: [1, 6], pictureId: 'skeleton' },
  { id: 'drum-orc', name: 'Drum Orc', depth: [1, 3], hp: [1, 10], ac: 4, attacks: 1, damage: [1, 6], group: [1, 4],
    behaviour: 'skittish', xp: 15, gold: [3, 10], pictureId: 'orc' },
  { id: 'singing-cultist', name: 'Singing Cultist', depth: [1, 3], hp: [1, 6], ac: 2, attacks: 1, damage: [1, 4], group: [1, 3],
    behaviour: 'caster', spells: ['cinder-dart', 'hush'], xp: 20, gold: [2, 8], pictureId: 'cultist' },
  { id: 'bone-wolf', name: 'Bone Wolf', depth: [2, 4], hp: [2, 6], ac: 4, attacks: 1, damage: [1, 6], group: [3, 7],
    behaviour: 'swarm', xp: 18, gold: [0, 0], pictureId: 'wolf' },
  { id: 'cellar-ghoul', name: 'Cellar Ghoul', depth: [2, 4], hp: [2, 8], ac: 4, attacks: 2, damage: [1, 4], group: [1, 4],
    behaviour: 'brute', xp: 25, gold: [4, 12], pictureId: 'ghoul' },
  { id: 'hollow-wraith', name: 'Hollow Wraith', depth: [2, 5], hp: [5, 8], ac: 5, attacks: 1, damage: [1, 8], group: [1, 3],
    behaviour: 'ambusher', xp: 60, gold: [5, 15], pictureId: 'wraith' },
  { id: 'still-gargoyle', name: 'Still Gargoyle', depth: [3, 5], hp: [8, 8], ac: 6, attacks: 1, damage: [2, 8], group: [1, 2],
    behaviour: 'ambusher', xp: 70, gold: [6, 18], pictureId: 'gargoyle' },
  { id: 'repossessor', name: 'Repossessor', depth: [3, 5], hp: [14, 8], ac: 8, attacks: 3, damage: [2, 8], group: [1, 1],
    behaviour: 'caster', spells: ['hush', 'cinder-dart', 'lull'], xp: 300, gold: [20, 50], pictureId: 'demon' },
];
