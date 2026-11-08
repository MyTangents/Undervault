import { createRng } from '../../../core/rng';
import { tale } from '../../../core/town';
import type { App } from '../app';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { KEEPER_OF, speakerPortrait } from '../../portrait/people';
import { leaveCommands } from './leave';

/** The Lamp and Lung: H)ear a tale. The face on the wall is whoever is telling it. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  let telling = false;
  const commands = () => [
    { key: 'h', label: 'Hear a tale', enabled: !telling, run: () => void hear() },
    ...leaveCommands(app),
  ];
  const lay = placeLayout(app, {
    id: 'tales', title: 'The Lamp and Lung', blurb: "Old Tamsin Quell tells every story as if she were there, and corrects anyone who says she wasn't.",
    spec: { kind: 'person', id: KEEPER_OF.tales }, commands,
  });
  async function hear(): Promise<void> {
    const r = tale(g.state.party, createRng(Date.now() & 0xffffff));
    g.state.party = r.party;
    if (!r.tale) {
      lay.setPortrait({ kind: 'person', id: KEEPER_OF.tales });
      lay.msg.say('Tamsin has run out of stories for you. She says so, and then tells one anyway.');
      return;
    }
    lay.setPortrait(speakerPortrait(r.tale.speaker) ?? { kind: 'person', id: KEEPER_OF.tales });
    telling = true; lay.update();
    lay.setSpeaking(true);
    await lay.msg.type(r.tale.text);
    lay.setSpeaking(false);
    lay.msg.say(`  — ${r.tale.speaker}`);
    telling = false; lay.update();
  }
  lay.msg.say('"Sit. Buy a round, and I will tell you something true. Or true enough."');
  return { el: lay.el, commands, dispose: lay.dispose };
}
