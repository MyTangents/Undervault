import { createRng } from '../../../core/rng';
import { raise } from '../../../core/town';
import type { App } from '../app';
import { confirmBox, openList } from '../dialog';
import { accentFor } from '../frame';
import { renormalise } from '../reorder';
import { placeLayout } from './layout';
import type { PlaceScreen } from './layout';
import { KEEPER_OF } from '../../portrait/people';
import { leaveCommands } from './leave';

const costOf = (level: number, ash: boolean) => Math.max(100, level * 100) * (ash ? 3 : 1);

/** The House of Ash: R)aise the fallen. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  const fallen = () => g.state.party.members.filter((m) => m.dead || m.ash);
  const commands = () => [{ key: 'r', label: 'Raise', run: () => void raiseOne() }, ...leaveCommands(app)];
  const lay = placeLayout(app, {
    id: 'temple', title: 'The House of Ash',
    blurb: 'The Sisters believe a body is a loan and ash is the receipt. They are kind, tired, and bad at bookkeeping.',
    spec: { kind: 'person', id: KEEPER_OF.temple }, commands,
  });

  async function raiseOne(): Promise<void> {
    const list = fallen();
    if (list.length === 0) {
      lay.msg.say('Sister Ottoline weighs an urn that is not yours. "Light," she says, and does not explain.');
      return;
    }
    const gold = g.state.party.gold;
    const i = await openList(app.host, {
      title: `The fallen (you have ${gold} gold)`, accent: accentFor('temple'),
      rows: list.map((m) => ({
        label: `${m.name} — ${m.ash ? 'ash. Only the costly rite can try.' : 'dead. The ordinary rite will try.'}`,
        detail: `${costOf(m.level, m.ash)}g`,
        disabled: gold < costOf(m.level, m.ash),
      })),
    });
    if (i === null) return;
    const m = list[i];
    const cost = costOf(m.level, m.ash);
    if (m.ash && !(await confirmBox(app.host, `${m.name} is ash. The ash rite costs ${cost} gold, and if it fails they are gone for good. Go on?`, accentFor('temple')))) return;
    try {
      const after = raise(g.state.party, m.id, createRng(Date.now() & 0xffffff), m.ash ? 2 : 1);
      g.state.party = renormalise(after);
      const now = after.members.find((x) => x.id === m.id);
      if (!now) lay.msg.say(`${m.name} is gone for good. Sister Ottoline wept, and was told not to.`);
      else if (now.ash) lay.msg.say(`The rite failed, and ${m.name} came back as ash. It is the receipt.`);
      else if (now.dead) lay.msg.say(`The rite failed. ${m.name} stays dead, and you are ${cost} gold lighter.`);
      else lay.msg.say(`${m.name} breathes. The ash was warm. They say it counts.`);
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
    lay.update();
  }
  lay.msg.say(fallen().length ? 'The Sisters look up. "Who is it this time?"' : '"Nobody on the slab today," says Sister Ottoline. "Keep it that way."');
  return { el: lay.el, commands, dispose: lay.dispose };
}
