/** Framed dialogues: pick from a list, confirm, type a name. Each is a modal key layer; clicking works too. */
import { h } from './dom';
import { labelOf } from './keys';
import type { KeyCommand, KeyRouter } from './keys';

export interface UiHost { router: KeyRouter; layer: HTMLElement }
/** `key` is an optional letter that picks the row (printed as `S) Save`); rows without one are picked by number. */
export interface ListRow { label: string; detail?: string; disabled?: boolean; key?: string }
export interface ListState { rows: ListRow[]; index: number }
export type ListOutcome =
  | { kind: 'moved' }
  | { kind: 'confirm'; index: number }
  | { kind: 'cancel' }
  | { kind: 'ignored' };

const ROW_KEYS = '123456789abcdefghijklmnopqrstuvwxyz';
/** The key that picks row `i`: 1 to 9, then letters. */
export const rowKey = (i: number): string => ROW_KEYS[i] ?? '';

/** Pure: what one key does to a list. */
export function listKey(s: ListState, key: string, pageSize = 8): { state: ListState; outcome: ListOutcome } {
  const n = s.rows.length;
  const same = { state: s, outcome: { kind: 'ignored' } as ListOutcome };
  const go = (index: number) => ({ state: { ...s, index }, outcome: { kind: 'moved' } as ListOutcome });
  if (key === 'Escape') return { state: s, outcome: { kind: 'cancel' } };
  if (n === 0) return same;
  if (key === 'ArrowDown') return go((s.index + 1) % n);
  if (key === 'ArrowUp') return go((s.index + n - 1) % n);
  if (key === 'PageDown') return go(Math.min(n - 1, s.index + pageSize));
  if (key === 'PageUp') return go(Math.max(0, s.index - pageSize));
  if (key === 'Home') return go(0);
  if (key === 'End') return go(n - 1);
  if (key === 'Enter') {
    return s.rows[s.index].disabled ? same : { state: s, outcome: { kind: 'confirm', index: s.index } };
  }
  const k = key.toLowerCase();
  const hot = k.length === 1 ? s.rows.findIndex((r) => r.key?.toLowerCase() === k) : -1;
  if (hot >= 0) return s.rows[hot].disabled ? same : { state: { ...s, index: hot }, outcome: { kind: 'confirm', index: hot } };
  const i = k.length === 1 && !s.rows.some((r) => r.key) ? ROW_KEYS.indexOf(k) : -1;
  if (i >= 0 && i < n && !s.rows[i].disabled) return { state: { ...s, index: i }, outcome: { kind: 'confirm', index: i } };
  return same;
}

export interface ListSpec {
  title: string;
  rows: ListRow[];
  accent?: string;
  start?: number;
  onMove?: (i: number) => void;
}

function open<T>(host: UiHost, el: HTMLElement, name: string, make: (done: (v: T) => void) => { commands(): KeyCommand[]; onKey?(k: string): boolean; typing?: boolean }): Promise<T> {
  return new Promise<T>((resolve) => {
    let closed = false;
    const done = (v: T) => {
      if (closed) return;
      closed = true;
      host.router.pop(name);
      el.remove();
      resolve(v);
    };
    const l = make(done);
    host.layer.append(el);
    host.router.push({ name, modal: true, ...l });
  });
}

export function openList(host: UiHost, spec: ListSpec): Promise<number | null> {
  if (spec.rows.length === 0) return Promise.resolve(null);
  let state: ListState = { rows: spec.rows, index: Math.max(0, Math.min(spec.rows.length - 1, spec.start ?? 0)) };
  const el = h('div', { class: 'dialog list', style: spec.accent ? `--accent:${spec.accent}` : null });
  const body = h('div', { class: 'rows' });
  el.append(h('div', { class: 'dlg-title' }, spec.title), body);
  let finish: (v: number | null) => void = () => {};
  const paint = () => {
    body.replaceChildren(
      ...state.rows.map((r, i) =>
        h('div', {
          class: `row${i === state.index ? ' sel' : ''}${r.disabled ? ' off' : ''}`,
          onclick: () => { if (!r.disabled) finish(i); },
        },
        h('span', { class: 'mark' }, i === state.index ? '>' : ' '),
        h('span', { class: 'lbl' }, `${r.key ? r.key.toUpperCase() : rowKey(i)}) ${r.label}`),
        r.detail ? h('span', { class: 'det' }, r.detail) : null),
      ),
    );
    body.querySelector('.sel')?.scrollIntoView?.({ block: 'nearest' });
  };
  paint();
  return open<number | null>(host, el, 'list', (done) => {
    finish = done;
    return {
      commands: () => [],
      onKey: (key) => {
        const r = listKey(state, key);
        state = r.state;
        if (r.outcome.kind === 'moved') { paint(); spec.onMove?.(state.index); return true; }
        if (r.outcome.kind === 'confirm') { done(r.outcome.index); return true; }
        if (r.outcome.kind === 'cancel') { done(null); return true; }
        return false;
      },
    };
  });
}

export function confirmBox(host: UiHost, text: string, accent?: string): Promise<boolean> {
  const el = h('div', { class: 'dialog confirm', style: accent ? `--accent:${accent}` : null });
  let finish: (v: boolean) => void = () => {};
  const cmds: KeyCommand[] = [
    { key: 'y', label: 'Yes', run: () => finish(true) },
    { key: 'n', label: 'No', run: () => finish(false) },
    { key: 'Escape', label: 'No', run: () => finish(false) },
    { key: 'Enter', label: 'No', run: () => finish(false) },
  ];
  el.append(
    h('div', { class: 'dlg-text' }, text),
    h('div', { class: 'cmds' }, ...cmds.slice(0, 2).map((c) => h('button', { class: 'cmd', onclick: c.run }, labelOf(c)))),
  );
  return open<boolean>(host, el, 'confirm', (done) => {
    finish = done;
    return { commands: () => cmds };
  });
}

const NAME_MAX = 24;

export function promptName(host: UiHost, title: string, accent?: string, initial = ''): Promise<string | null> {
  let text = initial.slice(0, NAME_MAX);
  const shown = h('span', { class: 'typed' });
  const el = h('div', { class: 'dialog name', style: accent ? `--accent:${accent}` : null },
    h('div', { class: 'dlg-title' }, title),
    h('div', { class: 'field' }, '> ', shown, h('span', { class: 'cursor' }, '_')),
    h('div', { class: 'hint' }, 'Enter) accept   Esc) back'));
  const paint = () => { shown.textContent = text; };
  paint();
  let finish: (v: string | null) => void = () => {};
  return open<string | null>(host, el, 'name', (done) => {
    finish = done;
    return {
      typing: true,
      commands: () => [
        { key: 'Enter', label: 'Accept', run: () => { const t = text.trim(); if (t) finish(t); } },
        { key: 'Escape', label: 'Back', run: () => finish(null) },
      ],
      onKey: (key) => {
        if (key === 'Backspace') { text = text.slice(0, -1); paint(); return true; }
        if (key.length === 1) {
          if (text.length < NAME_MAX) { text += key; paint(); }
          return true;
        }
        return false;
      },
    };
  });
}
