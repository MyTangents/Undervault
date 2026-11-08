import type { Painter, PictureState, RGB } from './picture';

type G = CanvasRenderingContext2D;

/* ---- tiny drawing helpers: grayscale heights, centred on x = 0, ground near y = 228 ---- */
const gray = (n: number) => `rgb(${n},${n},${n})`;
const ell = (g: G, x: number, y: number, rx: number, ry: number, n: number, rot = 0) => {
  g.fillStyle = gray(n); g.beginPath(); g.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, Math.PI * 2); g.fill();
};
const poly = (g: G, pts: number[][], n: number) => {
  g.fillStyle = gray(n); g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath(); g.fill();
};
const line = (g: G, x1: number, y1: number, x2: number, y2: number, w: number, n: number) => {
  g.strokeStyle = gray(n); g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
};
const glow = (g: G, x: number, y: number, r: number, rgb: string, a: number) => {
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
};
const open = (t: number) => ((t % 5.3) < 0.14 ? 0.15 : 1); // blink, from the clock so it is repeatable
const breath = (t: number) => Math.sin(t * 1.5);

function makeRamp(stops: string[], n = 8): RGB[] {
  const cols = stops.map((h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)] as RGB);
  return Array.from({ length: n }, (_, i) => {
    const f = (i / (n - 1)) * (cols.length - 1), a = Math.floor(f), b = Math.min(cols.length - 1, a + 1), k = f - a;
    return [0, 1, 2].map((c) => Math.round(cols[a][c] + (cols[b][c] - cols[a][c]) * k)) as RGB;
  });
}

const none = () => {};

/* ---- the wraith (ported from the spike) ---- */
const wraith: Painter = {
  id: 'wraith', ramp: makeRamp(['#06040c', '#2a1840', '#76587f', '#fff1cf']),
  paint(g, t, s) {
    const br = breath(t), sway = Math.sin(t * 0.7) * 2.5, lg = s.lunge;
    g.translate(sway, 8);
    g.strokeStyle = gray(138); g.lineWidth = 4; g.beginPath(); g.moveTo(60, 62); g.lineTo(62, 228); g.stroke();
    ell(g, 60, 56, 8, 8, 216);
    g.save(); g.translate(0, 100); g.scale(1, 1 + br * 0.012); g.translate(0, -100);
    g.fillStyle = gray(140); g.beginPath(); g.moveTo(-26, 92); g.bezierCurveTo(-50, 130, -62, 190, -72, 226);
    for (let i = 0; i <= 10; i++) g.lineTo(-72 + i * 14.4, 232 + (i % 2 ? -12 : 2) + Math.sin(t * 1.3 + i) * 3);
    g.bezierCurveTo(62, 190, 50, 130, 26, 92); g.closePath(); g.fill();
    for (let i = -3; i <= 3; i++) {
      g.strokeStyle = gray(i % 2 ? 69 : 180); g.lineWidth = 3; g.beginPath(); g.moveTo(i * 8, 98);
      g.quadraticCurveTo(i * 14 + sway * 0.5, 150, i * 20 + Math.sin(t + i) * 2, 226); g.stroke();
    }
    g.restore();
    g.fillStyle = gray(124); g.beginPath(); g.moveTo(-28, 98); g.bezierCurveTo(-38, 50, -24, 16, 0, 12); g.bezierCurveTo(24, 16, 38, 50, 28, 98); g.closePath(); g.fill();
    g.strokeStyle = gray(196); g.lineWidth = 2.5; g.beginPath(); g.moveTo(-26, 92); g.bezierCurveTo(-34, 50, -22, 20, 0, 16); g.bezierCurveTo(22, 20, 34, 50, 26, 92); g.stroke();
    ell(g, 0, 62, 17, 23, 11);
    ell(g, 0, 60, 10.5, 14, 210);
    g.fillStyle = gray(182); g.fillRect(-6, 72, 12, 8);
    ell(g, -4.6, 58, 3.1, 4.2, 16); ell(g, 4.6, 58, 3.1, 4.2, 16);
    poly(g, [[0, 63], [-1.8, 68], [1.8, 68]], 32);
    for (let i = -4; i <= 4; i += 2) line(g, i, 73, i, 79, 1, 34);
    const reach = lg * 14;
    for (const sd of [-1, 1]) {
      const hx = sd * (50 + reach * 0.6), hy = 150 + br * 2 - reach;
      poly(g, [[sd * 24, 98], [sd * 62, 122 + br * 2], [hx + sd * 4, hy - 6], [sd * 34, 128]], 106);
      for (let f = 0; f < 5; f++) { const a = (-0.9 + f * 0.45) * sd; line(g, hx, hy, hx + Math.sin(a) * 13, hy + Math.cos(a) * 13 + Math.sin(t * 3 + f) * 0.8, 2, 220); }
      ell(g, hx, hy, 4, 3, 207);
    }
  },
  emit(g, t, s) {
    const sway = Math.sin(t * 0.7) * 2.5;
    g.translate(sway, 8);
    g.save(); g.translate(0, 58); g.scale(1, open(t)); g.translate(0, -58);
    glow(g, -4.6, 58, 5.5, '255,60,50', 1); glow(g, 4.6, 58, 5.5, '255,60,50', 1);
    g.restore();
    glow(g, 60, 56, 16, '170,120,255', 0.75 + 0.25 * Math.sin(t * 3.1));
    void s;
  },
};

/* ---- the singing cultist: a robed human with a raised chalice ---- */
const cultist: Painter = {
  id: 'cultist', ramp: makeRamp(['#0a0504', '#3a1410', '#9a5a40', '#ffe8c0']),
  paint(g, t, s) {
    const br = breath(t), sway = Math.sin(t * 1.1) * 2;
    g.translate(sway, 8);
    g.fillStyle = gray(130); g.beginPath(); g.moveTo(-22, 96); g.bezierCurveTo(-46, 140, -54, 190, -60, 228); g.lineTo(60, 228); g.bezierCurveTo(54, 190, 46, 140, 22, 96); g.closePath(); g.fill();
    for (let i = -3; i <= 3; i++) line(g, i * 7, 104, i * 16 + sway * 0.3, 224, 3, i % 2 ? 70 : 170);
    g.fillStyle = gray(120); g.beginPath(); g.moveTo(-24, 84); g.bezierCurveTo(-30, 40, -16, 20, 0, 18); g.bezierCurveTo(16, 20, 30, 40, 24, 84); g.closePath(); g.fill();
    ell(g, 0, 56, 13, 17, 18);
    ell(g, 0, 58, 9.5, 12.5, 172); // the face, flushed by singing
    ell(g, -4, 56, 2, 2.4, 20); ell(g, 4, 56, 2, 2.4, 20);
    ell(g, 0, 66 + (Math.sin(t * 5) > 0 ? 1 : 0), 4, 2.6 + (Math.sin(t * 5) > 0 ? 1.4 : 0), 22); // mouth open mid-verse
    const lift = 8 + s.lunge * 12 + br * 1.5;
    for (const sd of [-1, 1]) {
      poly(g, [[sd * 20, 94], [sd * 56, 70 - lift * 0.4], [sd * 60, 52 - lift], [sd * 44, 54 - lift], [sd * 30, 110]], 100);
      ell(g, sd * 52, 48 - lift, 4.5, 4, 190);
    }
    line(g, -52, 46 - lift, -52, 30 - lift, 3, 170); ell(g, -52, 28 - lift, 7, 5, 214); poly(g, [[-58, 28 - lift], [-46, 28 - lift], [-50, 36 - lift], [-54, 36 - lift]], 190);
  },
  emit(g, t) {
    g.translate(Math.sin(t * 1.1) * 2, 8);
    glow(g, -52, 22 - 8 - 1.5 * breath(t), 12, '255,170,70', 0.6 + 0.3 * Math.sin(t * 8));
  },
};

/* ---- the skeleton: bones and a rusted blade ---- */
const skeleton: Painter = {
  id: 'skeleton', ramp: makeRamp(['#070707', '#26231f', '#8a8472', '#f4eed8']),
  paint(g, t, s) {
    const br = breath(t), sw = Math.sin(t * 0.9) * 2, lg = s.lunge;
    g.translate(sw, 6);
    line(g, 0, 78, 0, 146, 6, 170);
    for (let i = 0; i < 5; i++) { const y = 86 + i * 11, w = 26 - Math.abs(i - 1.5) * 3; line(g, 0, y, -w, y + 6 + br * 0.6, 4, 196); line(g, 0, y, w, y + 6 + br * 0.6, 4, 196); }
    poly(g, [[-20, 142], [20, 142], [14, 164], [-14, 164]], 150);
    ell(g, 0, 50, 18, 21, 206);
    poly(g, [[-12, 62], [12, 62], [9, 78], [-9, 78]], 180);
    ell(g, -7, 48, 5, 6.5, 14); ell(g, 7, 48, 5, 6.5, 14); poly(g, [[0, 54], [-2.5, 61], [2.5, 61]], 30);
    for (let i = -6; i <= 6; i += 3) line(g, i, 70, i, 77, 1.5, 30);
    line(g, -24, 84, -42, 120, 5, 180); line(g, -42, 120, -36, 158, 5, 180);
    const sx = 46 + lg * 6;
    line(g, 24, 84, sx, 118, 5, 180); line(g, sx, 118, 58 + lg * 6, 98 - lg * 10, 5, 180);
    line(g, 58 + lg * 6, 100 - lg * 10, 66 + lg * 8, 24 - lg * 10, 5, 205); // the rusted blade
    line(g, 54 + lg * 6, 98 - lg * 10, 74 + lg * 6, 98 - lg * 10, 4, 170);
    line(g, -10, 164, -17, 196, 6, 175); line(g, -17, 196, -19, 228, 6, 175);
    line(g, 10, 164, 17, 196, 6, 175); line(g, 17, 196, 19, 228, 6, 175);
    ell(g, -19, 228, 9, 3, 150); ell(g, 19, 228, 9, 3, 150);
  },
  emit(g, t) {
    g.translate(Math.sin(t * 0.9) * 2, 6);
    const o = open(t);
    g.save(); g.translate(0, 48); g.scale(1, o); g.translate(0, -48);
    glow(g, -7, 48, 4.5, '180,255,190', 0.9); glow(g, 7, 48, 4.5, '180,255,190', 0.9);
    g.restore();
  },
};

/* ---- the ledger rat ---- */
const rat: Painter = {
  id: 'rat', ramp: makeRamp(['#080504', '#2a1b10', '#7a5a3a', '#e8d2a8']),
  paint(g, t, s) {
    const br = breath(t), lg = s.lunge;
    g.translate(0, 0);
    g.strokeStyle = gray(120); g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, 206); g.bezierCurveTo(-92, 200, -100 + Math.sin(t * 2) * 4, 160, -84, 150); g.stroke();
    ell(g, -4, 190, 48, 27 + br, 124);
    ell(g, -34, 196, 28, 23, 112);
    line(g, 6, 206, 10 + lg * 10, 228, 8, 130); line(g, -26, 210, -30, 228, 9, 120); line(g, 30, 204, 38 + lg * 10, 226, 7, 134);
    ell(g, 46 + lg * 6, 176, 23, 17, 146, 0.3);
    poly(g, [[60 + lg * 6, 168], [92 + lg * 6, 182], [60 + lg * 6, 192]], 156);
    ell(g, 92 + lg * 6, 182, 4, 3.4, 226);
    ell(g, 40, 156, 9, 13, 156); ell(g, 40, 157, 5, 8, 90); ell(g, 58, 158, 8, 11, 150); ell(g, 58, 159, 4, 7, 88);
    poly(g, [[66 + lg * 6, 190], [72 + lg * 6, 190], [69 + lg * 6, 200]], 240); poly(g, [[76 + lg * 6, 190], [82 + lg * 6, 189], [79 + lg * 6, 199]], 240);
    for (let i = 0; i < 3; i++) line(g, 80 + lg * 6, 180 + i * 3, 104 + lg * 6, 172 + i * 8, 1, 200);
  },
  emit(g, t, s) {
    glow(g, 54 + s.lunge * 6, 170, 5, '255,60,50', 0.95 * open(t));
  },
};

/* ---- the wick slime ---- */
const slime: Painter = {
  id: 'slime', ramp: makeRamp(['#030a06', '#10301a', '#3f9a5a', '#d8ffc8']),
  paint(g, t, s) {
    const w = 1 + Math.sin(t * 2.2) * 0.045 + s.lunge * 0.08, hgt = 1 - Math.sin(t * 2.2) * 0.04;
    g.translate(0, 228); g.scale(w, hgt); g.translate(0, -228);
    g.fillStyle = gray(112); g.beginPath(); g.moveTo(-66, 228); g.bezierCurveTo(-76, 150, -34, 106, 0, 104); g.bezierCurveTo(34, 106, 76, 150, 66, 228); g.closePath(); g.fill();
    ell(g, -24, 140, 14, 22, 224, -0.4);
    for (const [x, y, r] of [[14, 184, 9], [-30, 196, 6], [34, 160, 5], [-4, 170, 7]]) { ell(g, x, y, r, r, 168); ell(g, x - r * 0.3, y - r * 0.3, r * 0.35, r * 0.35, 235); }
    ell(g, -16, 158, 6, 8, 30); ell(g, 16, 158, 6, 8, 30);
    line(g, 0, 106, 0, 80, 3.5, 204);
  },
  emit(g, t) {
    glow(g, 0, 76, 13, '255,190,80', 0.7 + 0.3 * Math.sin(t * 11) * Math.sin(t * 7));
    glow(g, -16, 158, 4, '200,255,160', 0.8); glow(g, 16, 158, 4, '200,255,160', 0.8);
  },
};

/* ---- the drum orc ---- */
const orc: Painter = {
  id: 'orc', ramp: makeRamp(['#060804', '#1e2a12', '#6a7a3a', '#e0ecb0']),
  paint(g, t, s) {
    const br = breath(t), lg = s.lunge;
    g.translate(0, 4);
    ell(g, 0, 150, 46, 52 + br, 126);
    ell(g, -36, 112, 25, 19, 134); ell(g, 36, 112, 25, 19, 134);
    ell(g, 6, 88, 21, 23, 152);
    poly(g, [[-12, 78], [24, 78], [24, 72], [-12, 72]], 100);
    ell(g, 0, 70, 24, 7, 86); // heavy brow
    poly(g, [[-8, 100], [-12, 112], [-4, 104]], 236); poly(g, [[20, 100], [24, 112], [16, 104]], 236); // tusks
    line(g, -42, 124, -56, 172, 15, 118);
    line(g, 42, 124, 62 + lg * 8, 84 - lg * 10, 15, 122);
    poly(g, [[56 + lg * 8, 84 - lg * 10], [88 + lg * 8, 56 - lg * 10], [92 + lg * 8, 76 - lg * 10], [66 + lg * 8, 100 - lg * 10]], 200); // cleaver
    line(g, -18, 192, -24, 228, 17, 120); line(g, 18, 192, 24, 228, 17, 120);
    ell(g, -48, 184, 21, 17, 104); ell(g, -48, 184, 17, 13, 190); ell(g, -48, 184, 14, 10, 130); // the drum at his hip
  },
  emit(g, t) {
    glow(g, 0, 86, 4, '255,220,70', 0.9 * open(t)); glow(g, 14, 86, 4, '255,220,70', 0.9 * open(t));
  },
};

/* ---- the bone wolf (side on) ---- */
const wolf: Painter = {
  id: 'wolf', ramp: makeRamp(['#070809', '#22262c', '#7a8088', '#e6e8ea']),
  paint(g, t, s) {
    const br = breath(t), lg = s.lunge;
    line(g, -76, 156, 22, 138, 8, 150);
    ell(g, -22, 158, 38, 27 + br, 92);
    for (let i = 0; i < 6; i++) line(g, -50 + i * 10, 142, -46 + i * 10, 182, 3.4, 200);
    poly(g, [[-82, 150], [-60, 144], [-60, 172], [-84, 176]], 130);
    ell(g, 50 + lg * 8, 136, 23, 17, 186, 0.15);
    poly(g, [[60 + lg * 8, 134], [96 + lg * 8, 150], [64 + lg * 8, 156]], 196);
    poly(g, [[62 + lg * 8, 158], [92 + lg * 8, 172 + lg * 6], [60 + lg * 8, 168]], 170);
    for (let i = 0; i < 4; i++) line(g, 70 + lg * 8 + i * 5, 156, 71 + lg * 8 + i * 5, 163, 1.8, 242);
    poly(g, [[38, 124], [46, 104], [54, 124]], 196);
    line(g, 28, 172, 40, 202, 6, 176); line(g, 40, 202, 44, 228, 5, 176);
    line(g, 16, 176, 22, 204, 6, 150); line(g, 22, 204, 26, 228, 5, 150);
    line(g, -54, 172, -66, 204, 7, 176); line(g, -66, 204, -60, 228, 5, 176);
    line(g, -40, 176, -48, 206, 7, 150); line(g, -48, 206, -44, 228, 5, 150);
    line(g, -82, 150, -100, 128 + Math.sin(t * 3) * 3, 5, 170);
  },
  emit(g, t, s) {
    glow(g, 52 + s.lunge * 8, 132, 5, '255,70,40', 0.95 * open(t));
  },
};

/* ---- the cellar ghoul: hunched, long armed, jaw hanging ---- */
const ghoul: Painter = {
  id: 'ghoul', ramp: makeRamp(['#05090a', '#143034', '#5a8c88', '#d8f0e8']),
  paint(g, t, s) {
    const br = breath(t), sway = Math.sin(t * 0.8) * 2, lg = s.lunge;
    g.translate(sway, 6);
    ell(g, 0, 150, 32, 54 + br, 112);
    for (let i = 0; i < 5; i++) line(g, -22, 120 + i * 11, 22, 120 + i * 11, 2.6, 160);
    line(g, -26, 112, -52, 168 + lg * 14, 11, 110); line(g, -52, 168 + lg * 14, -46, 222, 9, 110);
    line(g, 26, 112, 52, 170 + lg * 14, 11, 110); line(g, 52, 170 + lg * 14, 48, 222, 9, 110);
    for (const sd of [-1, 1]) for (let f = 0; f < 3; f++) line(g, sd * 47, 222, sd * (40 + f * 6), 232, 2.6, 200);
    ell(g, 2, 88, 21, 23, 168);
    poly(g, [[-12, 96], [16, 96], [12, 124], [-8, 124]], 20); // the open jaw
    for (let i = -8; i <= 10; i += 4) poly(g, [[i, 98], [i + 2, 98], [i + 1, 106]], 238);
    ell(g, -8, 82, 5, 5.5, 22); ell(g, 12, 82, 5, 5.5, 22);
    line(g, -14, 196, -22, 228, 12, 108); line(g, 14, 196, 24, 228, 12, 108);
  },
  emit(g, t) {
    g.translate(Math.sin(t * 0.8) * 2, 6);
    glow(g, -8, 82, 5, '190,255,220', 0.9 * open(t)); glow(g, 12, 82, 5, '190,255,220', 0.9 * open(t));
  },
};

/* ---- the still gargoyle: stone wings, crouched on a plinth ---- */
const gargoyle: Painter = {
  id: 'gargoyle', ramp: makeRamp(['#060709', '#1e2430', '#6a7488', '#dfe6f2']),
  paint(g, t, s) {
    const flap = Math.sin(t * 1.2) * 4 - s.lunge * 8;
    poly(g, [[-58, 232], [58, 232], [48, 206], [-48, 206]], 86);
    line(g, -58, 232, 58, 232, 3, 150);
    for (const sd of [-1, 1]) {
      poly(g, [[sd * 28, 126], [sd * 92, 66 + flap], [sd * 84, 120], [sd * 74, 150], [sd * 56, 172]], 112);
      for (let k = 1; k <= 3; k++) line(g, sd * 28, 126, sd * (92 - k * 8), 70 + flap + k * 26, 3, 170);
    }
    ell(g, 0, 164, 36, 46, 146);
    for (const sd of [-1, 1]) { ell(g, sd * 28, 204, 18, 12, 150); for (let f = 0; f < 3; f++) line(g, sd * (20 + f * 8), 208, sd * (20 + f * 8), 216, 3, 210); }
    ell(g, 0, 100, 23, 23, 160);
    poly(g, [[-18, 84], [-30, 54 + flap * 0.3], [-8, 80]], 200); poly(g, [[18, 84], [30, 54 + flap * 0.3], [8, 80]], 200);
    ell(g, -8, 98, 5, 4, 24); ell(g, 8, 98, 5, 4, 24);
    poly(g, [[-10, 112], [10, 112], [6, 124], [-6, 124]], 24);
    poly(g, [[-6, 112], [-4, 112], [-5, 118]], 240); poly(g, [[4, 112], [6, 112], [5, 118]], 240);
  },
  emit(g, t, s) {
    const wake = 0.5 + 0.5 * Math.min(1, s.lunge + s.hit + 0.3);
    glow(g, -8, 98, 5, '255,170,60', wake * open(t)); glow(g, 8, 98, 5, '255,170,60', wake * open(t));
  },
};

/* ---- the repossessor: horned, winged, holding the contract ---- */
const repossessor: Painter = {
  id: 'demon', ramp: makeRamp(['#0a0305', '#400c12', '#a8302e', '#ffd0a0']),
  paint(g, t, s) {
    const br = breath(t), lg = s.lunge, flap = Math.sin(t * 1.0) * 5;
    for (const sd of [-1, 1]) {
      poly(g, [[sd * 20, 100], [sd * 94, 30 + flap], [sd * 90, 100], [sd * 76, 140], [sd * 50, 160]], 96);
      for (let k = 1; k <= 3; k++) line(g, sd * 20, 100, sd * (94 - k * 9), 34 + flap + k * 30, 3, 150);
    }
    poly(g, [[-30, 92], [30, 92], [40, 150], [28, 228], [-28, 228], [-40, 150]], 130);
    for (let i = -2; i <= 2; i++) line(g, i * 10, 100, i * 12, 224, 3, i % 2 ? 90 : 170);
    ell(g, 0, 130, 30, 40 + br, 138);
    ell(g, 0, 66, 21, 25, 170);
    g.strokeStyle = gray(210); g.lineWidth = 6; g.lineCap = 'round';
    for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 14, 50); g.bezierCurveTo(sd * 38, 40, sd * 40, 14, sd * 26, 4); g.stroke(); }
    ell(g, -8, 62, 5.5, 4, 20); ell(g, 8, 62, 5.5, 4, 20);
    poly(g, [[-10, 78], [10, 78], [14, 86], [0, 90], [-14, 86]], 22);
    for (let i = -10; i <= 10; i += 4) poly(g, [[i, 78], [i + 2, 78], [i + 1, 84]], 236);
    line(g, -26, 100, -50, 130, 10, 120); line(g, -50, 130, -44, 158, 9, 120); // the free hand
    line(g, 26, 100, 52 + lg * 8, 116, 10, 126); line(g, 52 + lg * 8, 116, 62 + lg * 10, 90 - lg * 6, 9, 126);
    poly(g, [[48 + lg * 10, 52 - lg * 6], [86 + lg * 10, 56 - lg * 6], [84 + lg * 10, 104 - lg * 6], [50 + lg * 10, 100 - lg * 6]], 222); // the contract
    for (let i = 0; i < 6; i++) line(g, 54 + lg * 10, 60 - lg * 6 + i * 7, 80 + lg * 10, 60 - lg * 6 + i * 7, 1.4, 120);
    line(g, -46, 148, -40, 126, 3, 214); // one finger, raised
  },
  emit(g, t) {
    glow(g, -8, 62, 5.5, '255,60,40', 1 * open(t)); glow(g, 8, 62, 5.5, '255,60,40', 1 * open(t));
    glow(g, 70, 78, 18, '255,120,60', 0.25 + 0.15 * Math.sin(t * 2));
  },
};

export const PAINTERS: Painter[] = [wraith, cultist, skeleton, rat, slime, orc, wolf, ghoul, gargoyle, repossessor];

export const PLACEHOLDER: Painter = {
  id: 'placeholder', ramp: makeRamp(['#050505', '#202020', '#6a6a6a', '#e8e8e8']),
  paint(g, t) {
    ell(g, 0, 124, 58, 76 + breath(t) * 2, 96);
    g.fillStyle = gray(230); g.font = 'bold 96px serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('?', 0, 126);
  },
  emit: none,
};

export type { PictureState };

/** Drawing helpers shared with the portrait painters. */
export { gray, ell, poly, line, glow, open, breath, makeRamp };
