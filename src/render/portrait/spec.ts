import type { Alignment, Character } from '../../core/types';
import type { PictureState } from '../monster/picture';

export const PORTRAIT_W = 128;
export const PORTRAIT_H = 160;

/** The named people of Crowhithe (filled in with the recipes in people.ts). */
export type PersonId = string;

export type PortraitSpec =
  | { kind: 'person'; id: PersonId }
  | { kind: 'adventurer'; raceId: string; classId: string; alignment: Alignment; face: number };

export type PortraitState = PictureState & { dead: boolean; speaking: boolean };

/** The face number of a character: the trailing integer of its id (0 when there is none). */
export function faceNumber(id: string): number {
  const m = /(\d+)$/.exec(id);
  return m ? Number(m[1]) : 0;
}

export function portraitForCharacter(c: Pick<Character, 'id' | 'name' | 'raceId' | 'classId' | 'alignment'>): PortraitSpec {
  return { kind: 'adventurer', raceId: c.raceId, classId: c.classId, alignment: c.alignment, face: faceNumber(c.id) };
}

export const specKey = (s: PortraitSpec): string =>
  s.kind === 'person' ? `p:${s.id}` : `a:${s.raceId}:${s.classId}:${s.alignment}:${s.face}`;
