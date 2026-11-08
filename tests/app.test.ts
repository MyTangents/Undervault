// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createRng } from '../src/core/rng';
import { Game } from '../src/core/game';
import { demoParty } from '../src/core/sim';

// The real Hall needs WebGL. A stand-in lets the app's lifecycle be tested: which levels get a view, and whether old views are dropped.
const halls: { level: { id: string }; disposed: boolean }[] = [];
vi.mock('../src/render/hall/hall', () => ({
  NoWebGLError: class NoWebGLError extends Error {},
  Hall: class {
    disposed = false;
    constructor(_c: unknown, public level: { id: string }) { halls.push(this); }
    resize() {} render() {} setSettings() {}
    dispose() { this.disposed = true; }
  },
}));

const { App } = await import('../src/render/ui/app');
const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
const tick = async () => { await frame(); await frame(); };

let current: { dispose(): void } | null = null;
function makeApp() {
  current?.dispose();
  document.body.innerHTML = '<div id="app"></div>';
  const app = new App(document.getElementById('app')!);
  current = app;
  app.start();
  return app as unknown as Record<string, any>;
}

beforeEach(() => { halls.length = 0; localStorage.clear(); });

describe('App lifecycle (review fixes)', () => {
  test('loading a game from another level drops the old dungeon view and builds one for the new level', async () => {
    const app = makeApp();
    app.newGame(); app.enterDungeon(); await tick();
    expect(halls.at(-1)!.level.id).toBe('crypt');
    const first = halls.at(-1)!;
    const other = Game.newGame(demoParty(), createRng(7));
    other.enterLevel('deep', { x: 10, y: 2, z: 3, facing: 2 });
    app.adopt(other); await tick();
    expect(first.disposed).toBe(true);
    expect(halls.at(-1)!.level.id).toBe('deep');
    expect(app.controller.pos).toEqual({ x: 10, y: 2, z: 3 });
  });

  test('loading a wiped party goes to the Roll of the Gone, never to a dead dungeon', async () => {
    const app = makeApp();
    const g = Game.newGame(demoParty(), createRng(3));
    g.state.party = { ...g.state.party, members: g.state.party.members.map((m) => ({ ...m, hp: 0, dead: true })) };
    app.adopt(g); await tick();
    expect(app.flow.screen).toBe('gameover');
  });

  test('a save naming an unknown level shows a message and leaves the screen alone', async () => {
    const app = makeApp();
    const data = Game.newGame(demoParty(), createRng(1)).toSave();
    data.position.levelId = 'a-level-from-the-future';
    const before = app.flow.screen;
    expect(() => app.tryLoad(data)).not.toThrow();
    expect(app.flow.screen).toBe(before);
    expect(document.querySelector('.toast')?.textContent).toMatch(/level|save/i);
  });

  test('a wiped party cannot be taken down from town', async () => {
    const app = makeApp();
    app.newGame();
    app.game.state.party = { ...app.game.state.party, members: app.game.state.party.members.map((m: any) => ({ ...m, hp: 0, dead: true })) };
    app.enterDungeon(); await tick();
    expect(app.flow.screen).toBe('town');
    expect(app.townMsg).toMatch(/alive|dead|nobody/i);
  });
});

/* ------------------------------------------------------ keyboard-driven title and options (Task 8) */
const press = (key: string, init: KeyboardEventInit = {}) => {
  const e = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true, ...init });
  window.dispatchEvent(e);
  return e;
};
const printed = () => [...document.querySelectorAll('.cmdbar .cmd')].map((c) => c.textContent);

describe('the title by keyboard', () => {
  test('the title prints N)ew game, C)ontinue, L)oad from file, S)ettings, each bound, with no duplicate letter', () => {
    const app = makeApp();
    const cmds = app.currentCommands() as { key: string; label: string }[];
    expect(cmds.map((c) => c.key)).toEqual(['n', 'c', 'l', 's']);
    expect(printed()).toEqual(['N)ew game', 'C)ontinue', 'L)oad from file', 'S)ettings']);
    expect(new Set(cmds.map((c) => c.key)).size).toBe(cmds.length);
  });

  test('C)ontinue is dimmed and inert without a save', () => {
    const app = makeApp();
    const cont = [...document.querySelectorAll('.cmdbar .cmd')].find((c) => c.textContent === 'C)ontinue')!;
    expect(cont.classList.contains('off')).toBe(true);
    press('c');
    expect(app.flow.screen).toBe('title');
  });

  test('pressing n starts a new game in the town', () => {
    const app = makeApp();
    press('n');
    expect(app.flow.screen).toBe('town');
    expect(app.game).not.toBeNull();
  });

  test('the first key press dismisses the content notice and a Ctrl+R is not consumed', () => {
    makeApp();
    expect(document.querySelector('.notice')).not.toBeNull();
    const reload = press('r', { ctrlKey: true });
    expect(reload.defaultPrevented).toBe(false);
    expect(document.querySelector('.notice')).toBeNull();
    const plain = press('q');
    expect(plain.defaultPrevented).toBe(false); // an unbound key is left to the browser
  });

  test('a held key does nothing extra', () => {
    const app = makeApp();
    press('n', { repeat: true });
    expect(app.flow.screen).toBe('title');
  });
});

describe('Options', () => {
  const open = () => { const app = makeApp(); press('s'); return app; };
  const stored = () => JSON.parse(localStorage.getItem('undervault.settings') ?? '{}');

  test('Options: Down selects a setting, Right adjusts a slider and the value is stored, Escape closes', () => {
    open();
    expect(document.querySelector('.dialog')).not.toBeNull();
    press('ArrowDown');
    press('ArrowRight');
    expect(stored().flicker).toBeCloseTo(1.05, 5);
    press('ArrowLeft');
    press('ArrowLeft');
    expect(stored().flicker).toBeCloseTo(0.95, 5);
    press('Escape');
    expect(document.querySelector('.dialog')).toBeNull();
  });

  test('Quality and Automap flip with Enter', () => {
    open();
    for (let i = 0; i < 4; i++) press('ArrowDown'); // Quality
    press('Enter');
    expect(stored().quality).toBe('low');
    press('ArrowDown'); // Automap
    press('Enter');
    expect(stored().automap).toBe('off');
    press('Escape');
  });

  test('Screen glow cycles off, low, normal and sets the data attribute', () => {
    open();
    for (let i = 0; i < 6; i++) press('ArrowDown'); // Screen glow
    expect(document.documentElement.dataset.glow ?? 'low').toBe('low');
    press('Enter');
    expect(document.documentElement.dataset.glow).toBe('normal');
    press('Enter');
    expect(document.documentElement.dataset.glow).toBe('off');
    press('Enter');
    expect(document.documentElement.dataset.glow).toBe('low');
    expect(localStorage.getItem('undervault.glow')).toBe('low');
    press('Escape');
  });

  test('Escape in the town opens the system dialogue with S)ave, L)oad, O)ptions, Q)uit; Q returns to the title', async () => {
    const app = makeApp();
    press('n');
    press('Escape');
    const rows = [...document.querySelectorAll('.dialog .row')].map((r) => r.textContent);
    expect(rows.map((r) => r!.slice(1, 3))).toEqual(['S)', 'L)', 'O)', 'Q)']);
    press('q');
    await new Promise((r) => setTimeout(r, 0));
    expect(app.flow.screen).toBe('title');
    expect(document.querySelector('.dialog')).toBeNull();
  });
});
