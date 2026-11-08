import { CLASSES, RACES } from '../../../core/data';
import { PARTY_SIZE, addToParty } from '../../../core/party';
import { createRng } from '../../../core/rng';
import { recruits } from '../../../core/town';
import { ATTRS } from '../../../core/types';
import type { Alignment, Attr, Character } from '../../../core/types';
import type { App } from '../app';
import { Creator, creatorFace } from '../creator';
import { confirmBox, openList, promptName } from '../dialog';
import { h } from '../dom';
import { accentFor } from '../frame';
import { className, raceName } from '../party';
import { renormalise, reorderParty } from '../reorder';
import { placeLayout } from './layout';
import type { PlaceLayout, PlaceScreen } from './layout';
import { KEEPER_OF } from '../../portrait/people';
import { portraitForCharacter } from '../../portrait';
import type { PortraitSpec } from '../../portrait';
import { leaveCommands } from './leave';

const ATTR_LABEL: Record<Attr, string> = { str: 'Strength', iq: 'Intellect', pie: 'Piety', vit: 'Vitality', agi: 'Agility', luck: 'Luck' };
const ALIGNMENTS: Alignment[] = ['good', 'neutral', 'evil'];

/** The Sump Tap: R)ecruit, N)ew character, O)rder the party, D)ismiss. */
export function placeScreen(app: App): PlaceScreen {
  const g = app.game!;
  const accent = accentFor('tavern');
  const keeper: PortraitSpec = { kind: 'person', id: KEEPER_OF.tavern };
  const room = () => g.state.party.members.length < PARTY_SIZE;
  let busy = false;
  const commands = () => [
    { key: 'r', label: 'Recruit', enabled: room() && !busy, run: () => void guard(recruit) },
    { key: 'n', label: 'New character', enabled: room() && !busy, run: () => void guard(create) },
    { key: 'o', label: 'Order the party', enabled: g.state.party.members.length > 1 && !busy, run: () => void guard(order) },
    { key: 'd', label: 'Dismiss', enabled: g.state.party.members.length > 0 && !busy, run: () => void guard(dismiss) },
    ...leaveCommands(app),
  ];
  const lay: PlaceLayout = placeLayout(app, {
    id: 'tavern', title: 'The Sump Tap',
    blurb: 'Dennis Brannoch pours, lies about his past, and finds you people who need work.',
    spec: keeper, commands,
  });
  /** Runs one thing at a time so a second key cannot open a second dialogue over the first. */
  async function guard(f: () => Promise<void>): Promise<void> {
    if (busy) return;
    busy = true;
    try { await f(); } finally { busy = false; lay.setPortrait(keeper); lay.update(); }
  }

  const waiting = (): Character[] => {
    const day = g.state.day;
    return recruits(day, createRng(day * 977 + 1), g.state.party).filter((c) => !app.recruited.has(c.id));
  };

  async function recruit(): Promise<void> {
    const list = waiting();
    if (list.length === 0) { lay.msg.say('Nobody is waiting. Come back tomorrow.'); return; }
    lay.setPortrait(portraitForCharacter(list[0]));
    const i = await openList(app.host, {
      title: 'Waiting for work', accent,
      rows: list.map((c) => ({ label: c.name, detail: `${raceName(c.raceId)} ${className(c.classId)} · ${c.alignment} · ${c.maxHp} hp` })),
      onMove: (n) => lay.setPortrait(portraitForCharacter(list[n])),
    });
    if (i === null) return;
    try {
      g.state.party = addToParty(g.state.party, list[i]);
      app.recruited.add(list[i].id);
      lay.msg.say(`${list[i].name} joins you.`);
    } catch (e) {
      lay.msg.say(e instanceof Error ? e.message : String(e));
    }
  }

  async function dismiss(): Promise<void> {
    const members = g.state.party.members;
    const i = await openList(app.host, {
      title: 'Dismiss whom?', accent,
      rows: members.map((m) => ({ label: m.name, detail: `${className(m.classId)} · slot ${members.indexOf(m) + 1}` })),
    });
    if (i === null) return;
    const m = members[i];
    if (!(await confirmBox(app.host, `Send ${m.name} away? They leave the party for good.`, accent))) return;
    g.state.party = renormalise({ ...g.state.party, members: g.state.party.members.filter((x) => x.id !== m.id) });
    lay.msg.say(`${m.name} leaves.`);
  }

  async function order(): Promise<void> {
    await reorderParty(app, accent);
  }

  // ---- the creator: a dialogue sequence over a state machine ----
  async function create(): Promise<void> {
    const c = new Creator(Date.now() & 0xffffff);
    const preview = () => lay.setPortrait({
      kind: 'adventurer', raceId: c.spec.raceId, classId: c.spec.classId ?? 'blade', alignment: c.spec.alignment, face: creatorFace(c.seed),
    });
    preview();
    for (;;) {
      if (c.stage === 'name') {
        const n = await promptName(app.host, 'Name your adventurer', accent, c.spec.name);
        if (n === null) return;
        c.spec.name = n;
        c.next();
      } else if (c.stage === 'race') {
        const i = await openList(app.host, {
          title: `Race for ${c.spec.name}`, accent, start: Math.max(0, RACES.findIndex((r) => r.id === c.spec.raceId)),
          rows: RACES.map((r) => ({ label: r.name, detail: ATTRS.map((a) => `${a.toUpperCase()} ${r.base[a]}`).join(' ') })),
          onMove: (n) => { c.spec.raceId = RACES[n].id; preview(); },
        });
        if (i === null) { c.back(); continue; }
        c.spec.raceId = RACES[i].id;
        preview();
        c.next();
      } else if (c.stage === 'alignment') {
        const i = await openList(app.host, {
          title: 'Alignment', accent, start: ALIGNMENTS.indexOf(c.spec.alignment),
          rows: ALIGNMENTS.map((a) => ({ label: a[0].toUpperCase() + a.slice(1), detail: a === 'good' ? 'will not share a party with evil' : a === 'evil' ? 'will not share a party with good' : 'shares with anyone' })),
          onMove: (n) => { c.spec.alignment = ALIGNMENTS[n]; preview(); },
        });
        if (i === null) { c.back(); continue; }
        c.spec.alignment = ALIGNMENTS[i];
        preview();
        c.next();
      } else if (c.stage === 'alloc') {
        const r = await allocate(c, preview);
        if (r === 'back') c.back(); else c.next();
      } else if (c.stage === 'class') {
        const ids = c.eligible();
        const i = await openList(app.host, {
          title: 'Class', accent, start: Math.max(0, ids.indexOf(c.spec.classId ?? '')),
          rows: ids.map((id) => ({ label: className(id), detail: `d${CLASSES.find((k) => k.id === id)!.hpDie} hit die` })),
          onMove: (n) => { c.spec.classId = ids[n]; preview(); },
        });
        if (i === null) { c.back(); continue; }
        c.spec.classId = ids[i];
        preview();
        c.next();
      } else {
        const ok = await confirmBox(app.host, `Sign ${c.spec.name.trim()} on as a ${raceName(c.spec.raceId)} ${className(c.spec.classId!)}?`, accent);
        if (!ok) { c.back(); continue; }
        try {
          const made = c.build();
          g.state.party = addToParty(g.state.party, made);
          lay.msg.say(`${made.name} joins you.`);
        } catch (e) {
          lay.msg.say(e instanceof Error ? e.message : String(e));
        }
        return;
      }
    }
  }

  /** The attribute dialogue: Up and Down pick, Left and Right (or - and +) move points, R re-rolls, Enter goes on, Esc goes back. */
  function allocate(c: Creator, preview: () => void): Promise<'next' | 'back'> {
    let at = 0;
    const body = h('div', { class: 'rows' });
    const note = h('div', { class: 'hint' });
    const el = h('div', { class: 'dialog alloc', style: `--accent:${accent}` },
      h('div', { class: 'dlg-title' }, `Attributes for ${c.spec.name}`), body, note,
      h('div', { class: 'hint' }, '↑↓) pick  ←→) change  R) re-roll the points  Enter) go on  Esc) back'));
    const paint = () => {
      const s = c.stats();
      body.replaceChildren(
        h('div', { class: 'row' }, h('span', { class: 'lbl' }, `Bonus points left: ${c.left()} of ${c.pool}`)),
        ...ATTRS.map((a, i) => h('div', {
          class: `row${i === at ? ' sel' : ''}`,
          onclick: () => { at = i; paint(); },
        }, h('span', { class: 'mark' }, i === at ? '>' : ' '), h('span', { class: 'lbl' }, ATTR_LABEL[a]), h('span', { class: 'det' }, `${s[a]}${c.alloc[a] ? ` (+${c.alloc[a]})` : ''}`))),
        h('div', { class: 'row' }, h('span', { class: 'lbl' }, 'Open to these scores:'),
          h('span', { class: 'det' }, c.eligible().length ? c.eligible().map(className).join(', ') : 'no class yet')));
    };
    paint();
    return new Promise((resolve) => {
      const close = (v: 'next' | 'back') => { app.host.router.pop('alloc'); el.remove(); resolve(v); };
      app.host.layer.append(el);
      app.host.router.push({
        name: 'alloc', modal: true, commands: () => [],
        onKey: (key) => {
          if (key === 'ArrowDown') at = (at + 1) % ATTRS.length;
          else if (key === 'ArrowUp') at = (at + ATTRS.length - 1) % ATTRS.length;
          else if (key === 'ArrowRight' || key === '+' || key === '=') c.adjust(ATTRS[at], 1);
          else if (key === 'ArrowLeft' || key === '-') c.adjust(ATTRS[at], -1);
          else if (key.toLowerCase() === 'r') { c.reroll((Date.now() ^ Math.floor(Math.random() * 0xffffff)) & 0xffffff); preview(); note.textContent = ''; }
          else if (key === 'Enter') {
            if (c.eligible().length === 0) { note.textContent = 'No class is open to these scores yet. Spend more points, or re-roll.'; return true; }
            close('next');
            return true;
          } else if (key === 'Escape') { close('back'); return true; }
          else return false;
          paint();
          return true;
        },
      });
    });
  }

  lay.msg.say('Six is a full party. Good and evil will not share a table.');
  return { el: lay.el, commands, dispose: lay.dispose };
}
