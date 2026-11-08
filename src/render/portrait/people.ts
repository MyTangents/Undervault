/**
 * The people of Crowhithe: one recipe each, drawn by the same face painter as the adventurers but with a fixed look,
 * their own colours, an outfit and a signature prop. Recipes are keyed by name; a character who carries one of these names
 * (a recruit, say) is drawn from the recipe, whatever race and class the rules gave them.
 */
import { breath, ell, glow, gray, line, poly } from '../monster/painters';
import type { Look } from './faces';
import type { PersonId, PortraitSpec, PortraitState } from './spec';

type G = CanvasRenderingContext2D;

export const PERSON_IDS: readonly PersonId[] = [
  'dennis', 'hobb', 'ottoline', 'wenna', 'maud', 'tamsin', 'moss', 'merrow', 'pim', 'joss', 'gudrun',
  'perrin', 'thessaly', 'kesk', 'jossm', 'hedda', 'aldous', 'wick',
];

export interface PersonRecipe {
  id: PersonId;
  /** shapes the head and picks nothing else from the race table */
  race: string;
  ramp: string[];
  mood: number;
  look: Partial<Look>;
  /** class gear borrowed from the adventurer painter (hood, coif, helm...), if any */
  gear?: string;
  /** extras drawn in order: outfit pieces, then props */
  extras: string[];
}

const AMBER = ['#0a0604', '#3c2410', '#b07a3a', '#ffe6b0'];
const EMBER = ['#0a0504', '#3c1a10', '#c4622c', '#ffd8a0'];
const ASH = ['#06080c', '#202833', '#7d93a8', '#e6eef5'];
const CANDLE = ['#0a0804', '#403014', '#c9a24a', '#fff2c0'];
const VERDIGRIS = ['#050a09', '#16302b', '#4a9a86', '#d8f5ea'];
const DUSK = ['#08060c', '#2a2040', '#8a76c0', '#f0e8ff'];
const DUST = ['#080808', '#2a2824', '#8c8470', '#ece4cc'];
const SKIN = ['#0a0706', '#3a2418', '#a87a58', '#ffe9cf'];
const BONE = ['#07080a', '#26282c', '#8a8a82', '#f0ecd8'];
const BARK = ['#050806', '#1c2a1c', '#6a8a5a', '#e8f2cc'];
const CINDER = ['#0a0504', '#401810', '#b0502c', '#ffd8a0'];
const LANTERN = ['#0a0806', '#40301a', '#c09a4a', '#fff6d0'];

export const PEOPLE: Record<PersonId, PersonRecipe> = {
  dennis: { id: 'dennis', race: 'human', ramp: AMBER, mood: 1, extras: ['towel', 'tankard'],
    look: { hair: 1, hairTone: 150, age: 0.9, beard: 0.7, scar: 0.9, brow: 0.8, jaw: 0.8, mouthW: 1, nose: 1, noseW: 0.9, eyeGap: 0.4 } },
  hobb: { id: 'hobb', race: 'barrowfolk', ramp: EMBER, mood: 0, extras: ['apron', 'forgeglow'],
    look: { hair: 0, beard: 0.95, age: 0.5, brow: 1, jaw: 1, nose: 1, noseW: 0.8, eyeGap: 0.2, scar: 0.7 } },
  ottoline: { id: 'ottoline', race: 'human', ramp: ASH, mood: 1, gear: 'votary', extras: ['smudge'],
    look: { hair: 0, beard: 0, age: 0.6, brow: 0.2, jaw: 0.3, nose: 0, noseW: 0.2, eyeGap: 0.6, scar: 0, mouthW: 0.4 } },
  wenna: { id: 'wenna', race: 'human', ramp: CANDLE, mood: 1, extras: ['shawl', 'candle'],
    look: { hair: 2, hairTone: 120, beard: 0, age: 0.5, brow: 0.3, jaw: 0.2, nose: 3, noseW: 0.4, eyeGap: 0.5, scar: 0, mouthW: 0.6 } },
  maud: { id: 'maud', race: 'human', ramp: VERDIGRIS, mood: 0, extras: ['spectacles', 'scale'],
    look: { hair: 4, hairTone: 160, beard: 0, age: 0.8, brow: 0.5, jaw: 0.1, nose: 2, noseW: 0.3, eyeGap: 0.3, scar: 0, mouthW: 0.1 } },
  tamsin: { id: 'tamsin', race: 'human', ramp: DUSK, mood: 1, extras: ['shawl', 'lamp'],
    look: { hair: 2, hairTone: 200, beard: 0, age: 1, brow: 0.1, jaw: 0.1, nose: 2, noseW: 0.2, eyeGap: 0.7, scar: 0, mouthW: 0.5 } },
  moss: { id: 'moss', race: 'human', ramp: DUST, mood: 0, extras: ['milcap', 'moustache', 'ledger'],
    look: { hair: 0, beard: 0, age: 0.7, brow: 0.7, jaw: 0.9, nose: 0, noseW: 0.6, eyeGap: 0.3, scar: 0, mouthW: 0.3 } },
  merrow: { id: 'merrow', race: 'lanternkin', ramp: LANTERN, mood: 0, gear: 'shade', extras: [],
    look: { hair: 0, beard: 0, age: 0.3, brow: 0.2, jaw: 0.4, nose: 3, noseW: 0.3, eyeGap: 0.9, eyeSize: 1, scar: 0, mouthW: 0.2 } },
  pim: { id: 'pim', race: 'human', ramp: AMBER, mood: 1, extras: ['freckles', 'bibapron'],
    look: { hair: 5, hairTone: 130, beard: 0, age: 0, brow: 0.1, jaw: 0.5, nose: 3, noseW: 0.5, eyeGap: 0.8, eyeSize: 0.9, scar: 0, mouthW: 1, cheek: 0.9 } },
  joss: { id: 'joss', race: 'human', ramp: BONE, mood: -0.4, extras: ['shawl', 'broom'],
    look: { hair: 0, beard: 0.1, age: 1, brow: 0.4, jaw: 0.2, nose: 1, noseW: 0.7, eyeGap: 0.5, scar: 0, mouthW: 0.2 } },
  gudrun: { id: 'gudrun', race: 'barrowfolk', ramp: BONE, mood: 0, gear: 'blade', extras: ['sixfingers'],
    look: { beard: 0, age: 0.4, brow: 0.9, jaw: 1, nose: 1, noseW: 0.6, eyeGap: 0.4, scar: 0.7, mouthW: 0.7 } },
  perrin: { id: 'perrin', race: 'thornborn', ramp: BARK, mood: 1, gear: 'votary', extras: [],
    look: { hair: 0, beard: 0, age: 0.3, brow: 0.2, jaw: 0.3, nose: 0, noseW: 0.3, eyeGap: 0.6, scar: 0, mouthW: 0.5 } },
  thessaly: { id: 'thessaly', race: 'thornborn', ramp: BARK, mood: 0, gear: 'spellwright', extras: [],
    look: { hair: 0, beard: 0, age: 0.5, brow: 0.5, jaw: 0.1, nose: 2, noseW: 0.2, eyeGap: 0.3, scar: 0, mouthW: 0.2 } },
  kesk: { id: 'kesk', race: 'cinderkin', ramp: CINDER, mood: -1, gear: 'blade', extras: ['brand'],
    look: { hair: 0, beard: 0, age: 0.6, brow: 1, jaw: 0.9, nose: 1, noseW: 0.5, eyeGap: 0.2, scar: 0.9, mouthW: 0.4 } },
  jossm: { id: 'jossm', race: 'lanternkin', ramp: LANTERN, mood: -1, gear: 'cutpurse', extras: ['glint'],
    look: { hair: 0, beard: 0, age: 0.2, brow: 0.6, jaw: 0.6, nose: 2, noseW: 0.3, eyeGap: 0.7, scar: 0.7, mouthW: 0.6 } },
  hedda: { id: 'hedda', race: 'human', ramp: SKIN, mood: 1, extras: ['gorget'],
    look: { hair: 1, hairTone: 100, beard: 0, age: 0.3, brow: 0.8, jaw: 1, nose: 0, noseW: 0.6, eyeGap: 0.4, scar: 0.7, mouthW: 0.5 } },
  aldous: { id: 'aldous', race: 'lanternkin', ramp: LANTERN, mood: 1, gear: 'votary', extras: ['spectacles'],
    look: { hair: 0, beard: 0.4, age: 1, brow: 0.1, jaw: 0.2, nose: 3, noseW: 0.6, eyeGap: 0.5, eyeSize: 0.8, scar: 0, mouthW: 0.5 } },
  wick: { id: 'wick', race: 'human', ramp: SKIN, mood: -1, extras: ['sleekhair', 'goatee', 'flame'],
    look: { hair: 0, beard: 0, age: 0.5, brow: 0.9, jaw: 0.2, nose: 2, noseW: 0.1, eyeGap: 0.2, eyeSize: 0.2, scar: 0, mouthW: 0.1 } },
};

// ---- names -------------------------------------------------------------------------------------------------------------

const NAMES: Record<string, PersonId> = {
  'dennis brannoch': 'dennis', 'brannoch the bold': 'dennis', 'dennis': 'dennis',
  'hobb ferrule': 'hobb',
  'sister ottoline': 'ottoline',
  'wenna ashby': 'wenna',
  'maud the lender': 'maud', 'maud': 'maud',
  'old tamsin quell': 'tamsin', 'tamsin quell': 'tamsin',
  'corporal moss': 'moss',
  'merrow dunn': 'merrow',
  'pim the tavern boy': 'pim',
  'joss the sweeper': 'joss',
  'gudrun sixfingers': 'gudrun',
  'perrin lowe': 'perrin',
  'thessaly vane': 'thessaly',
  'brother kesk': 'kesk',
  'joss marrow': 'jossm',
  'hedda vole': 'hedda',
  'aldous pike': 'aldous',
  'wick tanner': 'wick',
};

/** The person a name belongs to ("Brannoch the Bold" and "Dennis Brannoch" are the same), or null for anyone else. */
export function personByName(name: string): PersonId | null {
  return NAMES[name.trim().toLowerCase()] ?? null;
}

/** Whose face is on the wall at each place in town. */
export const KEEPER_OF: Record<'tavern' | 'smith' | 'temple' | 'inn' | 'informant' | 'tales', PersonId> = {
  tavern: 'dennis', smith: 'hobb', temple: 'ottoline', inn: 'wenna', informant: 'maud', tales: 'tamsin',
};

/** The picture for a tale's speaker, or null when the speaker is nobody the game draws. */
export function speakerPortrait(speaker: string): PortraitSpec | null {
  const id = personByName(speaker);
  return id ? { kind: 'person', id } : null;
}

// ---- extras: outfits and props -----------------------------------------------------------------------------------------

const EYE_X = (look: Look) => 7.5 + look.eyeGap * 3.5;

/** Things drawn on the head, in the head's (tilted) space, after the features: marks, spectacles, moustaches. */
export function drawHeadExtras(g: G, extras: string[], look: Look, t: number): void {
  for (const e of extras) {
    if (e === 'smudge') {
      line(g, -12, 47, -5, 51, 2.2, 40); line(g, 6, 44, 13, 49, 1.6, 50); line(g, -16, 72, -11, 78, 1.8, 45); line(g, 9, 82, 14, 80, 1.4, 50);
    }
    if (e === 'spectacles') {
      g.strokeStyle = gray(238); g.lineWidth = 1.3;
      for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(sd * EYE_X(look), 62, 6.4, 5.4, 0, 0, Math.PI * 2); g.stroke(); line(g, sd * (EYE_X(look) + 6), 61, sd * (look.rx + 1), 60, 1, 220); }
      line(g, -EYE_X(look) + 6.4, 61, EYE_X(look) - 6.4, 61, 1.2, 238);
    }
    if (e === 'moustache') poly(g, [[-9, 80], [-2, 78], [0, 80], [2, 78], [9, 80], [6, 84], [0, 82], [-6, 84]], 112);
    if (e === 'goatee') poly(g, [[-3, 92], [3, 92], [2, 104 + Math.sin(t) * 0.4], [-2, 104]], 70);
    if (e === 'sleekhair') { ell(g, 0, 40, look.rx + 0.5, 9, 56); for (let i = -4; i <= 4; i++) line(g, i * 5, 33, i * 5.6, 47, 1, 84); }
    if (e === 'freckles') for (let i = 0; i < 9; i++) { const sd = i % 2 ? 1 : -1; ell(g, sd * (7 + (i * 7) % 8), 70 + ((i * 5) % 7), 0.8, 0.8, 116); }
    if (e === 'milcap') {
      poly(g, [[-look.rx - 1, 46], [-look.rx + 1, 34], [-12, 30], [12, 30], [look.rx - 1, 34], [look.rx + 1, 46], [look.rx + 8, 48], [-look.rx - 8, 48]], 132);
      line(g, -look.rx, 41, look.rx, 41, 1.6, 170); ell(g, 0, 38, 3, 3, 245);
    }
    if (e === 'brand') { line(g, -5, 38, 5, 46, 1.8, 30); line(g, 5, 38, -5, 46, 1.8, 30); }
    if (e === 'glint') { line(g, 14, 72, 16, 78, 1, 250); }
  }
}

/** Things drawn on the body after the head: aprons, shawls, props held up. */
export function drawBodyExtras(g: G, extras: string[], t: number, s: PortraitState): void {
  const br = s.dead ? 0 : breath(t);
  for (const e of extras) {
    if (e === 'towel') {
      poly(g, [[-42, 122], [-20, 116], [-14, 152], [-36, 154]], 205);
      for (let i = 0; i < 4; i++) line(g, -38 + i * 6, 128 + i * 0.5, -24 + i * 6, 124, 1.1, 135);
    }
    if (e === 'tankard') {
      poly(g, [[28, 130], [44, 130], [43, 156], [29, 156]], 200); g.strokeStyle = gray(200); g.lineWidth = 2.4; g.beginPath(); g.arc(46, 140, 5, -1.4, 1.4); g.stroke();
      ell(g, 36, 130, 8, 2.2, 245);
    }
    if (e === 'apron') {
      poly(g, [[-24, 128], [24, 128], [30, 162], [-30, 162]], 62);
      line(g, -22, 120, -10, 130, 3, 150); line(g, 22, 120, 10, 130, 3, 150);
      line(g, -24, 148, 24, 148, 1.5, 150);
    }
    if (e === 'bibapron') { poly(g, [[-16, 126], [16, 126], [22, 162], [-22, 162]], 150); line(g, -14, 120, -8, 128, 2, 215); line(g, 14, 120, 8, 128, 2, 215); }
    if (e === 'shawl') {
      poly(g, [[-52, 140], [-34, 118], [-8, 126], [-2, 162], [-56, 162]], 150);
      poly(g, [[52, 140], [34, 118], [8, 126], [2, 162], [56, 162]], 130);
      for (let i = 0; i < 4; i++) line(g, -46 + i * 8, 142, -42 + i * 8, 160, 1, 195);
    }
    if (e === 'gorget') { poly(g, [[-22, 112], [22, 112], [30, 126], [-30, 126]], 200); line(g, -22, 118, 22, 118, 1.2, 240); }
    if (e === 'candle') {
      const fy = 108 + Math.sin(t * 9) * 0.8;
      poly(g, [[43, 128], [49, 128], [49, 152], [43, 152]], 212);
      poly(g, [[46, fy], [43.6, 122], [48.4, 122]], 252); ell(g, 46, 124, 2.6, 4.6, 255);
    }
    if (e === 'lamp') {
      const rise = br * 1.2;
      line(g, -44, 142, -44, 112 + rise, 3, 150);
      poly(g, [[-52, 112 + rise], [-36, 112 + rise], [-38, 96 + rise], [-50, 96 + rise]], 185);
      ell(g, -44, 104 + rise, 5.2, 7, 250);
      poly(g, [[-52, 96 + rise], [-36, 96 + rise], [-44, 88 + rise]], 205);
    }
    if (e === 'scale') {
      line(g, 46, 98, 46, 158, 3, 190); line(g, 28, 106, 64, 100, 2, 215);
      ell(g, 28, 118, 9, 2.4, 195); ell(g, 64, 112, 9, 2.4, 195); line(g, 28, 106, 28, 118, 1, 160); line(g, 64, 100, 64, 112, 1, 160);
      ell(g, 28, 114, 3, 3, 250);
    }
    if (e === 'ledger') {
      poly(g, [[-34, 134], [34, 134], [38, 162], [-38, 162]], 130);
      line(g, -30, 138, 30, 138, 1.3, 215);
      for (let i = 0; i < 4; i++) line(g, -26, 144 + i * 4.5, 24 - (i % 2) * 6, 144 + i * 4.5, 1, 175);
    }
    if (e === 'broom') {
      line(g, 54, 74, 44, 150, 3, 160);
      poly(g, [[36, 146], [52, 146], [60, 162], [32, 162]], 124);
      for (let i = 0; i < 5; i++) line(g, 38 + i * 4, 150, 34 + i * 6, 162, 0.9, 190);
    }
    if (e === 'sixfingers') {
      ell(g, 46, 144, 9, 8, 192);
      for (let f = 0; f < 6; f++) { const a = -1.15 + f * 0.46; line(g, 46 + f * 2.2 - 5.5, 140, 46 + f * 2.2 - 5.5 + Math.sin(a) * 7, 140 - Math.cos(a) * 13, 2.2, 222); }
    }
    if (e === 'flame') {
      ell(g, 46, 140, 8, 6, 190);
      const f = 0.8 + 0.2 * Math.sin(t * 11);
      poly(g, [[46, 118 - f * 4], [40, 134], [52, 134]], 245);
    }
  }
}

/** Glow drawn into the colour layer, in body space. */
export function emitBodyExtras(g: G, extras: string[], t: number, s: PortraitState): void {
  if (s.dead) return;
  const flick = 0.78 + 0.22 * Math.sin(t * 7.3) * Math.sin(t * 3.1 + 1);
  const br = breath(t);
  for (const e of extras) {
    if (e === 'candle') glow(g, 46, 118 + Math.sin(t * 9) * 0.6, 18, '255,200,110', 0.7 * flick);
    if (e === 'lamp') glow(g, -44, 104 + br * 1.2, 22, '255,214,130', 0.7 * flick);
    if (e === 'forgeglow') glow(g, -46, 108, 30, '255,120,40', 0.5 * flick);
    if (e === 'flame') glow(g, 46, 126, 18, '255,150,50', 0.7 * flick);
    if (e === 'tankard') glow(g, 36, 130, 10, '255,200,110', 0.3);
  }
}
