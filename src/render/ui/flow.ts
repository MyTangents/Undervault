import type { Character } from '../../core/types';
import { ITEMS, SPELLS } from '../../core/data';

export type Screen = 'title' | 'town' | 'dungeon' | 'combat' | 'settings' | 'gameover' | 'ending';

export interface AppState {
  screen: Screen;
  /** the screen settings was opened over */
  under: Screen | null;
  /** the content notice has been shown to this browser */
  noticeSeen: boolean;
  /** the first click or key press has happened, so sound may start */
  audioUnlocked: boolean;
  hasGame: boolean;
}

export type AppAction =
  | { type: 'begin' }
  | { type: 'newGame' }
  | { type: 'continue'; inTown: boolean }
  | { type: 'enterDungeon' }
  | { type: 'returnToTown' }
  | { type: 'encounter' }
  | { type: 'combatEnd'; outcome: 'won' | 'fled' | 'wiped' }
  | { type: 'openSettings' }
  | { type: 'closeSettings' }
  | { type: 'ending' }
  | { type: 'toTitle' };

export const initialState = (noticeSeen: boolean): AppState => ({
  screen: 'title', under: null, noticeSeen, audioUnlocked: false, hasGame: false,
});

/** Pure screen flow: actions that make no sense on the current screen leave the state unchanged. */
export function reduce(s: AppState, a: AppAction): AppState {
  switch (a.type) {
    case 'begin': return { ...s, audioUnlocked: true, noticeSeen: true };
    case 'newGame': return { ...s, screen: 'town', under: null, hasGame: true };
    case 'continue': return { ...s, screen: a.inTown ? 'town' : 'dungeon', under: null, hasGame: true };
    case 'enterDungeon': return s.screen === 'town' && s.hasGame ? { ...s, screen: 'dungeon' } : s;
    case 'returnToTown': return s.screen === 'dungeon' ? { ...s, screen: 'town' } : s;
    case 'encounter': return s.screen === 'dungeon' ? { ...s, screen: 'combat' } : s;
    case 'combatEnd':
      return s.screen === 'combat' ? { ...s, screen: a.outcome === 'wiped' ? 'gameover' : 'dungeon' } : s;
    case 'openSettings':
      return s.screen === 'title' || s.screen === 'town' || s.screen === 'dungeon' ? { ...s, screen: 'settings', under: s.screen } : s;
    case 'closeSettings':
      return s.screen === 'settings' && s.under ? { ...s, screen: s.under, under: null } : s;
    case 'ending': return s.screen === 'dungeon' ? { ...s, screen: 'ending' } : s;
    case 'toTitle': return { ...s, screen: 'title', under: null };
  }
}

export type OrderKind = 'fight' | 'spell' | 'parry' | 'use' | 'run';

/** What a character may choose to do this round. Parrying and running are always on the list. */
export function legalOrders(c: Character): OrderKind[] {
  const out: OrderKind[] = ['parry', 'run'];
  if (c.row === 'front') out.push('fight');
  const canCast = c.known.some((id) => {
    const sp = SPELLS.find((x) => x.id === id);
    return !!sp && (c.charges[sp.level - 1] ?? 0) > 0;
  });
  if (canCast) out.push('spell');
  if (c.inventory.some((id) => ITEMS.find((i) => i.id === id)?.kind === 'consumable')) out.push('use');
  return out;
}
