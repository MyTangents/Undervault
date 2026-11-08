import type { App } from '../app';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { KEEPER_OF } from '../../portrait/people';
import { leaveCommands } from './leave';

/** Placeholder until the forge lands (Task 9c). */
export function placeScreen(app: App): PlaceScreen {
  const commands = () => leaveCommands(app);
  const lay = placeLayout(app, { id: 'smith', title: "Ferrule's Forge", blurb: '', spec: { kind: 'person', id: KEEPER_OF.smith }, commands });
  return { el: lay.el, commands, dispose: lay.dispose };
}
