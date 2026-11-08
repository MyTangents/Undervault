/** Player settings, kept in the save. The look defaults come from the owner's slider test of the spike. */
export interface Settings {
  automap: 'on' | 'off';
  bloom: number;
  flicker: number;
  fog: number;
  lamp: number;
  quality: 'low' | 'normal';
}

/** Lower bloom and more fog than the spike's 1.05 and 0.17 worked well. Automap is on unless the player turns it off. */
export const DEFAULT_SETTINGS: Settings = {
  automap: 'on',
  bloom: 0.5,
  flicker: 1,
  fog: 0.28,
  lamp: 1.1,
  quality: 'normal',
};

/** The low quality setting turns bloom off for weaker computers. */
export const effectiveBloom = (s: Settings): number => (s.quality === 'low' ? 0 : s.bloom);
