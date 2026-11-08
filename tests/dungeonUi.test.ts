// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { paletteFor } from '../src/render/hall/palettes';

const state = vi.hoisted(() => ({ fail: false }));
vi.mock('../src/render/hall/hall', () => {
  class NoWebGLError extends Error {}
  return {
    NoWebGLError,
    Hall: class {
      constructor(..._a: unknown[]) { if (state.fail) throw new NoWebGLError('This browser could not start the dungeon view.'); }
      resize() {} render() {} setSettings() {} dispose() {}
    },
  };
});
vi.spyOn(console, 'error').mockImplementation(() => {});

const { App } = await import('../src/render/ui/app');
const { TYPING } = await import('../src/render/ui/frame');

let current: { dispose(): void } | null = null;
const flush = (n = 3) => new Promise<void>((r) => { let i = 0; const go = () => (++i >= n ? r() : setTimeout(go, 0)); setTimeout(go, 0); });
const press = (key: string, init: KeyboardEventInit = {}) => {
  const e = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true, ...init });
  window.dispatchEvent(e);
  return e;
};
const rows = () => [...document.querySelectorAll('.dialog .row')].map((r) => r.textContent!);
const words = () => document.querySelector('.msgwin')?.textContent ?? '';
const names = (a: Record<string, any>) => a.game.state.party.members.map((m: any) => m.name);

async function dungeon() {
  current?.dispose();
  document.body.innerHTML = '<div id="app"></div>';
  const app = new App(document.getElementById('app')!);
  current = app;
  app.start();
  const a = app as unknown as Record<string, any>;
  a.newGame();
  a.enterDungeon();
  await flush();
  return a;
}

beforeEach(() => { localStorage.clear(); state.fail = false; TYPING.msPerChar = 0; });
afterEach(() => { TYPING.msPerChar = 14; });

describe('the dungeon screen', () => {
  test('the layout has a framed view, a map, a message window, a text roster and the printed commands', async () => {
    const a = await dungeon();
    expect(a.flow.screen).toBe('dungeon');
    expect(document.querySelector('.viewframe canvas.gl')).not.toBeNull();
    expect(document.querySelector('.dungeon2 canvas.map')).not.toBeNull();
    expect(document.querySelector('.msgwin')).not.toBeNull();
    expect(document.querySelectorAll('.roster .rrow').length).toBe(6);
    expect(document.body.textContent).toContain('C)amp');
    expect(document.body.textContent).toMatch(/W\/S walk/);
  });

  test('the dungeon roster has no canvas and the on-screen movement pad is still present', async () => {
    await dungeon();
    expect(document.querySelectorAll('.roster canvas').length).toBe(0);
    for (const title of ['Forward', 'Back', 'Turn left', 'Turn right', 'Sidestep left', 'Sidestep right', 'Climb stairs', 'Descend stairs']) {
      expect(document.querySelector(`.pad button[title="${title}"]`), title).not.toBeNull();
    }
  });

  test('the movement keys still reach the controller, and a held key keeps walking', async () => {
    const a = await dungeon();
    const spy = vi.spyOn(a.controller, 'command');
    press('w');
    press('w', { repeat: true });
    press('ArrowLeft');
    expect(spy.mock.calls.map((c) => c[0])).toEqual(['fwd', 'fwd', 'turnLeft']);
    press('x');
    press('[');
  });

  test('app.say writes into the dungeon message window and the old toast element is no longer created', async () => {
    const a = await dungeon();
    a.say('A draught from nowhere.');
    expect(words()).toContain('A draught from nowhere.');
    a.toast('Saved somewhere.');
    expect(words()).toContain('Saved somewhere.');
    expect(document.querySelector('.toast')).toBeNull();
  });

  test('when the 3D view cannot start, the notice goes to the message window', async () => {
    state.fail = true;
    await dungeon();
    expect(words()).toContain('could not start the dungeon view');
    expect(document.querySelector('.toast')).toBeNull();
  });

  test('the dungeon frame accent follows the current area palette', async () => {
    const a = await dungeon();
    const here = a.game.level().areaOf(a.game.state.pos);
    const style = document.querySelector('.viewframe')!.getAttribute('style')!;
    expect(style).toContain(paletteFor(here).edge);
  });

  test('Esc opens the same system dialogue as the town', async () => {
    await dungeon();
    press('Escape');
    expect(rows().map((r) => r.slice(1, 3))).toEqual(['S)', 'L)', 'O)', 'Q)']);
    press('Escape');
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
  });
});

describe('the camp', () => {
  test('in the dungeon c opens the camp list with five rows (Inspect, Reorder, Save, Options, Leave) and Escape closes, even when the 3D view could not start', async () => {
    state.fail = true;
    await dungeon();
    press('c');
    expect(rows().map((r) => r.slice(1, 3))).toEqual(['I)', 'R)', 'S)', 'O)', 'L)']);
    press('Escape');
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
    press('c');
    press('l');
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
  });

  test('camp Reorder moves a member with Up and Down, Enter commits it and Escape restores the order', async () => {
    const a = await dungeon();
    const before = names(a);
    press('c'); press('r'); await flush();
    press('2'); await flush(); // Gudrun
    press('ArrowDown'); press('ArrowDown');
    press('Enter'); await flush();
    expect(names(a)).toEqual([before[0], before[2], before[3], before[1], before[4], before[5]]);
    expect(words()).toContain(before[1]);
    // back in the camp list; leave, then try again and cancel
    press('Escape'); await flush();
    const mid = names(a);
    press('c'); press('r'); await flush();
    press('1'); await flush();
    press('ArrowDown'); press('Escape'); await flush();
    expect(names(a)).toEqual(mid);
    press('Escape'); await flush();
    expect(document.querySelector('.dialog')).toBeNull();
  });

  test('Inspect shows a member sheet and changes nothing in the party', async () => {
    const a = await dungeon();
    const before = JSON.stringify(a.game.state.party);
    press('c'); press('i'); await flush();
    expect(rows().length).toBe(6);
    press('3'); await flush();
    const sheet = document.querySelector('.dialog.sheet')!;
    expect(sheet).not.toBeNull();
    expect(sheet.textContent).toContain(a.game.state.party.members[2].name);
    for (const k of ['STR', 'Spells', 'Techniques', 'weapon']) expect(sheet.textContent).toContain(k);
    expect(sheet.querySelector('canvas')).toBeNull();
    press('Escape'); await flush();
    press('Escape'); await flush(); // out of the member list
    press('Escape'); await flush(); // out of the camp
    expect(document.querySelector('.dialog')).toBeNull();
    expect(JSON.stringify(a.game.state.party)).toBe(before);
  });
});
