/** The dungeon camp: look at a member, reorder the party, save, options. No equipping and no item use: that would be new rules. */
import type { App } from './app';
import { openList } from './dialog';
import { h } from './dom';
import { accentFor } from './frame';
import { className } from './party';
import { reorderParty } from './reorder';
import { memberSheet } from './sheet';

export async function openCamp(app: App): Promise<void> {
  const accent = accentFor('dungeon');
  for (;;) {
    const i = await openList(app.host, {
      title: 'Camp', accent,
      rows: [
        { label: 'Inspect a member', key: 'i' },
        { label: 'Reorder the party', key: 'r' },
        { label: 'Save to file', key: 's', disabled: !app.game },
        { label: 'Options', key: 'o' },
        { label: 'Leave camp', key: 'l' },
      ],
    });
    if (i === null || i === 4) return;
    if (i === 0) await inspect(app, accent);
    else if (i === 1) { if (await reorderParty(app, accent)) app.updateDungeon(); }
    else if (i === 2) app.saveToFile();
    else await app.openOptions();
  }
}

/** Picks a member and shows their sheet; the sheet is read-only text with no face. */
async function inspect(app: App, accent: string): Promise<void> {
  const g = app.game!;
  for (;;) {
    const party = g.state.party;
    const k = await openList(app.host, {
      title: 'Inspect whom?', accent,
      rows: party.members.map((m, n) => ({ label: m.name, detail: `${className(m.classId)} · slot ${n + 1}` })),
    });
    if (k === null) return;
    await showSheet(app, accent, k);
  }
}

function showSheet(app: App, accent: string, index: number): Promise<void> {
  const party = app.game!.state.party;
  const m = party.members[index];
  const el = h('div', { class: 'dialog sheet', style: `--accent:${accent}` },
    h('div', { class: 'dlg-title' }, m.name), ...memberSheet(m, party), h('div', { class: 'hint' }, 'Esc) back'));
  return new Promise<void>((resolve) => {
    const close = () => { app.host.router.pop('sheet'); el.remove(); resolve(); };
    app.host.layer.append(el);
    app.host.router.push({
      name: 'sheet', modal: true,
      commands: () => [{ key: 'Escape', label: 'Back', run: close }, { key: 'Enter', label: 'Back', hidden: true, run: close }],
    });
  });
}
