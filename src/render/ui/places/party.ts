import { ITEMS, SPELLS } from '../../../core/data';
import { displayName, equip, identifyItem, unequip } from '../../../core/items';
import { renderChronicle } from '../../../core/chronicle';
import { ATTRS } from '../../../core/types';
import type { Character } from '../../../core/types';
import type { App } from '../app';
import { openList } from '../dialog';
import { h } from '../dom';
import { accentFor } from '../frame';
import { className, raceName } from '../party';
import { placeLayout } from './layout';
import type { PlaceLayout, PlaceScreen } from './layout';
import { memberPicker } from './pick';
import { portraitForCharacter } from '../../portrait';
import { leaveCommands } from './leave';

const SLOTS = ['weapon', 'armour', 'shield', 'helm', 'trinket'];
const itemDef = (id: string) => ITEMS.find((i) => i.id === id)!;

/** The Party and its Packs: pick who, then E)quip, U)nequip, S)tudy. The sheet shows the face and everything they carry. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  const accent = accentFor('party');
  let lay: PlaceLayout;
  const pick = memberPicker(app, () => { showFace(); lay.update(); });
  const first = pick.current();
  const commands = () => [
    { key: 'e', label: 'Equip', run: () => void equipOne() },
    { key: 'u', label: 'Unequip', run: () => void unequipOne() },
    { key: 's', label: 'Study', run: () => void study() },
    ...pick.commands(),
    ...leaveCommands(app),
  ];
  lay = placeLayout(app, {
    id: 'party', title: 'The Party and its Packs',
    blurb: 'Who is wearing what, and who is carrying whose lunch.',
    spec: first ? portraitForCharacter(first) : null, commands,
    scene: () => sheet(pick.current()),
    selectedId: () => pick.current()?.id,
    onPick: (m) => pick.select(m.id),
  });

  /** The face follows the member; the wounded are paler and the fallen grey. */
  function showFace(): void {
    const m = pick.current();
    if (!m) return;
    lay.setPortrait(portraitForCharacter(m));
    lay.view?.setState({ dead: m.dead || m.ash, damage: m.dead || m.ash ? 0 : Math.max(0, Math.min(1, 1 - m.hp / Math.max(1, m.maxHp))) * 0.6 });
  }

  function sheet(m: Character | undefined): (Node | null)[] {
    if (!m) return [h('div', { class: 'dim' }, 'Nobody to look at.')];
    const party = g.state.party;
    const spells = m.known.map((id) => SPELLS.find((s) => s.id === id)?.name ?? id);
    const slot = m.row === 'front' ? 'front rank' : 'back rank';
    return [
      h('div', null, h('b', null, m.name), ` · Lv ${m.level} ${raceName(m.raceId)} ${className(m.classId)} · ${m.alignment} · ${slot}`),
      h('div', null, `HP ${m.hp}/${m.maxHp}${m.dead || m.ash ? (m.ash ? ' · ash' : ' · dead') : ''}${m.status.length ? ` · ${m.status.join(', ')}` : ''}`),
      h('div', null, ATTRS.map((a) => `${a.toUpperCase()} ${m.stats[a]}`).join('  ')),
      h('div', { class: 'dim' }, `Spells: ${spells.length ? spells.join(', ') : 'none'}`),
      h('div', { class: 'dim' }, `Techniques: ${m.techniques.length ? m.techniques.join(', ') : 'none'}`),
      h('div', null, h('b', null, 'Wearing')),
      ...SLOTS.map((s) => h('div', { class: 'dim' }, `${s}: ${m.equipped[s] ? displayName(party, m.equipped[s]) : 'nothing'}`)),
      h('div', null, h('b', null, 'Carrying')),
      h('div', { class: 'dim' }, m.inventory.length ? m.inventory.map((id) => displayName(party, id)).join(', ') : 'Nothing but lint.'),
    ];
  }

  function swap(id: string, f: (c: Character) => Character): void {
    const party = g.state.party;
    g.state.party = { ...party, members: party.members.map((m) => (m.id === id ? f(m) : m)) };
  }

  async function equipOne(): Promise<void> {
    const who = pick.current();
    if (!who) return;
    const wearable = who.inventory.filter((id) => itemDef(id).kind !== 'consumable');
    if (wearable.length === 0) { lay.msg.say(`${who.name} has nothing to put on.`); return; }
    const i = await openList(app.host, {
      title: `${who.name} puts on`, accent,
      rows: wearable.map((id) => ({ label: displayName(g.state.party, id), detail: itemDef(id).kind })),
    });
    if (i === null) return;
    try {
      swap(who.id, (c) => equip(c, wearable[i]));
      lay.msg.say(`${who.name} equips ${displayName(g.state.party, wearable[i])}.`);
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
    lay.update();
  }

  async function unequipOne(): Promise<void> {
    const who = pick.current();
    if (!who) return;
    const worn = SLOTS.filter((s) => who.equipped[s]);
    if (worn.length === 0) { lay.msg.say(`${who.name} is wearing nothing to take off.`); return; }
    const i = await openList(app.host, {
      title: `${who.name} takes off`, accent,
      rows: worn.map((s) => ({ label: displayName(g.state.party, who.equipped[s]), detail: s })),
    });
    if (i === null) return;
    try {
      swap(who.id, (c) => unequip(c, worn[i]));
      lay.msg.say(`${who.name} takes off the ${worn[i]}.`);
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
    lay.update();
  }

  async function study(): Promise<void> {
    const who = pick.current();
    if (!who) return;
    if (who.inventory.length === 0) { lay.msg.say(`${who.name} is carrying nothing to study.`); return; }
    const i = await openList(app.host, {
      title: `${who.name} studies`, accent,
      rows: who.inventory.map((id) => ({ label: displayName(g.state.party, id) })),
    });
    if (i === null) return;
    const before = g.state.party;
    const after = identifyItem(before, who.inventory[i], who);
    if (after === before) lay.msg.say('Only a Shade can read what a thing really is.');
    else { g.state.party = after; lay.msg.say(`It is ${displayName(after, who.inventory[i])}.`); }
    lay.update();
  }

  showFace();
  lay.msg.say('The chronicle:');
  for (const l of renderChronicle(g.state.chronicle, 4)) lay.msg.say(l);
  return { el: lay.el, commands, dispose: lay.dispose };
}
