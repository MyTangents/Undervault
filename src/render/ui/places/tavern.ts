import type { App } from '../app';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { KEEPER_OF } from '../../portrait/people';
import { leaveCommands } from './leave';

/** Placeholder until the tavern lands (Task 9b). */
export function placeScreen(app: App): PlaceScreen {
  const commands = () => leaveCommands(app);
  const lay = placeLayout(app, { id: 'tavern', title: 'The Sump Tap', blurb: '', spec: { kind: 'person', id: KEEPER_OF.tavern }, commands });
  return { el: lay.el, commands, dispose: lay.dispose };
}
