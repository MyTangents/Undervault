/** The two last screens: the Roll of the Gone (everyone is dead) and the ending of the demo. */
import { renderChronicle } from '../../core/chronicle';
import { DISCOVERIES } from '../../core/data';
import type { App } from './app';
import { h } from './dom';
import { accentFor, commandBar, frame, messageWindow } from './frame';
import type { KeyCommand } from './keys';
import { PortraitView } from './portraitView';

/** Corporal Moss reads the names. Any other key does nothing; the three commands are printed. */
export function rollScreen(app: App): HTMLElement {
  const lines = app.game ? renderChronicle(app.game.state.chronicle, 6) : [];
  const view = new PortraitView();
  view.setSpec({ kind: 'person', id: 'moss' });
  view.start();
  app.onScreenDispose(() => view.stop());
  const cmds: KeyCommand[] = [
    { key: 'b', label: 'Begin again', run: () => app.newGame() },
    { key: 'l', label: 'Load from file', run: () => void app.loadFromFile() },
    { key: 't', label: 'Title', run: () => app.dispatch({ type: 'toTitle' }) },
  ];
  app.setCommands(() => cmds);
  const words = messageWindow(12);
  app.msg = words;
  view.setSpeaking(true);
  void words.type('Corporal Moss reads the names at dawn, one more than yesterday. Yours are in the book now.').then(() => {
    view.setSpeaking(false);
    for (const l of lines) words.say(l);
  });
  return h('div', { class: 'screen endx' },
    frame('The Roll of the Gone', accentFor('temple'),
      h('div', { class: 'face' }, view.el), words.el, commandBar(cmds)));
}

/** The end of the demo: what the party found, the chronicle, and three commands. */
export function endingScreen(app: App): HTMLElement {
  const found = app.game ? DISCOVERIES.filter((d) => app.game!.state.party.discoveries.includes(d.id)).length : 0;
  const lines = app.game ? renderChronicle(app.game.state.chronicle, 8) : [];
  const cmds: KeyCommand[] = [
    { key: 'b', label: 'Back to Crowhithe', run: () => app.backToTown() },
    { key: 's', label: 'Save to file', run: () => app.saveToFile() },
    { key: 't', label: 'Title', run: () => app.dispatch({ type: 'toTitle' }) },
  ];
  app.setCommands(() => cmds);
  return h('div', { class: 'screen endx' },
    frame('Settled, for now', accentFor('inn'),
      h('p', null, 'The Quiet Below asks whether you have come about the account. You say yes, and mean it. A receipt, warm as a hand, is pressed into yours. The walls go quiet. Somewhere far above, a clerk puts down his pen.'),
      h('p', { class: 'dim' }, `This is the end of the demo. You found ${found} of ${DISCOVERIES.length} things the Vault was keeping.`),
      h('h3', null, 'The chronicle'),
      ...lines.map((l) => h('div', { class: 'tale' }, l)),
      commandBar(cmds)));
}
