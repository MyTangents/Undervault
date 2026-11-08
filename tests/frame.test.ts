// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { demoParty } from '../src/core/sim';
import { PLACES } from '../src/core/town';
import { PLACE_ACCENT, accentFor, commandBar, frame, getGlow, messageWindow, rosterStrip, setGlow } from '../src/render/ui/frame';

beforeEach(() => { localStorage.clear(); delete document.documentElement.dataset.glow; });
afterEach(() => vi.restoreAllMocks());

describe('command bar', () => {
  test('commandBar prints F)ight style labels, dims disabled commands, and clicking runs the command', () => {
    const fight = vi.fn(), spell = vi.fn();
    const bar = commandBar([
      { key: 'f', label: 'Fight', run: fight },
      { key: 's', label: 'Spell', enabled: false, run: spell },
    ]);
    const cmds = [...bar.querySelectorAll('.cmd')] as HTMLElement[];
    expect(cmds.map((c) => c.textContent)).toEqual(['F)ight', 'S)pell']);
    expect(cmds[0].classList.contains('off')).toBe(false);
    expect(cmds[1].classList.contains('off')).toBe(true);
    cmds[0].click();
    cmds[1].click();
    expect(fight).toHaveBeenCalledTimes(1);
    expect(spell).not.toHaveBeenCalled();
  });
});

describe('message window', () => {
  test('messageWindow keeps only the last max lines and marks the newest', () => {
    const w = messageWindow(3);
    for (const l of ['one', 'two', 'three', 'four']) w.say(l);
    const lines = [...w.el.querySelectorAll('.line')];
    expect(lines.map((l) => l.textContent)).toEqual(['two', 'three', 'four']);
    expect(lines.at(-1)!.classList.contains('new')).toBe(true);
    expect(lines[0].classList.contains('new')).toBe(false);
    w.clear();
    expect(w.el.querySelectorAll('.line').length).toBe(0);
  });
});

describe('roster strip', () => {
  const party = () => demoParty();

  test('rosterStrip shows one row per member with name, class, hit points and status, calls thumb when given, and contains no canvas when it is not', () => {
    const p = party();
    const dead = { ...p, members: p.members.map((m, i) => (i === 2 ? { ...m, hp: 0, dead: true } : m)) };
    const strip = rosterStrip(dead, {});
    const rows = [...strip.querySelectorAll('.rrow')];
    expect(rows.length).toBe(dead.members.length);
    expect(rows[0].textContent).toContain(dead.members[0].name);
    expect(rows[0].textContent).toContain(`${dead.members[0].hp}/${dead.members[0].maxHp}`);
    expect(rows[2].classList.contains('dead')).toBe(true);
    expect(rows[2].textContent).toContain('dead');
    expect(rows[0].classList.contains('dead')).toBe(false);
    expect(strip.querySelector('canvas')).toBeNull();

    const seen: string[] = [];
    const withThumbs = rosterStrip(dead, { thumb: (m) => { seen.push(m.id); return document.createElement('canvas'); } });
    expect(seen.length).toBe(dead.members.length);
    expect(withThumbs.querySelectorAll('canvas').length).toBe(dead.members.length);
  });

  test('rosterStrip numbers the slots and marks slots 1 to 3 front and 4 to 6 back', () => {
    const p = party();
    const picked: string[] = [];
    const strip = rosterStrip(p, { selectedId: p.members[1].id, onPick: (m) => picked.push(m.id) });
    const rows = [...strip.querySelectorAll('.rrow')] as HTMLElement[];
    expect(rows.map((r) => r.querySelector('.slot')!.textContent)).toEqual(p.members.map((_, i) => String(i + 1)));
    expect(rows.map((r) => (r.classList.contains('front') ? 'F' : r.classList.contains('back') ? 'B' : '?')).join('')).toBe('FFFBBB'.slice(0, rows.length));
    expect(rows[1].classList.contains('sel')).toBe(true);
    rows[3].click();
    expect(picked).toEqual([p.members[3].id]);
  });
});

describe('accents and glow', () => {
  test('accentFor returns a distinct colour for each of the six places and a fallback for an unknown id', () => {
    const six = ['tavern', 'smith', 'temple', 'inn', 'informant', 'tales'];
    for (const id of six) expect(PLACES.some((p) => p.id === id)).toBe(true);
    const colours = six.map(accentFor);
    expect(new Set(colours).size).toBe(6);
    expect(accentFor('nowhere')).toBe(PLACE_ACCENT.title);
    for (const k of [...six, 'party', 'dungeon', 'title']) expect(PLACE_ACCENT[k]).toMatch(/^#[0-9a-f]{6}$/i);
  });

  test('getGlow defaults to low, setGlow persists it and sets the data attribute, and a throwing localStorage does not break either', () => {
    expect(getGlow()).toBe('low');
    setGlow('normal');
    expect(document.documentElement.dataset.glow).toBe('normal');
    expect(getGlow()).toBe('normal');
    localStorage.setItem('undervault.glow', 'banana');
    expect(getGlow()).toBe('low');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(getGlow()).toBe('low');
    expect(() => setGlow('off')).not.toThrow();
    expect(document.documentElement.dataset.glow).toBe('off');
  });
});

describe('frame', () => {
  test('frame wraps its children under a title and carries the accent', () => {
    const f = frame('Sump Tap', '#d29a3a', 'hello', null);
    expect(f.textContent).toContain('Sump Tap');
    expect(f.textContent).toContain('hello');
    expect(f.getAttribute('style')).toContain('#d29a3a');
  });
});
