import type { MonsterDef, Party } from '../types';

export interface MonsterGroup {
  def: MonsterDef;
  /** one entry per monster; 0 means defeated */
  hp: number[];
  asleep: boolean;
  friendly: boolean;
  silenced: boolean;
  /** set when the group kills one of the party; shown as a warning */
  enraged: boolean;
}

export interface CombatState {
  party: Party;
  groups: MonsterGroup[];
  round: number;
  /** experience and gold earned from kills so far, paid out by the caller on a win */
  xpPool: number;
  goldPool: number;
  /** set by an escape spell */
  escaped: boolean;
}

export type Order =
  | { kind: 'fight'; group: number }
  | { kind: 'spell'; spellId: string; target: number }
  | { kind: 'parry' }
  | { kind: 'use'; itemId: string; target: number }
  | { kind: 'run' };

export type FizzleReason = 'no charge' | 'silenced' | 'unknown' | 'locked' | 'asleep' | 'no target';

export type CombatEvent =
  | { t: 'hit'; actor: string; group: number; dmg: number; killed: boolean }
  | { t: 'miss'; actor: string; reason?: string }
  | { t: 'monsterHit'; group: number; target: string; dmg: number; killed: boolean }
  | { t: 'monsterMiss'; group: number; target: string }
  | { t: 'monsterFlees'; group: number }
  | { t: 'monsterCalls'; group: number }
  | { t: 'monsterCasts'; group: number; spellId: string; target?: string; dmg?: number; effect?: string }
  | { t: 'parry'; actor: string }
  | { t: 'cast'; actor: string; spellId: string; target?: number; dmg?: number; killed?: number; healed?: number; effect?: string }
  | { t: 'fizzle'; actor: string; spellId: string; reason: FizzleReason }
  | { t: 'runOk' }
  | { t: 'runFail'; reason?: 'paralysed' }
  | { t: 'peace' }
  | { t: 'death'; id: string }
  | { t: 'note'; text: string };

export type Outcome = 'ongoing' | 'won' | 'wiped' | 'fled';
export type Warning = 'lowCharges' | 'redHp' | 'outnumbered' | 'monsterEnraged';

export type MonsterAction =
  | { kind: 'attack'; target: string }
  | { kind: 'cast'; spellId: string; target: string }
  | { kind: 'flee' }
  | { kind: 'callHelp' }
  | { kind: 'wait' };

export type { Party };
