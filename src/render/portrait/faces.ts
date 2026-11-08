/**
 * Head-and-shoulders painters for the shared shading pipeline. A face is a grayscale relief (brighter = nearer) lit from a
 * flickering source, so every shape here is drawn as stacked heights. Coordinates: x is centred on 0, y runs 0 to 160.
 */
import type { Painter, RGB } from '../monster/picture';
import { breath, ell, glow, gray, line, makeRamp, open, poly } from '../monster/painters';
import type { PortraitSpec, PortraitState } from './spec';

type G = CanvasRenderingContext2D;

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** What a head is made of, before gear. Every field is drawn from the face number so the same id is the same face. */
export interface Look {
  rx: number; ry: number; jaw: number; earKind: 'round' | 'pointed' | 'small';
  hair: number; hairTone: number; nose: number; noseW: number; eyeGap: number; eyeSize: number;
  brow: number; mouthW: number; beard: number; scar: number; age: number; skin: number; cheek: number;
  /** -1 hard, 0 plain, 1 kind */
  mood: number;
}

export const RACE_RAMPS: Record<string, string[]> = {
  human: ['#0a0706', '#3a2418', '#a87a58', '#ffe9cf'],
  barrowfolk: ['#07080a', '#26282c', '#8a8a82', '#f0ecd8'],
  lanternkin: ['#0a0806', '#40301a', '#c09a4a', '#fff6d0'],
  thornborn: ['#050806', '#1c2a1c', '#6a8a5a', '#e8f2cc'],
  cinderkin: ['#0a0504', '#401810', '#b0502c', '#ffd8a0'],
};

const RACE_SHAPE: Record<string, Pick<Look, 'rx' | 'ry' | 'earKind'>> = {
  human: { rx: 23, ry: 30, earKind: 'round' },
  barrowfolk: { rx: 27, ry: 27, earKind: 'small' },
  lanternkin: { rx: 21, ry: 32, earKind: 'round' },
  thornborn: { rx: 22, ry: 31, earKind: 'pointed' },
  cinderkin: { rx: 24, ry: 30, earKind: 'small' },
};

export function lookFor(raceId: string, face: number, mood: number): Look {
  const r = rng(face * 2654435761 + 977);
  const shape = RACE_SHAPE[raceId] ?? RACE_SHAPE.human;
  return {
    ...shape,
    jaw: r(), hair: Math.floor(r() * 6), hairTone: 90 + r() * 80, nose: Math.floor(r() * 4), noseW: r(),
    eyeGap: r(), eyeSize: r(), brow: r(), mouthW: r(), beard: r(), scar: r(), age: r(), skin: r(), cheek: r(), mood,
  };
}

const MOOD: Record<string, number> = { good: 1, neutral: 0, evil: -1 };

/** Behind the head: hoods, cowls and coifs. */
function gearBack(g: G, classId: string): void {
  if (classId === 'spellwright') { ell(g, 0, 70, 36, 44, 96); poly(g, [[-40, 110], [-30, 64], [30, 64], [40, 110]], 96); }
  if (classId === 'votary') { ell(g, 0, 68, 34, 42, 92); poly(g, [[-44, 120], [-30, 60], [30, 60], [44, 120]], 92); }
  if (classId === 'shade') { ell(g, 0, 68, 33, 41, 70); poly(g, [[-42, 118], [-30, 62], [30, 62], [42, 118]], 70); }
  if (classId === 'blade') { ell(g, 0, 68, 30, 38, 150); }
}

/** Over the head: what the class wears. */
function gearFront(g: G, classId: string, t: number, look: Look): void {
  const top = 66 - look.ry;
  if (classId === 'blade') {
    // coif: mail rings over the crown and cheeks, a band across the brow
    g.save(); g.beginPath(); g.ellipse(0, 66, look.rx + 5, look.ry + 5, 0, 0, Math.PI * 2); g.ellipse(0, 70, look.rx - 4, look.ry - 8, 0, 0, Math.PI * 2); g.clip('evenodd');
    ell(g, 0, 66, look.rx + 6, look.ry + 6, 142);
    for (let y = top - 4; y < 100; y += 3) for (let x = -34; x < 34; x += 3) ell(g, x + (Math.floor(y / 3) % 2) * 1.5, y, 1.1, 1, 182);
    g.restore();
    line(g, -look.rx + 3, top + 12, look.rx - 3, top + 12, 2.5, 120);
  }
  if (classId === 'spellwright') {
    g.save(); g.beginPath(); g.ellipse(0, 66, look.rx + 8, look.ry + 8, 0, 0, Math.PI * 2); g.ellipse(0, 70, look.rx - 2, look.ry - 5, 0, 0, Math.PI * 2); g.clip('evenodd');
    ell(g, 0, 66, look.rx + 9, look.ry + 9, 118); g.restore();
    line(g, -look.rx + 4, top + 11, look.rx - 4, top + 11, 2, 230);
    ell(g, 0, top + 11, 2.6, 2.6, 250);
  }
  if (classId === 'votary') {
    g.save(); g.beginPath(); g.ellipse(0, 66, look.rx + 8, look.ry + 7, 0, 0, Math.PI * 2); g.ellipse(0, 71, look.rx - 3, look.ry - 6, 0, 0, Math.PI * 2); g.clip('evenodd');
    ell(g, 0, 66, look.rx + 9, look.ry + 9, 112); g.restore();
    g.strokeStyle = gray(225); g.lineWidth = 2; g.beginPath(); g.arc(0, 134, 9, 0, Math.PI * 2); g.stroke(); // the holy symbol
    line(g, 0, 124, 0, 144, 2, 225); line(g, -9, 134, 9, 134, 2, 225);
  }
  if (classId === 'cutpurse') {
    poly(g, [[-look.rx - 2, top + 14], [-look.rx + 3, top + 2], [0, top - 5], [look.rx - 3, top + 2], [look.rx + 2, top + 14], [look.rx + 12, top + 12], [-look.rx - 12, top + 12]], 128);
    line(g, -look.rx + 3, top + 4, look.rx - 3, top + 4, 1.5, 175);
    poly(g, [[-22, 104], [22, 104], [26, 120], [0, 126], [-26, 120]], 190); // the scarf
    for (let i = -2; i <= 2; i++) line(g, i * 9, 106, i * 10, 122, 1.2, 130);
  }
  if (classId === 'oathblade') {
    // crested helm with cheek guards and a nasal bar
    poly(g, [[-look.rx - 3, 66], [-look.rx - 2, top + 4], [-12, top - 8], [12, top - 8], [look.rx + 2, top + 4], [look.rx + 3, 66], [look.rx - 3, 66], [look.rx - 4, top + 14], [-look.rx + 4, top + 14], [-look.rx + 3, 66]], 205);
    const sway = Math.sin(t * 1.3);
    poly(g, [[-4, top - 10], [4, top - 10], [3, top - 22 + sway], [-3, top - 22 + sway]], 235);
    line(g, 0, top + 12, 0, 70, 3, 232);
    poly(g, [[-look.rx - 2, 62], [-look.rx + 6, 62], [-look.rx + 4, 92], [-look.rx - 1, 84]], 190);
    poly(g, [[look.rx + 2, 62], [look.rx - 6, 62], [look.rx - 4, 92], [look.rx + 1, 84]], 190);
  }
  if (classId === 'shade') {
    // a veil over the lower face, a dark hood over the brow
    poly(g, [[-look.rx - 1, 70], [look.rx + 1, 70], [look.rx - 4, 100], [0, 106], [-look.rx + 4, 100]], 92);
    for (let i = -3; i <= 3; i++) line(g, i * 6, 72, i * 5, 100, 1, 140);
    g.save(); g.beginPath(); g.ellipse(0, 66, look.rx + 8, look.ry + 8, 0, 0, Math.PI * 2); g.ellipse(0, 76, look.rx + 1, look.ry - 4, 0, 0, Math.PI * 2); g.clip('evenodd');
    ell(g, 0, 66, look.rx + 9, look.ry + 9, 66); g.restore();
  }
}

function shoulders(g: G, classId: string, br: number): void {
  g.save(); g.translate(0, br * 0.8);
  poly(g, [[-62, 162], [-60, 136], [-42, 120], [-14, 113], [14, 113], [42, 120], [60, 136], [62, 162]], 112);
  const mailed = classId === 'blade' || classId === 'oathblade';
  if (mailed) {
    for (let y = 120; y < 160; y += 4) for (let x = -52; x < 52; x += 4) ell(g, x + (Math.floor(y / 4) % 2) * 2, y, 1.3, 1.1, 160);
  } else {
    for (let i = -4; i <= 4; i++) line(g, i * 12, 124, i * 14, 160, 2, i % 2 ? 90 : 135); // cloth folds
  }
  if (classId === 'oathblade') {
    poly(g, [[-62, 150], [-60, 136], [-44, 124], [-30, 130], [-46, 146]], 190);
    poly(g, [[62, 150], [60, 136], [44, 124], [30, 130], [46, 146]], 190);
  }
  g.restore();
}

function hairOf(g: G, look: Look, covered: boolean): void {
  const top = 66 - look.ry, n = look.hairTone;
  if (covered || look.hair === 0) return;
  if (look.hair === 1) {
    ell(g, 0, top + 7, look.rx + 1.5, 11, n);
    for (let i = -4; i <= 4; i++) line(g, i * 5, top + 2, i * 5.5, top + 14, 1, n + 40);
  }
  if (look.hair === 2) {
    ell(g, 0, top + 9, look.rx + 2, 14, n);
    poly(g, [[-look.rx - 3, top + 12], [-look.rx - 8, 126], [-look.rx + 5, 120], [-look.rx + 2, 70]], n - 10);
    poly(g, [[look.rx + 3, top + 12], [look.rx + 8, 126], [look.rx - 5, 120], [look.rx - 2, 70]], n - 10);
  }
  if (look.hair === 3) {
    poly(g, [[-4, top - 8], [4, top - 8], [6, top + 12], [-6, top + 12]], n + 20);
    ell(g, -look.rx + 3, top + 18, 3, 8, n - 30);
    ell(g, look.rx - 3, top + 18, 3, 8, n - 30);
  }
  if (look.hair === 4) {
    ell(g, 0, top + 7, look.rx + 1.5, 12, n);
    poly(g, [[-look.rx - 1, top + 6], [-2, top - 2], [look.rx * 0.8, top + 18], [-look.rx + 2, top + 22]], n + 25);
    line(g, -3, top + 1, -9, top + 21, 1.5, n - 40);
  }
  if (look.hair === 5) {
    for (let i = -4; i <= 4; i++) ell(g, i * 5.2, top + 6 + Math.abs(i) * 0.9, 6.5, 6, n + (i % 2) * 25);
    for (const sd of [-1, 1]) ell(g, sd * (look.rx + 1), top + 22, 5, 9, n - 10);
  }
}

function features(g: G, look: Look, race: string, t: number, s: PortraitState): void {
  const m = look.mood;
  // the dome of the face: stacked heights so the light has something to roll over
  ell(g, 0, 66, look.rx, look.ry, 164);
  ell(g, 0, 85, look.rx * (0.62 + look.jaw * 0.32), look.ry * 0.5, 162); // chin and jaw
  if (look.jaw > 0.6 || race === 'barrowfolk') poly(g, [[-look.rx * 0.9, 74], [-look.rx * 0.62, 100], [look.rx * 0.62, 100], [look.rx * 0.9, 74]], 160);
  ell(g, 0, 65, look.rx - 3, look.ry - 3, 178);
  ell(g, 0, 64, look.rx - 8, look.ry - 8, 190);
  ell(g, 0, 63, look.rx - 14, look.ry - 14, 198);
  for (const sd of [-1, 1]) ell(g, sd * (look.rx - 8), 74, 6 + look.cheek * 3, 7, 200); // cheekbones
  for (const sd of [-1, 1]) {
    if (look.earKind === 'pointed') poly(g, [[sd * (look.rx - 1), 60], [sd * (look.rx + 11), 48], [sd * (look.rx + 2), 76]], 168);
    else ell(g, sd * (look.rx + 0.5), 68, look.earKind === 'small' ? 2.8 : 3.8, look.earKind === 'small' ? 5 : 6.5, 160);
  }
  // brows
  const browY = 54 + (race === 'barrowfolk' ? 2 : 0), thick = 2.4 + look.brow * 1.6 + (race === 'barrowfolk' ? 2.2 : 0);
  for (const sd of [-1, 1]) {
    const gap = 6.5 + look.eyeGap * 3.5;
    line(g, sd * (gap - 3), browY + (m < 0 ? 2.5 : m > 0 ? -0.5 : 0.5), sd * (gap + 8), browY + (m < 0 ? -0.5 : m > 0 ? 1.5 : 0), thick, 222);
  }
  // eyes
  const bigEyes = race === 'lanternkin' ? 1.35 : 1, lids = s.dead ? 0.08 : open(t) * (m < 0 ? 0.78 : 1);
  for (const sd of [-1, 1]) {
    const ex = sd * (7.5 + look.eyeGap * 3.5), ey = 62;
    ell(g, ex, ey, (4.8 + look.eyeSize * 1.2) * bigEyes, (3.2 + look.eyeSize * 0.8) * bigEyes * Math.max(0.12, lids) + 0.6, 84); // socket
    if (lids > 0.3) {
      ell(g, ex, ey, (3.8 + look.eyeSize * 0.8) * bigEyes, (2.2 + look.eyeSize * 0.5) * bigEyes * lids, 205);
      ell(g, ex + Math.sin(t * 0.3) * 0.6, ey, 1.5 * bigEyes, 1.7 * bigEyes * lids, 25);
    } else {
      line(g, ex - 5, ey + 0.5, ex + 5, ey + 0.5, 1.4, 40);
    }
    if (look.age > 0.55) ell(g, ex, ey + 5, 5, 1.4, 120); // bags
  }
  // nose
  const nw = 1.6 + look.noseW * 1.6;
  if (look.nose === 0) { line(g, 0, 60, 0, 73, nw, 214); ell(g, 0, 75, nw * 1.3, 2.4, 208); }
  if (look.nose === 1) { line(g, 0, 60, 0, 72, nw * 1.2, 210); ell(g, 0, 75, nw * 1.8, 2.8, 212); }
  if (look.nose === 2) { line(g, 0, 58, 0.8, 75, nw, 218); poly(g, [[-nw, 76], [nw, 76], [1, 80]], 212); }
  if (look.nose === 3) { ell(g, 0, 70, nw * 1.2, nw * 1.5, 214); ell(g, 0, 74, nw * 1.5, 2.6, 208); }
  ell(g, -nw * 0.9, 77, 0.9, 0.7, 60); ell(g, nw * 0.9, 77, 0.9, 0.7, 60);
  // mouth
  const mw = 7 + look.mouthW * 4, my = 88, corner = m * 1.6;
  const talk = s.speaking ? (0.5 + 0.5 * Math.sin(t * 17)) * (0.6 + 0.4 * Math.sin(t * 5.3)) : 0;
  ell(g, 0, my + 1.5, mw * 0.85, 2.2 + talk * 1.5, 150); // lips
  if (talk > 0.12) {
    ell(g, 0, my + 1 + talk * 2, mw * 0.62, 0.8 + talk * 3.6, 12);
  } else {
    line(g, -mw, my - corner * 0.6, 0, my + 1, 1.4, 55);
    line(g, 0, my + 1, mw, my - corner * 0.6, 1.4, 55);
  }
  // age lines and the scar
  if (look.age > 0.4) for (let i = 0; i < 3; i++) line(g, -10 + i * 0.5, 44 + i * 3, 10 - i * 0.5, 44 + i * 3, 0.9, 150);
  if (look.age > 0.7) for (const sd of [-1, 1]) line(g, sd * 8, 78, sd * 12, 86, 1, 135);
  if (look.scar > 0.62) {
    const sx = look.scar > 0.82 ? -1 : 1;
    line(g, sx * 13, 56, sx * 8, 74, 1.5, 245);
    line(g, sx * 11, 62, sx * 14, 64, 1, 60);
  }
  // beard
  if (look.beard > 0.62 || (race === 'barrowfolk' && look.beard > 0.3)) {
    poly(g, [[-look.rx * 0.8, 80], [-look.rx * 0.5, 96], [0, 106], [look.rx * 0.5, 96], [look.rx * 0.8, 80], [look.rx * 0.5, 86], [0, 90], [-look.rx * 0.5, 86]], look.hairTone + 10);
    for (let i = -3; i <= 3; i++) line(g, i * 4, 90, i * 4.4, 100, 1, look.hairTone + 60);
  }
  // race marks
  if (race === 'thornborn') {
    for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) poly(g, [[sd * (look.rx - 4 - i), 70 + i * 6], [sd * (look.rx + 5 - i), 66 + i * 7], [sd * (look.rx - 2 - i), 75 + i * 6]], 226);
    for (let i = -2; i <= 2; i++) line(g, i * 7, 40, i * 7.5, 50, 1, 140);
  }
  if (race === 'cinderkin') {
    line(g, -14, 68, -9, 78, 1.4, 20); line(g, -9, 78, -12, 86, 1.1, 20);
    line(g, 13, 52, 9, 64, 1.4, 20); line(g, 9, 64, 13, 72, 1.1, 20);
  }
  if (race === 'lanternkin') ell(g, 0, 50, 2.6, 3.4, 238);
}

/** The glowing bits: ember eyes and cracks, the lantern mark. */
function emitters(g: G, look: Look, race: string, t: number, s: PortraitState): void {
  if (s.dead) return;
  const flick = 0.75 + 0.25 * Math.sin(t * 6.1);
  if (race === 'cinderkin') {
    for (const sd of [-1, 1]) glow(g, sd * (7.5 + look.eyeGap * 3.5), 62, 4.5, '255,120,40', 0.85 * flick * open(t));
    glow(g, -11, 76, 4.5, '255,90,30', 0.5 * flick);
    glow(g, 11, 62, 4.5, '255,90,30', 0.45 * flick);
  }
  if (race === 'lanternkin') {
    glow(g, 0, 50, 10, '255,225,150', 0.8 * flick);
    for (const sd of [-1, 1]) glow(g, sd * (7.5 + look.eyeGap * 3.5), 62, 5, '255,235,170', 0.6 * open(t));
  }
  if (look.mood < 0) for (const sd of [-1, 1]) glow(g, sd * (7.5 + look.eyeGap * 3.5), 62, 3, '255,60,50', 0.35 * open(t));
}

export function adventurerPainter(spec: PortraitSpec): Painter<PortraitState> {
  const a = spec.kind === 'adventurer'
    ? spec
    : { kind: 'adventurer' as const, raceId: 'human', classId: 'blade', alignment: 'neutral' as const, face: spec.id.length * 7919 };
  const look = lookFor(a.raceId, a.face, MOOD[a.alignment] ?? 0);
  const ramp: RGB[] = makeRamp(RACE_RAMPS[a.raceId] ?? RACE_RAMPS.human, 12);
  const covered = a.classId !== 'cutpurse';
  const pose = (g: G, t: number, s: PortraitState, f: () => void) => {
    const br = s.dead ? 0 : breath(t), tilt = s.dead ? 0.05 : Math.sin(t * 0.4) * 0.025;
    g.save(); g.translate(0, 106 + br * 0.5); g.rotate(tilt); g.translate(0, -106);
    f();
    g.restore();
  };
  return {
    id: `face-${a.raceId}-${a.classId}-${a.alignment}-${a.face}`,
    ramp,
    paint(g, t, s) {
      shoulders(g, a.classId, s.dead ? 0 : breath(t));
      poly(g, [[-9, 96], [9, 96], [12, 118], [-12, 118]], 138);
      pose(g, t, s, () => {
        gearBack(g, a.classId);
        hairOf(g, look, covered);
        features(g, look, a.raceId, t, s);
        gearFront(g, a.classId, t, look);
      });
    },
    emit(g, t, s) {
      pose(g, t, s, () => emitters(g, look, a.raceId, t, s));
    },
  };
}
