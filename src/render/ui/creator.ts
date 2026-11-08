/** The character creator as a small state machine; the dialogues that drive it live in places/tavern.ts. */
import { RACES } from '../../core/data';
import { createCharacter, eligibleClasses, rollBonusPool } from '../../core/party';
import { createRng } from '../../core/rng';
import { ATTRS } from '../../core/types';
import type { Alignment, Attr, Character, Stats } from '../../core/types';

export type CreatorStage = 'name' | 'race' | 'alignment' | 'alloc' | 'class' | 'confirm';
const ORDER: CreatorStage[] = ['name', 'race', 'alignment', 'alloc', 'class', 'confirm'];

export interface CreatorSpec { name: string; raceId: string; alignment: Alignment; classId?: string }

const zero = (): Stats => ({ str: 0, iq: 0, pie: 0, vit: 0, agi: 0, luck: 0 });

/**
 * The face number a character made from `seed` will have: `createCharacter` takes its id number from the second draw of the
 * generator (the first sets hit points), so the preview in the creator is exactly the face the character gets.
 */
export function creatorFace(seed: number): number {
  const r = createRng(seed);
  r.next();
  return r.int(1000, 9999);
}

export class Creator {
  stage: CreatorStage = 'name';
  spec: CreatorSpec = { name: '', raceId: 'human', alignment: 'neutral' };
  alloc: Stats = zero();
  pool: number;

  constructor(public seed: number) {
    this.pool = rollBonusPool(createRng(seed));
  }

  /** Attribute scores with the allocation applied. */
  stats(): Stats {
    const race = RACES.find((r) => r.id === this.spec.raceId)!;
    const s = {} as Stats;
    for (const a of ATTRS) s[a] = race.base[a] + this.alloc[a];
    return s;
  }

  /** Bonus points not yet spent. */
  left(): number { return this.pool - ATTRS.reduce((n, a) => n + this.alloc[a], 0); }

  eligible(): string[] { return eligibleClasses(this.stats(), this.spec.alignment); }

  /** Moves a point into or out of an attribute. False when the pool, the zero floor or the cap of 18 forbids it. */
  adjust(attr: Attr, delta: 1 | -1): boolean {
    if (delta > 0) {
      if (this.left() <= 0 || this.stats()[attr] >= 18) return false;
    } else if (this.alloc[attr] <= 0) return false;
    this.alloc[attr] += delta;
    return true;
  }

  /** New bonus points (and a new face) from a new seed; the allocation starts again, the name, race and alignment stay. */
  reroll(seed: number): void {
    this.seed = seed;
    this.pool = rollBonusPool(createRng(seed));
    this.alloc = zero();
    if (this.spec.classId && !this.eligible().includes(this.spec.classId)) this.spec.classId = undefined;
  }

  next(): void {
    const at = ORDER.indexOf(this.stage);
    if (this.stage === 'name' && !this.spec.name.trim()) return;
    if (this.stage === 'alloc') {
      const open = this.eligible();
      if (open.length === 0) return;
      if (!this.spec.classId || !open.includes(this.spec.classId)) this.spec.classId = open[0];
    }
    if (this.stage === 'class' && !(this.spec.classId && this.eligible().includes(this.spec.classId))) return;
    if (at < ORDER.length - 1) this.stage = ORDER[at + 1];
  }

  /** One stage back. Going back to the race stage drops the allocation, as changing race always did. */
  back(): void {
    const at = ORDER.indexOf(this.stage);
    if (at === 0) return;
    this.stage = ORDER[at - 1];
    if (this.stage === 'race') { this.alloc = zero(); this.spec.classId = undefined; }
  }

  build(): Character {
    if (!this.spec.classId) throw new Error('no class chosen');
    return createCharacter(
      { name: this.spec.name.trim(), raceId: this.spec.raceId, classId: this.spec.classId, alignment: this.spec.alignment, pool: this.pool },
      this.alloc,
      createRng(this.seed),
    );
  }
}
