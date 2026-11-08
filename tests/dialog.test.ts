// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { KeyRouter } from '../src/render/ui/keys';
import { confirmBox, listKey, openList, promptName, rowKey } from '../src/render/ui/dialog';
import type { ListRow, ListState, UiHost } from '../src/render/ui/dialog';

const rows = (n: number, disabled: number[] = []): ListRow[] =>
  Array.from({ length: n }, (_, i) => ({ label: `row ${i}`, disabled: disabled.includes(i) }));
const st = (n: number, index = 0, disabled: number[] = []): ListState => ({ rows: rows(n, disabled), index });

function host(): UiHost {
  document.body.innerHTML = '<div id="layer"></div>';
  return { router: new KeyRouter(), layer: document.getElementById('layer')! };
}
const flush = () => new Promise((r) => setTimeout(r, 0));

beforeEach(() => { document.body.innerHTML = ''; });

describe('pure list keys', () => {
  test('rowKey maps 0..8 to 1..9 and 9 onward to letters', () => {
    expect(rowKey(0)).toBe('1');
    expect(rowKey(8)).toBe('9');
    expect(rowKey(9)).toBe('a');
    expect(rowKey(10)).toBe('b');
  });

  test('listKey: Down and Up wrap, Enter confirms the highlighted row, a row key confirms that row, Escape cancels, PageDown moves by the page size', () => {
    let r = listKey(st(3, 2), 'ArrowDown');
    expect(r.state.index).toBe(0);
    expect(r.outcome.kind).toBe('moved');
    r = listKey(st(3, 0), 'ArrowUp');
    expect(r.state.index).toBe(2);
    expect(listKey(st(3, 1), 'Enter').outcome).toEqual({ kind: 'confirm', index: 1 });
    const byKey = listKey(st(5, 0), '4');
    expect(byKey.outcome).toEqual({ kind: 'confirm', index: 3 });
    expect(byKey.state.index).toBe(3);
    expect(listKey(st(3), 'Escape').outcome.kind).toBe('cancel');
    expect(listKey(st(30, 0), 'PageDown', 8).state.index).toBe(8);
    expect(listKey(st(30, 25), 'PageDown', 8).state.index).toBe(29);
    expect(listKey(st(30, 3), 'PageUp', 8).state.index).toBe(0);
    expect(listKey(st(12), 'a').outcome).toEqual({ kind: 'confirm', index: 9 });
  });

  test('listKey ignores Enter and row keys on a disabled row', () => {
    expect(listKey(st(3, 1, [1]), 'Enter').outcome.kind).toBe('ignored');
    expect(listKey(st(3, 0, [2]), '3').outcome.kind).toBe('ignored');
    expect(listKey(st(3, 0), '9').outcome.kind).toBe('ignored'); // no such row
  });
});

describe('dialogues', () => {
  test('openList resolves the chosen index through the router, null on Escape, and calls onMove on each move', async () => {
    const h = host();
    const moves: number[] = [];
    const p = openList(h, { title: 'Buy', rows: rows(3), onMove: (i) => moves.push(i) });
    expect(h.layer.querySelectorAll('.row').length).toBe(3);
    expect(h.layer.querySelector('.row.sel')?.textContent).toContain('row 0');
    h.router.handle('ArrowDown');
    h.router.handle('ArrowDown');
    expect(moves).toEqual([1, 2]);
    h.router.handle('Enter');
    expect(await p).toBe(2);
    expect(h.layer.children.length).toBe(0);

    const q = openList(h, { title: 'Buy', rows: rows(3) });
    h.router.handle('Escape');
    expect(await q).toBeNull();
    const c = openList(h, { title: 'Buy', rows: rows(3) });
    (h.layer.querySelectorAll('.row')[1] as HTMLElement).click();
    expect(await c).toBe(1);
  });

  test('openList with no rows resolves null at once and pushes no layer', async () => {
    const h = host();
    h.router.push({ name: 'town', commands: () => [] });
    expect(await openList(h, { title: 'Nothing', rows: [] })).toBeNull();
    expect(h.router.top()?.name).toBe('town');
    expect(h.layer.children.length).toBe(0);
  });

  test('confirmBox: y is true; n, Escape and Enter are false', async () => {
    for (const [key, want] of [['y', true], ['n', false], ['Escape', false], ['Enter', false]] as const) {
      const h = host();
      const p = confirmBox(h, 'Burn the ash?');
      expect(h.layer.textContent).toContain('Burn the ash?');
      h.router.handle(key);
      expect(await p).toBe(want);
    }
  });

  test('promptName: letters including y, n, p and r are text; Backspace deletes; Enter accepts the trimmed name; Enter on an empty name does nothing; Escape gives null; length is capped at 24', async () => {
    const h = host();
    const p = promptName(h, 'Name');
    h.router.handle('Enter'); // empty: nothing happens
    expect(h.layer.children.length).toBe(1);
    for (const ch of '  Pellynr') h.router.handle(ch);
    h.router.handle('Backspace');
    expect(h.layer.textContent).toContain('Pellyn');
    h.router.handle('Enter');
    expect(await p).toBe('Pellyn');

    const q = promptName(h, 'Name');
    h.router.handle('Escape');
    expect(await q).toBeNull();

    const r = promptName(h, 'Name');
    for (let i = 0; i < 40; i++) h.router.handle('x');
    h.router.handle('Enter');
    expect(await r).toBe('x'.repeat(24));
  });

  test('a dialogue is modal: keys never reach the layer under it, and it is removed from the DOM and router when closed', async () => {
    const h = host();
    const run = vi.fn();
    h.router.push({ name: 'town', commands: () => [{ key: 'f', label: 'Forge', run }] });
    const p = openList(h, { title: 'Pick', rows: rows(2) });
    h.router.handle('f');
    expect(run).not.toHaveBeenCalled();
    h.router.handle('Escape');
    await p;
    await flush();
    expect(h.router.top()?.name).toBe('town');
    expect(h.layer.children.length).toBe(0);
    h.router.handle('f');
    expect(run).toHaveBeenCalledTimes(1);
  });
});
