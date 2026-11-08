import type { App } from '../app';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { leaveCommands } from './leave';

/** Placeholder until the party screen lands (Task 9c). */
export function placeScreen(app: App): PlaceScreen {
  const commands = () => leaveCommands(app);
  const lay = placeLayout(app, { id: 'party', title: 'The Party and its Packs', blurb: '', spec: null, commands });
  return { el: lay.el, commands, dispose: lay.dispose };
}
