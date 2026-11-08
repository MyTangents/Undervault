import { informant } from '../../../core/town';
import type { App } from '../app';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { KEEPER_OF } from '../../portrait/people';
import { leaveCommands } from './leave';

/** Maud's Pawnshop: A)sk for news. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  const commands = () => [
    {
      key: 'a', label: 'Ask for news',
      run: () => {
        app.msg?.say("Today's change:");
        for (const l of informant(g.state.party)) app.msg?.say(l);
      },
    },
    ...leaveCommands(app),
  ];
  const lay = placeLayout(app, {
    id: 'informant', title: "Maud's Pawnshop", blurb: 'Maud pays in tiny coins, each wrapped in a new rumour.',
    spec: { kind: 'person', id: KEEPER_OF.informant }, commands,
  });
  lay.msg.say('"Come in, come in. Nothing here is stolen. Much."');
  return { el: lay.el, commands, dispose: lay.dispose };
}
