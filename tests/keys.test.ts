import { describe, expect, test, vi } from 'vitest';
import { KeyRouter, duplicateKeys, labelOf } from '../src/render/ui/keys';
import type { KeyCommand, KeyLayer } from '../src/render/ui/keys';

const layer = (name: string, cmds: KeyCommand[], extra: Partial<KeyLayer> = {}): KeyLayer => ({ name, commands: () => cmds, ...extra });
const cmd = (key: string, run = vi.fn(), enabled = true): KeyCommand => ({ key, label: key.toUpperCase(), run, enabled });

describe('KeyRouter', () => {
  test('a letter runs the matching enabled command, in either case', () => {
    const r = new KeyRouter();
    const run = vi.fn();
    r.push(layer('town', [cmd('f', run)]));
    expect(r.handle('f')).toBe(true);
    expect(r.handle('F')).toBe(true);
    expect(run).toHaveBeenCalledTimes(2);
    expect(r.handle('z')).toBe(false);
  });

  test('a disabled command is consumed and does nothing', () => {
    const r = new KeyRouter();
    const run = vi.fn();
    r.push(layer('town', [cmd('f', run, false)]));
    expect(r.handle('f')).toBe(true);
    expect(run).not.toHaveBeenCalled();
  });

  test('the top layer wins, a modal layer hides the ones below, popping restores them', () => {
    const r = new KeyRouter();
    const low = vi.fn(), high = vi.fn(), only = vi.fn();
    r.push(layer('low', [cmd('a', low), cmd('b', low)]));
    r.push(layer('high', [cmd('a', high)]));
    r.handle('a');
    expect(high).toHaveBeenCalledTimes(1);
    expect(low).not.toHaveBeenCalled();
    r.handle('b'); // falls through to the layer below
    expect(low).toHaveBeenCalledTimes(1);
    r.push(layer('box', [cmd('y', only)], { modal: true }));
    expect(r.handle('b')).toBe(false); // hidden
    expect(r.handle('y')).toBe(true);
    r.pop('box');
    expect(r.top()?.name).toBe('high');
    expect(r.handle('b')).toBe(true);
    r.pop();
    expect(r.top()?.name).toBe('low');
    r.clear();
    expect(r.top()).toBeUndefined();
  });

  test('while typing, letters reach onKey and never run commands, but Escape and Enter still do', () => {
    const r = new KeyRouter();
    const letters: string[] = [];
    const f = vi.fn(), esc = vi.fn(), enter = vi.fn();
    r.push(layer('name', [cmd('f', f), cmd('Escape', esc), cmd('Enter', enter)], {
      typing: true,
      modal: true,
      onKey: (k) => (k.length === 1 ? (letters.push(k), true) : false),
    }));
    expect(r.handle('F')).toBe(true);
    expect(r.handle('p')).toBe(true);
    expect(letters).toEqual(['F', 'p']); // original case reaches onKey: names keep capitals
    expect(f).not.toHaveBeenCalled();
    r.handle('Escape');
    r.handle('Enter');
    expect(esc).toHaveBeenCalledTimes(1);
    expect(enter).toHaveBeenCalledTimes(1);
  });

  test('repeat events are ignored', () => {
    const r = new KeyRouter();
    const run = vi.fn();
    r.push(layer('town', [cmd('f', run)]));
    expect(r.handle('f', { repeat: true })).toBe(false);
    expect(run).not.toHaveBeenCalled();
  });

  test('a command marked repeat keeps running while its key is held, and held arrows reach onKey', () => {
    const r = new KeyRouter();
    const walk = vi.fn(), plain = vi.fn(), arrows: string[] = [];
    r.push(layer('dungeon', [{ key: 'w', label: 'Walk', repeat: true, run: walk }, cmd('c', plain)], { onKey: (k) => (k.startsWith('Arrow') ? (arrows.push(k), true) : false) }));
    expect(r.handle('w', { repeat: true })).toBe(true);
    expect(walk).toHaveBeenCalledTimes(1);
    expect(r.handle('c', { repeat: true })).toBe(false);
    expect(plain).not.toHaveBeenCalled();
    expect(r.handle('ArrowDown', { repeat: true })).toBe(true);
    expect(arrows).toEqual(['ArrowDown']);
  });

  test('ctrl, alt and meta combinations are never consumed', () => {
    const r = new KeyRouter();
    const run = vi.fn();
    r.push(layer('town', [cmd('r', run)]));
    expect(r.handle('r', { ctrl: true })).toBe(false);
    expect(r.handle('r', { alt: true })).toBe(false);
    expect(r.handle('r', { meta: true })).toBe(false);
    expect(run).not.toHaveBeenCalled();
  });

  test('while locked only Enter and Space act, by calling onSkip', () => {
    const r = new KeyRouter();
    const run = vi.fn(), skip = vi.fn();
    r.onSkip = skip;
    r.push(layer('combat', [cmd('f', run)]));
    r.locked = true;
    expect(r.handle('f')).toBe(false);
    expect(r.handle('Enter')).toBe(true);
    expect(r.handle(' ')).toBe(true);
    expect(skip).toHaveBeenCalledTimes(2);
    expect(run).not.toHaveBeenCalled();
    r.locked = false;
    expect(r.handle('f')).toBe(true);
  });
});

describe('labels', () => {
  test('labelOf gives F)ight for key f label Fight, The P)arty for key p label The party, and X) Walk when the key letter is not in the label', () => {
    expect(labelOf({ key: 'f', label: 'Fight', run: () => {} })).toBe('F)ight');
    expect(labelOf({ key: 'p', label: 'The party', run: () => {} })).toBe('The P)arty');
    expect(labelOf({ key: 'x', label: 'Walk', run: () => {} })).toBe('X) Walk');
    expect(labelOf({ key: 'Escape', label: 'Leave', run: () => {} })).toBe('Esc) Leave');
  });

  test('duplicateKeys finds a repeated letter ignoring case', () => {
    expect(duplicateKeys([cmd('f'), cmd('F'), cmd('g')])).toEqual(['f']);
    expect(duplicateKeys([cmd('f'), cmd('g')])).toEqual([]);
  });
});
