import { ITEMS } from '../../../core/data';
import { buy, displayName, identifyItem, sell, visibleStock } from '../../../core/items';
import { SHOP } from '../../../core/town';
import type { App } from '../app';
import { openList } from '../dialog';
import { h } from '../dom';
import { accentFor } from '../frame';
import { placeLayout } from './layout';
import type { PlaceLayout, PlaceScreen } from './layout';
import { memberPicker } from './pick';
import { KEEPER_OF } from '../../portrait/people';
import { leaveCommands } from './leave';

const itemDef = (id: string) => ITEMS.find((i) => i.id === id)!;

/** Ferrule's Forge: pick who, then B)uy, S)ell, I)dentify. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  const accent = accentFor('smith');
  let lay: PlaceLayout;
  const pick = memberPicker(app, () => lay.update());
  const commands = () => [
    { key: 'b', label: 'Buy', run: () => void buyOne() },
    { key: 's', label: 'Sell', run: () => void sellOne() },
    { key: 'i', label: 'Identify', run: () => void identify() },
    ...pick.commands(),
    ...leaveCommands(app),
  ];
  lay = placeLayout(app, {
    id: 'smith', title: "Ferrule's Forge",
    blurb: 'Hobb Ferrule names every blade and refuses to sell the ones he likes.',
    spec: { kind: 'person', id: KEEPER_OF.smith }, commands,
    scene: () => [
      h('div', null, `Serving: ${pick.current()?.name ?? 'nobody'}`),
      h('div', { class: 'dim' }, `${g.state.party.gold} gold. 1-6 or the arrows pick who.`),
    ],
    selectedId: () => pick.current()?.id,
    onPick: (m) => pick.select(m.id),
  });

  async function buyOne(): Promise<void> {
    const who = pick.current();
    if (!who) { lay.msg.say('Nobody to sell to.'); return; }
    const party = g.state.party;
    const stock = visibleStock(party, SHOP);
    const i = await openList(app.host, {
      title: `For ${who.name} (you have ${party.gold} gold)`, accent,
      rows: stock.map((it) => ({
        label: it.name,
        detail: `${it.damage ? `damage ${it.damage[0]}d${it.damage[1]}  ` : it.ac ? `armour +${it.ac}  ` : it.spellId ? 'restores health  ' : ''}${it.price}g`,
        disabled: party.gold < it.price,
      })),
    });
    if (i === null) return;
    try {
      g.state.party = buy(party, stock[i].id, SHOP, who.id);
      lay.msg.say(`Bought ${stock[i].name}.`);
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
    lay.update();
  }

  async function sellOne(): Promise<void> {
    const who = pick.current();
    if (!who) { lay.msg.say('Nobody to buy from.'); return; }
    if (who.inventory.length === 0) { lay.msg.say(`${who.name} is carrying nothing Hobb would pay for.`); return; }
    const i = await openList(app.host, {
      title: `${who.name} sells`, accent,
      rows: who.inventory.map((id) => ({ label: displayName(g.state.party, id), detail: `${Math.floor(itemDef(id).price / 2)}g` })),
    });
    if (i === null) return;
    const id = who.inventory[i];
    try {
      g.state.party = sell(g.state.party, who.id, id);
      lay.msg.say(`Sold ${displayName(g.state.party, id)} for ${Math.floor(itemDef(id).price / 2)}g.`);
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
    lay.update();
  }

  async function identify(): Promise<void> {
    const who = pick.current();
    if (!who) return;
    const unknown = who.inventory.filter((id) => itemDef(id).unidentifiedName && !(g.state.party.identified ?? []).includes(id));
    if (unknown.length === 0) { lay.msg.say(`${who.name} has nothing here that needs identifying.`); return; }
    const i = await openList(app.host, {
      title: `${who.name} studies`, accent,
      rows: unknown.map((id) => ({ label: displayName(g.state.party, id) })),
    });
    if (i === null) return;
    const before = g.state.party;
    const after = identifyItem(before, unknown[i], who);
    if (after === before) { lay.msg.say('Only a Shade can read what a thing really is.'); return; }
    g.state.party = after;
    lay.msg.say(`${who.name} turns it over, and it is ${displayName(after, unknown[i])}.`);
    lay.update();
  }

  lay.msg.say('"Look all you like. Touching costs extra."');
  return { el: lay.el, commands, dispose: lay.dispose };
}
