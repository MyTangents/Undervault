/** Reordering the party: pick a member, then Up and Down move them one slot at a time. Used at the Sump Tap and in camp. */
import { moveMember } from '../../core/party';
import { FRONT_SIZE } from '../../core/party';
import type { Party } from '../../core/types';
import type { App } from './app';
import { h } from './dom';
import { openList } from './dialog';
import { accentFor } from './frame';

const rank = (i: number) => (i < FRONT_SIZE ? 'front' : 'back');

/** Returns true when the order changed. Enter keeps the new order, Escape puts everything back as it was. */
export async function reorderParty(app: App, accent = accentFor('tavern')): Promise<boolean> {
  const g = app.game!;
  const original = g.state.party;
  if (original.members.length < 2) { app.say('There is nobody to move.'); return false; }

  const pick = await openList(app.host, {
    title: 'Order the party: who moves?', accent,
    rows: original.members.map((m, i) => ({ label: m.name, detail: `slot ${i + 1}, ${rank(i)}${m.dead || m.ash ? ', fallen' : ''}` })),
  });
  if (pick === null) return false;

  const id = original.members[pick].id;
  let work: Party = original;
  let index = pick;
  const body = h('div', { class: 'rows' });
  const el = h('div', { class: 'dialog reorder', style: `--accent:${accent}` },
    h('div', { class: 'dlg-title' }, 'Move them with ↑ and ↓'), body,
    h('div', { class: 'hint' }, 'Enter) keep   Esc) put it back'));
  const paint = () => body.replaceChildren(...work.members.map((m, i) =>
    h('div', { class: `row${m.id === id ? ' sel' : ''}${m.dead || m.ash ? ' off' : ''}` },
      h('span', { class: 'mark' }, m.id === id ? '>' : ' '),
      h('span', { class: 'lbl' }, `${i + 1}) ${m.name}`),
      h('span', { class: 'det' }, `${rank(i)}${m.dead || m.ash ? ', fallen' : ''}`))));
  paint();

  const keep = await new Promise<boolean>((resolve) => {
    const close = (v: boolean) => { app.host.router.pop('reorder'); el.remove(); resolve(v); };
    app.host.layer.append(el);
    app.host.router.push({
      name: 'reorder',
      modal: true,
      commands: () => [],
      onKey: (key) => {
        if (key === 'ArrowUp' || key === 'ArrowDown') {
          const to = Math.max(0, Math.min(work.members.length - 1, index + (key === 'ArrowUp' ? -1 : 1)));
          if (to !== index) { index = to; work = moveMember(work, id, to); paint(); }
          return true;
        }
        if (key === 'Enter') { close(true); return true; }
        if (key === 'Escape') { close(false); return true; }
        return false;
      },
    });
  });
  if (!keep || work === original) return false;
  g.state.party = work;
  const at = work.members.findIndex((m) => m.id === id);
  app.say(`${work.members[at].name} now stands in slot ${at + 1}, the ${rank(at)} rank.`);
  return true;
}
