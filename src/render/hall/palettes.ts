/**
 * Colour palettes per area. Structure colours (wall, edge, grid, floor) stay muted and earthy so the hall reads as an
 * ancient stone place, not a computer. Saturated colour is saved for magic (rune), fire (torch) and doors.
 */
export interface AreaPalette {
  edge: string;
  wall: string;
  floor: string;
  ceil: string;
  grid: string;
  door: string;
  rune: string;
  torch: string;
  fog: string;
  /** how much torches flicker in this area (0-1) */
  flicker: number;
}

export const PALETTES: Record<string, AreaPalette> = {
  // plain stone, the fallback
  main: { edge: '#9a9482', wall: '#1d1b18', floor: '#0e0d0b', ceil: '#080706', grid: '#4a463c', door: '#c8873a', rune: '#a46bff', torch: '#e8a24a', fog: '#060505', flicker: 0.3 },
  // verdigris: green-grey stone, cold, damp
  crypt: { edge: '#7fae9a', wall: '#16231f', floor: '#0a110f', ceil: '#060a09', grid: '#31524a', door: '#c8873a', rune: '#a46bff', torch: '#e8a24a', fog: '#050809', flicker: 0.28 },
  // rust and ember: warm rock, big spaces
  caverns: { edge: '#b08f6a', wall: '#2a1c14', floor: '#140e0a', ceil: '#0a0706', grid: '#5e4330', door: '#8fb0a0', rune: '#ff9a4a', torch: '#ffb15a', fog: '#070504', flicker: 0.42 },
  // deep violet ash: cold, quiet, wrong
  deep: { edge: '#8e86a8', wall: '#1b1727', floor: '#0c0a15', ceil: '#07050d', grid: '#3d3560', door: '#d1a24a', rune: '#c28bff', torch: '#8fd0bd', fog: '#050410', flicker: 0.58 },
};

export const paletteFor = (area: string): AreaPalette => PALETTES[area] ?? PALETTES.main;

const channels = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255,
];

export function hslSaturation(hex: string): number {
  const [r, g, b] = channels(hex);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  const l = (max + min) / 2;
  return (max - min) / (1 - Math.abs(2 * l - 1));
}

/** sRGB (0-1) to linear light, as the shader works in linear space. */
export const srgbToLinear = (c: number): number => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

export type RGB = [number, number, number];
const cache = new Map<string, RGB>();
export function hexToLinear(hex: string): RGB {
  let v = cache.get(hex);
  if (!v) { const [r, g, b] = channels(hex); v = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)]; cache.set(hex, v); }
  return v;
}
