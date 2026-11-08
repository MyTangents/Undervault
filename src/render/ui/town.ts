/** Crowhithe: a menu of places, each a framed screen with a face, a message window and printed commands. */
import type { App } from './app';
import type { KeyCommand } from './keys';
import { h } from './dom';
import { PLACES } from '../../core/town';
import { placeLayout } from './places/layout';
import type { PlaceScreen } from './places/layout';
import { placeScreen as tavern } from './places/tavern';
import { placeScreen as forge } from './places/forge';
import { placeScreen as temple } from './places/temple';
import { placeScreen as inn } from './places/inn';
import { placeScreen as maud } from './places/maud';
import { placeScreen as lamp } from './places/lamp';
import { placeScreen as party } from './places/party';

const PLACES_UI: Record<string, (app: App) => PlaceScreen> = {
  tavern, smith: forge, temple, inn, informant: maud, tales: lamp, party,
};

/** What the player presses to go to each place. */
export const PLACE_KEYS: Record<string, [key: string, label: string]> = {
  tavern: ['t', 'Tavern'],
  smith: ['f', 'Forge'],
  temple: ['h', 'House of Ash'],
  inn: ['i', 'Inn'],
  informant: ['m', "Maud's"],
  tales: ['l', 'Lamp and Lung'],
  party: ['p', 'Party and packs'],
};

export function townScreen(app: App): HTMLElement {
  const make = PLACES_UI[app.townPlace];
  if (!make) return menuScreen(app);
  const ps = make(app);
  app.setCommands(ps.commands);
  app.onScreenDispose(ps.dispose);
  return ps.el;
}

function menuScreen(app: App): HTMLElement {
  const go = (id: string) => () => { app.townPlace = id; app.townMsg = ''; app.refresh(); };
  const commands = (): KeyCommand[] => [
    ...Object.entries(PLACE_KEYS).map(([id, [key, label]]): KeyCommand => ({ key, label, run: go(id) })),
    { key: 'e', label: 'Enter the Undervault', run: () => app.enterDungeon() },
    { key: 'Escape', label: 'System', run: () => void app.openSystem() },
  ];
  const lay = placeLayout(app, {
    id: 'title',
    title: 'Crowhithe',
    blurb: 'A town on top of a hole. The lamps are lit, the Wardens are bored, and everyone is selling something.',
    spec: null,
    commands,
    scene: () => [
      ...Object.entries(PLACE_KEYS).map(([id, [key]]) =>
        h('div', null, `${key.toUpperCase()}) ${PLACES.find((p) => p.id === id)?.name ?? 'The Party and its Packs'}`)),
      h('div', null, 'E) Enter the Undervault'),
      h('div', { class: 'dim' }, 'Esc) System'),
    ],
  });
  app.setCommands(commands);
  lay.msg.say(app.townMsg || 'Where to?');
  return lay.el;
}
