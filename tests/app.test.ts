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

function makeApp() {
  document.body.innerHTML = '<div id="app"></div>';
  const app = new App(document.getElementById('app')!);
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
