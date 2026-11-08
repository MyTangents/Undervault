import { createHash } from 'node:crypto';
import { beforeAll, describe, expect, test } from 'vitest';
import { createCanvas } from '@napi-rs/canvas';
import { TALES } from '../src/core/data';
import { PLACES, recruits } from '../src/core/town';
import { emptyParty } from '../src/core/party';
import { createRng } from '../src/core/rng';
import { setCanvasFactory } from '../src/render/monster/picture';
import { PORTRAIT_H, PORTRAIT_W, getPortrait, portraitForCharacter } from '../src/render/portrait';
import type { PersonId, PortraitSpec, PortraitState } from '../src/render/portrait';
import { KEEPER_OF, PERSON_IDS, personByName, speakerPortrait } from '../src/render/portrait/people';

const calm: PortraitState = { hit: 0, lunge: 0, damage: 0, dying: 0, dead: false, speaking: false };
beforeAll(() => { setCanvasFactory((w, h) => createCanvas(w, h) as unknown as HTMLCanvasElement); });

function pixels(spec: PortraitSpec): Uint8ClampedArray {
  const c = createCanvas(PORTRAIT_W, PORTRAIT_H);
  const ctx = c.getContext('2d') as unknown as CanvasRenderingContext2D;
  getPortrait(spec).draw(ctx, 1.2, calm);
  return ctx.getImageData(0, 0, PORTRAIT_W, PORTRAIT_H).data;
}
const sha = (d: Uint8ClampedArray) => createHash('sha1').update(Buffer.from(d)).digest('hex');
const colours = (d: Uint8ClampedArray) => {
  const set = new Set<number>();
  for (let i = 0; i < d.length; i += 4) set.add((d[i] << 16) | (d[i + 1] << 8) | d[i + 2]);
  return set.size;
};
const person = (id: PersonId): PortraitSpec => ({ kind: 'person', id });

describe('the people of Crowhithe', () => {
  test('all 18 people draw, are not blank, and their pictures are pairwise different', () => {
    expect(PERSON_IDS.length).toBe(18);
    const seen = new Map<string, string>();
    for (const id of PERSON_IDS) {
      const d = pixels(person(id));
      expect(colours(d), id).toBeGreaterThanOrEqual(8);
      const h = sha(d);
      expect(seen.has(h), `${id} equals ${seen.get(h)}`).toBe(false);
      seen.set(h, id);
    }
  });

  test("personByName covers the owner's cases", () => {
    expect(personByName('Dennis Brannoch')).toBe('dennis');
    expect(personByName('Brannoch the Bold')).toBe('dennis');
    expect(personByName('Joss the Sweeper')).toBe('joss');
    expect(personByName('Joss Marrow')).toBe('jossm');
    expect(personByName('Pell')).toBeNull();
    expect(personByName('Nobody Known')).toBeNull();
  });

  test('every speaker in TALES resolves to a person', () => {
    for (const t of TALES) {
      expect(personByName(t.speaker), t.speaker).not.toBeNull();
      expect(speakerPortrait(t.speaker)).toEqual({ kind: 'person', id: personByName(t.speaker) });
    }
    expect(speakerPortrait('A Stranger')).toBeNull();
  });

  test('every name recruits() can produce resolves', () => {
    const names = new Set<string>();
    for (let seed = 1; seed <= 60; seed++) for (const c of recruits(seed, createRng(seed), emptyParty())) names.add(c.name);
    expect(names.size).toBeGreaterThanOrEqual(8);
    for (const n of names) expect(personByName(n), n).not.toBeNull();
  });

  test('KEEPER_OF has an entry for each place id in PLACES', () => {
    for (const p of PLACES) expect(KEEPER_OF[p.id as keyof typeof KEEPER_OF], p.id).toBeDefined();
    expect(KEEPER_OF).toEqual({ tavern: 'dennis', smith: 'hobb', temple: 'ottoline', inn: 'wenna', informant: 'maud', tales: 'tamsin' });
  });

  test('a character named Hedda Vole gets the hedda recipe whatever its race; a created character named Pell gets an adventurer face; two different Joss people get different faces', () => {
    const hedda = { id: 'hedda-vole-1111', name: 'Hedda Vole', raceId: 'cinderkin', classId: 'shade', alignment: 'evil' as const };
    expect(portraitForCharacter(hedda)).toEqual({ kind: 'person', id: 'hedda' });
    const pell = portraitForCharacter({ id: 'pell-4321', name: 'Pell', raceId: 'human', classId: 'blade', alignment: 'good' });
    expect(pell.kind).toBe('adventurer');
    expect(sha(pixels(person('joss')))).not.toBe(sha(pixels(person('jossm'))));
  });

  test('a name no recipe knows still gets a stable adventurer face', () => {
    const c = { id: 'odd', name: 'Mx Unlisted', raceId: 'human', classId: 'blade', alignment: 'neutral' as const };
    const spec = portraitForCharacter(c);
    expect(spec.kind).toBe('adventurer');
    expect(sha(pixels(spec))).toBe(sha(pixels(portraitForCharacter(c))));
  });
});
