// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('../src/render/hall/hall', () => ({
  NoWebGLError: class NoWebGLError extends Error {},
  Hall: class { constructor(..._a: unknown[]) {} resize() {} render() {} setSettings() {} dispose() {} },
}));
vi.spyOn(console, 'error').mockImplementation(() => {});

const { App } = await import('../src/render/ui/app');
const { TYPING } = await import('../src/render/ui/frame');

let current: { dispose(): void } | null = null;
function makeApp() {
  current?.dispose();
  document.body.innerHTML = '<div id="app"></div>';
  const app = new App(document.getElementById('app')!);
  current = app;
  app.start();
  return app as unknown as Record<string, any>;
}
const press = (key: string) => window.dispatchEvent(new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true }));
const flush = (n = 3) => new Promise<void>((r) => { let i = 0; const go = () => (++i >= n ? r() : setTimeout(go, 0)); setTimeout(go, 0); });
const printed = () => [...document.querySelectorAll('.cmdbar .cmd')].map((c) => c.textContent!);

beforeEach(() => { localStorage.clear(); TYPING.msPerChar = 0; });
afterEach(() => { TYPING.msPerChar = 14; });

describe('the Roll of the Gone and the ending', () => {
  test('the Roll of the Gone shows Corporal Moss with B)egin again, L)oad from file, T)itle, all bound', () => {
    const app = makeApp();
    app.newGame();
    app.game.state.party = { ...app.game.state.party, members: app.game.state.party.members.map((m: any) => ({ ...m, hp: 0, dead: true })) };
    app.adopt(app.game);
    expect(app.flow.screen).toBe('gameover');
    expect(document.querySelector('canvas[data-portrait="moss"]')).not.toBeNull();
    expect(printed()).toEqual(['B)egin again', 'L)oad from file', 'T)itle']);
    const keys = (app.currentCommands() as { key: string }[]).map((c) => c.key);
    expect(keys).toEqual(['b', 'l', 't']);
    press('x'); // anything else is ignored
    expect(app.flow.screen).toBe('gameover');
    press('t');
    expect(app.flow.screen).toBe('title');
  });

  test('B)egin again starts a new game in the town', () => {
    const app = makeApp();
    app.newGame();
    app.game.state.party = { ...app.game.state.party, members: app.game.state.party.members.map((m: any) => ({ ...m, hp: 0, dead: true })) };
    app.adopt(app.game);
    press('b');
    expect(app.flow.screen).toBe('town');
    expect(app.game.isOver()).toBe(false);
  });

  test('the ending offers B)ack to Crowhithe, S)ave to file, T)itle and ignores other keys', () => {
    const app = makeApp();
    app.newGame();
    app.dispatch({ type: 'enterDungeon' });
    app.dispatch({ type: 'ending' });
    expect(app.flow.screen).toBe('ending');
    expect(printed()).toEqual(['B)ack to Crowhithe', 'S)ave to file', 'T)itle']);
    expect((app.currentCommands() as { key: string }[]).map((c) => c.key)).toEqual(['b', 's', 't']);
    press('z'); press('e');
    expect(app.flow.screen).toBe('ending');
    press('b');
    expect(app.flow.screen).toBe('town');
  });

  test('a keyboard-only run: n, t, r, Enter (hire), Escape, then e enters the dungeon', async () => {
    const app = makeApp();
    press('n');
    // a party with room for one more
    const p = app.game.state.party;
    app.game.state.party = { ...p, members: p.members.slice(0, 5) };
    press('t');
    press('r');
    press('Enter');
    await flush();
    expect(app.game.state.party.members.length).toBe(6);
    press('Escape'); // leave the tavern
    expect(app.townPlace).toBe('menu');
    press('e');
    await flush();
    expect(app.flow.screen).toBe('dungeon');
  });
});
