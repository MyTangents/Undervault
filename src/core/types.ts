/** Shared rule types. No DOM and no Three.js in src/core. */

export type Attr = 'str' | 'iq' | 'pie' | 'vit' | 'agi' | 'luck';
export const ATTRS: readonly Attr[] = ['str', 'iq', 'pie', 'vit', 'agi', 'luck'];
export type Stats = Record<Attr, number>;
export type Alignment = 'good' | 'neutral' | 'evil';
export type Row = 'front' | 'back';
export type StatusId = 'asleep' | 'silenced' | 'poisoned' | 'paralysed' | 'shielded' | 'blessed';
export type Dice = [count: number, sides: number];

export interface Character {
  id: string;
  name: string;
  raceId: string;
  classId: string;
  alignment: Alignment;
  level: number;
  xp: number;
  stats: Stats;
  hp: number;
  maxHp: number;
  /** charges[n-1] = charges left for spell level n (1..7) */
  charges: number[];
  maxCharges: number[];
  known: string[];
  techniques: string[];
  inventory: string[];
  equipped: Record<string, string>;
  status: StatusId[];
  dead: boolean;
  ash: boolean;
  row: Row;
}

export interface Party {
  members: Character[];
  gold: number;
  discoveries: string[];
  /** item ids the party has identified */
  identified?: string[];
  /** tale ids the party has already heard */
  heardTales?: string[];
}

export interface RaceDef {
  id: string;
  name: string;
  base: Stats;
}

export interface ClassDef {
  id: string;
  name: string;
  elite: boolean;
  /** minimum attributes needed to take this class */
  gates: Partial<Stats>;
  alignments: Alignment[];
  hpDie: number;
  school?: 'arcane' | 'sacred';
  abilities: string[];
  /** item tags this class may equip */
  canUse: string[];
}

export type SpellKind = 'damage' | 'sleep' | 'silence' | 'buff' | 'heal' | 'detect' | 'escape' | 'identify';
export interface SpellDef {
  id: string;
  name: string;
  school: 'arcane' | 'sacred';
  level: number;
  kind: SpellKind;
  target: 'single' | 'group' | 'party' | 'ally';
  power: Dice;
  /** castable only once the party has this discovery */
  discoveryId?: string;
}

export type ItemKind = 'weapon' | 'armour' | 'shield' | 'helm' | 'trinket' | 'consumable';
export interface ItemDef {
  id: string;
  name: string;
  kind: ItemKind;
  tag: string;
  price: number;
  damage?: Dice;
  ac?: number;
  cursed?: boolean;
  /** shown as this until identified */
  unidentifiedName?: string;
  /** spell id cast when used (consumables) */
  spellId?: string;
}

export type MonsterBehaviour = 'brute' | 'skittish' | 'caster' | 'swarm' | 'ambusher';
export interface MonsterDef {
  id: string;
  name: string;
  depth: [min: number, max: number];
  hp: Dice;
  ac: number;
  attacks: number;
  damage: Dice;
  /** group size range when met */
  group: [min: number, max: number];
  behaviour: MonsterBehaviour;
  spells?: string[];
  xp: number;
  gold: Dice;
  pictureId: string;
}

export type Tone = 'funny' | 'sad' | 'uplifting' | 'memorable';
export interface TaleDef {
  id: string;
  speaker: string;
  tone: Tone;
  text: string;
  /** discovery this tale points the party toward */
  hints?: string;
}

export type Unlock =
  | { kind: 'spell'; spellId: string }
  | { kind: 'technique'; id: string }
  | { kind: 'path'; id: string }
  | { kind: 'shop'; itemId: string };
export interface DiscoveryDef {
  id: string;
  name: string;
  kind: 'knowledge' | 'weapon' | 'relic' | 'lore';
  text: string;
  unlocks: Unlock[];
}
