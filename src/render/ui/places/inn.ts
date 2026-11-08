import type { App } from '../app';
import { openList } from '../dialog';
import { accentFor } from '../frame';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { KEEPER_OF } from '../../portrait/people';
import { leaveCommands } from './leave';

const ROOMS: [name: string, desc: string, cost: number][] = [
  ['The stable', 'Free. Heals nothing. Levelling still happens in your sleep.', 0],
  ['A cot', 'Half the wounds, no rest for spells.', 10],
  ['A proper room', 'Everything mended, every spell restored.', 30],
  ['The suite', 'As above, and the curses sleep it off.', 80],
];

/** The Last Mattress: R)est. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  const commands = () => [{ key: 'r', label: 'Rest', run: () => void rest() }, ...leaveCommands(app)];
  const lay = placeLayout(app, {
    id: 'inn', title: 'The Last Mattress', blurb: "Wenna Ashby remembers every guest's last words, if they were rude enough.",
    spec: { kind: 'person', id: KEEPER_OF.inn }, commands,
  });
  async function rest(): Promise<void> {
    const gold = g.state.party.gold;
    const i = await openList(app.host, {
      title: `Rooms (you have ${gold} gold)`, accent: accentFor('inn'),
      rows: ROOMS.map(([name, desc, cost]) => ({ label: `${name} — ${desc}`, detail: `${cost}g`, disabled: gold < cost })),
    });
    if (i === null) return;
    try {
      const r = g.restAtInn(i);
      app.autosave();
      lay.msg.say(r.leveled.length ? `${r.leveled.join(', ')} grew stronger in the night.` : 'You slept. Nobody died.');
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
    lay.update();
  }
  lay.msg.say('Anyone with enough experience levels up when they sleep.');
  return { el: lay.el, commands, dispose: lay.dispose };
}
