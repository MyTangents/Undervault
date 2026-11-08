/** The building blocks of every non-dungeon screen: frames, the printed command bar, the message window, the roster strip. */
import type { Character, Party } from '../../core/types';
import { FRONT_SIZE } from '../../core/party';
import { h } from './dom';
import { labelOf } from './keys';
import type { KeyCommand } from './keys';
import { className } from './party';

/** Each place has its own border and command-letter colour, as dungeon areas have palettes. */
export const PLACE_ACCENT: Record<string, string> = {
  tavern: '#d29a3a', // amber
  smith: '#e0652c', // forge ember
  temple: '#8fa7bd', // cold grey-blue
  inn: '#e6c35c', // candle gold
  informant: '#4fa58f', // verdigris
  tales: '#9a86d6', // dusk violet
  party: '#cbbf9f',
  dungeon: '#9a9482',
  title: '#c9b787',
};
export const accentFor = (id: string): string => PLACE_ACCENT[id] ?? PLACE_ACCENT.title;

type Kid = Node | string | null;

/** A bordered window: double line, corner ornaments, the title set into the top border. */
export function frame(title: string, accent: string, ...kids: Kid[]): HTMLElement {
  return h('section', { class: 'frame', style: `--accent:${accent}` },
    h('i', { class: 'c tl' }), h('i', { class: 'c tr' }), h('i', { class: 'c bl' }), h('i', { class: 'c br' }),
    h('div', { class: 'ftitle' }, title),
    h('div', { class: 'fbody' }, ...kids));
}

/** `F)ight  S)pell`: the key in the accent colour; disabled commands dimmed and inert; clicking runs one. */
export function commandBar(cmds: KeyCommand[]): HTMLElement {
  return h('nav', { class: 'cmdbar' }, ...cmds.filter((c) => !c.hidden).map((c) => {
    const text = labelOf(c);
    const close = text.indexOf(')');
    const start = text.lastIndexOf(' ', close) + 1;
    return h('button', {
      class: `cmd${c.enabled === false ? ' off' : ''}`,
      type: 'button',
      onclick: () => { if (c.enabled !== false) c.run(); },
    }, text.slice(0, start), h('b', { class: 'k' }, text.slice(start, close + 1)), text.slice(close + 1));
  }));
}

/** How fast spoken lines appear. 0 shows them at once (tests, and people who asked for less motion). */
export const TYPING = { msPerChar: 14 };

export interface MessageWindow {
  el: HTMLElement;
  say(line: string): void;
  /** Like say, but the line appears a few characters at a time; resolves when it is complete. */
  type(line: string): Promise<void>;
  clear(): void;
}

/** A few lines of narration; the newest is brightest. */
export function messageWindow(max = 6): MessageWindow {
  const el = h('div', { class: 'msgwin' });
  return {
    el,
    say(line) {
      el.querySelector('.new')?.classList.remove('new');
      el.append(h('div', { class: 'line new' }, line));
      while (el.children.length > max) el.firstElementChild!.remove();
      el.scrollTop = el.scrollHeight;
    },
    type(line) {
      const ms = TYPING.msPerChar;
      if (ms <= 0) { this.say(line); return Promise.resolve(); }
      el.querySelector('.new')?.classList.remove('new');
      const row = h('div', { class: 'line new' }, '');
      el.append(row);
      while (el.children.length > max) el.firstElementChild!.remove();
      return new Promise<void>((resolve) => {
        let i = 0;
        const tick = () => {
          i = Math.min(line.length, i + 2);
          row.textContent = line.slice(0, i);
          el.scrollTop = el.scrollHeight;
          if (i >= line.length) resolve(); else setTimeout(tick, ms);
        };
        tick();
      });
    },
    clear() { el.replaceChildren(); },
  };
}

export interface RosterOpts {
  selectedId?: string;
  onPick?: (m: Character) => void;
  thumb?: (m: Character) => HTMLElement | null;
}

const STATUS: Record<string, string> = {
  asleep: 'asleep', silenced: 'silenced', poisoned: 'poisoned', paralysed: 'paralysed', shielded: 'warded', blessed: 'blessed',
};

/** One text row per party member, slot-numbered, front rank (1 to 3) and back rank (4 to 6) marked. */
export function rosterStrip(p: Party, opts: RosterOpts): HTMLElement {
  return h('div', { class: 'roster' }, ...p.members.map((m, i) => {
    const gone = m.dead || m.ash;
    const trouble = [m.ash ? 'ash' : m.dead ? 'dead' : '', ...m.status.map((s) => STATUS[s] ?? s)].filter(Boolean).join(', ');
    const thumb = opts.thumb?.(m) ?? null;
    return h('div', {
      class: `rrow ${i < FRONT_SIZE ? 'front' : 'back'}${gone ? ' dead' : ''}${m.id === opts.selectedId ? ' sel' : ''}`,
      onclick: opts.onPick ? () => opts.onPick!(m) : null,
    },
    h('span', { class: 'slot' }, String(i + 1)),
    thumb ? h('span', { class: 'thumb' }, thumb) : null,
    h('span', { class: 'nm' }, m.name),
    h('span', { class: 'cls' }, `L${m.level} ${className(m.classId)}`),
    h('span', { class: 'hp' }, `${m.hp}/${m.maxHp}`),
    h('span', { class: 'st' }, trouble));
  }));
}

export type Glow = 'off' | 'low' | 'normal';
const GLOW_KEY = 'undervault.glow';

export function getGlow(): Glow {
  try {
    const v = localStorage.getItem(GLOW_KEY);
    if (v === 'off' || v === 'low' || v === 'normal') return v;
  } catch { /* blocked storage: fall through to the default */ }
  return 'low';
}

export function setGlow(g: Glow): void {
  document.documentElement.dataset.glow = g;
  try { localStorage.setItem(GLOW_KEY, g); } catch { /* the setting just will not persist */ }
}
