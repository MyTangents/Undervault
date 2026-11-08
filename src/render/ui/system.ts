/** The Esc dialogue (save, load, options, quit) and the Options dialogue. */
import type { Settings } from '../../core/settings';
import type { App } from './app';
import { h } from './dom';
import { openList } from './dialog';
import { getGlow, setGlow } from './frame';
import type { Glow } from './frame';

export async function openSystem(app: App): Promise<void> {
  const i = await openList(app.host, {
    title: 'System',
    accent: '#c9b787',
    rows: [
      { label: 'Save to file', key: 's', disabled: !app.game },
      { label: 'Load from file', key: 'l' },
      { label: 'Options', key: 'o' },
      { label: 'Quit to title', key: 'q' },
    ],
  });
  if (i === 0) app.saveToFile();
  else if (i === 1) await app.loadFromFile();
  else if (i === 2) await openOptions(app);
  else if (i === 3) { app.autosave(); app.dispatch({ type: 'toTitle' }); }
}

type SliderKey = 'bloom' | 'flicker' | 'fog' | 'lamp';

interface OptionRow {
  label: string;
  /** What is shown on the right of the row. */
  show(): string;
  /** Left (-1) and Right (+1). */
  adjust(dir: 1 | -1): void;
  /** Enter: flips a choice, does nothing to a slider. */
  flip(): void;
  /** 0 to 1 for a slider's bar; null for a choice. */
  fill(): number | null;
}

const GLOWS: Glow[] = ['off', 'low', 'normal'];

function rows(app: App): OptionRow[] {
  const slider = (label: string, key: SliderKey, min: number, max: number, step: number): OptionRow => ({
    label,
    show: () => String(Number(app.settings()[key].toFixed(2))),
    adjust: (dir) => {
      const next = Math.min(max, Math.max(min, Math.round((app.settings()[key] + dir * step) / step) * step));
      app.setSettings({ ...app.settings(), [key]: Number(next.toFixed(3)) });
    },
    flip: () => {},
    fill: () => (app.settings()[key] - min) / (max - min),
  });
  const choice = <K extends 'quality' | 'automap'>(label: string, key: K, values: Settings[K][], names: string[]): OptionRow => ({
    label,
    show: () => names[values.indexOf(app.settings()[key])] ?? String(app.settings()[key]),
    adjust: (dir) => {
      const at = values.indexOf(app.settings()[key]);
      app.setSettings({ ...app.settings(), [key]: values[(at + dir + values.length) % values.length] });
    },
    flip: () => {
      const at = values.indexOf(app.settings()[key]);
      app.setSettings({ ...app.settings(), [key]: values[(at + 1) % values.length] });
    },
    fill: () => null,
  });
  const glowRow: OptionRow = {
    label: 'Screen glow',
    show: () => getGlow(),
    adjust: (dir) => setGlow(GLOWS[(GLOWS.indexOf(getGlow()) + dir + GLOWS.length) % GLOWS.length]),
    flip() { this.adjust(1); },
    fill: () => null,
  };
  return [
    slider('Bloom', 'bloom', 0, 2, 0.05),
    slider('Torch flicker', 'flicker', 0, 2, 0.05),
    slider('Fog', 'fog', 0.03, 0.6, 0.01),
    slider('Lantern', 'lamp', 0, 2, 0.05),
    choice('Quality', 'quality', ['normal', 'low'], ['Normal', 'Low (no bloom, for slower machines)']),
    choice('Automap', 'automap', ['on', 'off'], ['On (fills in as you explore)', 'Off (draw your own)']),
    glowRow,
  ];
}

/** Up and Down pick a setting, Left and Right change it, Enter flips a choice, Esc closes. */
export function openOptions(app: App): Promise<void> {
  const list = rows(app);
  let index = 0;
  const body = h('div', { class: 'rows' });
  const el = h('div', { class: 'dialog options', style: '--accent:#c9b787' },
    h('div', { class: 'dlg-title' }, 'Options'), body,
    h('div', { class: 'hint' }, '↑↓) pick   ←→) change   Enter) flip   Esc) done'));
  const paint = () => {
    body.replaceChildren(...list.map((r, i) => {
      const f = r.fill();
      const bar = f === null ? null : h('span', { class: 'meter' }, '#'.repeat(Math.round(f * 12)).padEnd(12, '-'));
      return h('div', { class: `row${i === index ? ' sel' : ''}`, onclick: () => { index = i; paint(); } },
        h('span', { class: 'mark' }, i === index ? '>' : ' '),
        h('span', { class: 'lbl', style: 'min-width:9rem' }, r.label),
        bar,
        h('span', { class: 'det' }, r.show()),
        h('button', { class: 'cmd step', type: 'button', onclick: (e: Event) => { e.stopPropagation(); index = i; r.adjust(-1); paint(); } }, '‹'),
        h('button', { class: 'cmd step', type: 'button', onclick: (e: Event) => { e.stopPropagation(); index = i; r.adjust(1); paint(); } }, '›'));
    }));
  };
  paint();
  return new Promise<void>((resolve) => {
    const close = () => { app.host.router.pop('options'); el.remove(); resolve(); };
    app.host.layer.append(el);
    app.host.router.push({
      name: 'options',
      modal: true,
      commands: () => [{ key: 'Escape', label: 'Done', run: close }],
      onKey: (key) => {
        if (key === 'ArrowDown') index = (index + 1) % list.length;
        else if (key === 'ArrowUp') index = (index + list.length - 1) % list.length;
        else if (key === 'ArrowLeft') list[index].adjust(-1);
        else if (key === 'ArrowRight') list[index].adjust(1);
        else if (key === 'Enter') list[index].flip();
        else return false;
        paint();
        return true;
      },
    });
  });
}
