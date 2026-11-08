// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { TALES } from '../src/core/data';
import { personByName } from '../src/render/portrait/people';

vi.mock('../src/render/hall/hall', () => ({
  NoWebGLError: class NoWebGLError extends Error {},
  Hall: class { constructor(..._a: unknown[]) {} resize() {} render() {} setSettings() {} dispose() {} },
}));
vi.spyOn(console, 'error').mockImplementation(() => {}); // jsdom has no canvas: its "not implemented" noise is not the point

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
const press = (key: string, init: KeyboardEventInit = {}) => {
  const e = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true, ...init });
  window.dispatchEvent(e);
  return e;
};
const flush = () => new Promise((r) => setTimeout(r, 0));
const printed = () => [...document.querySelectorAll('.cmdbar .cmd')].map((c) => c.textContent!);
const words = () => document.querySelector('.msgwin')?.textContent ?? '';
const face = () => document.querySelector('.townx .face canvas')?.getAttribute('data-portrait');
const townApp = () => { const app = makeApp(); press('n'); return app; };

beforeEach(() => { localStorage.clear(); TYPING.msPerChar = 0; });
afterEach(() => { TYPING.msPerChar = 14; });

describe('the town menu', () => {
  test('the town prints one command per place plus P)arty and E)nter, all bound, no duplicate letter', () => {
    const app = townApp();
    const cmds = app.currentCommands() as { key: string; hidden?: boolean }[];
    expect(cmds.filter((c) => c.key.length === 1).map((c) => c.key)).toEqual(['t', 'f', 'h', 'i', 'm', 'l', 'p', 'e']);
    expect(new Set(cmds.map((c) => c.key)).size).toBe(cmds.length);
    expect(printed()).toEqual(['T)avern', 'F)orge', 'H)ouse of Ash', 'I)nn', "M)aud's", 'L)amp and Lung', 'P)arty and packs', 'E)nter the Undervault', 'Esc) System']);
  });

  test("each place shows its keeper's portrait and the place's printed commands equal its bound keys", () => {
    const app = townApp();
    const keepers: [string, string][] = [['t', 'dennis'], ['f', 'hobb'], ['h', 'ottoline'], ['i', 'wenna'], ['m', 'maud'], ['l', 'tamsin']];
    for (const [key, who] of keepers) {
      press(key);
      expect(app.townPlace).not.toBe('menu');
      expect(face(), key).toBe(who);
      const bound = (app.currentCommands() as { key: string; hidden?: boolean }[]).filter((c) => !c.hidden);
      expect(printed().length).toBe(bound.length);
      expect(new Set(bound.map((c) => c.key.toLowerCase())).size).toBe(bound.length);
      press('Escape');
      expect(app.townPlace).toBe('menu');
    }
  });

  test('L)eave and Escape return to the town menu', () => {
    const app = townApp();
    press('i');
    press('Escape');
    expect(app.townPlace).toBe('menu');
    press('m');
    press('l');
    expect(app.townPlace).toBe('menu');
  });

  test('the roster strip in town shows a face thumbnail per member', () => {
    const app = townApp();
    expect(document.querySelectorAll('.roster .rrow canvas').length).toBe(app.game.state.party.members.length);
  });

  test('E)nter with a wiped party says why in the message window and stays in town', () => {
    const app = townApp();
    app.game.state.party = { ...app.game.state.party, members: app.game.state.party.members.map((m: any) => ({ ...m, hp: 0, dead: true })) };
    press('e');
    expect(app.flow.screen).toBe('town');
    expect(words()).toMatch(/alive|dead|nobody/i);
  });
});

describe("Maud's and the Lamp", () => {
  test('Maud: a prints the information lines into the message window', () => {
    townApp();
    press('m');
    press('a');
    expect(words()).toContain('Light is everything');
  });

  test('Lamp: h prints a tale with its speaker and switches the portrait to the speaker; after all 12 tales it says so', async () => {
    const app = townApp();
    press('l');
    expect(face()).toBe('tamsin');
    press('h');
    await flush();
    const speaker = /— (.+)$/m.exec(words())?.[1];
    expect(speaker).toBeTruthy();
    expect(face()).toBe(personByName(speaker!));
    app.game.state.party = { ...app.game.state.party, heardTales: TALES.map((t) => t.id) };
    press('h');
    await flush();
    expect(words()).toContain('run out of stories');
    expect(face()).toBe('tamsin');
  });
});

describe('the Inn and the House of Ash', () => {
  test('Inn: r opens the room list with prices; choosing the proper room heals, charges the gold and says so; rooms the party cannot afford are inert', async () => {
    const app = townApp();
    const party = app.game.state.party;
    app.game.state.party = { ...party, gold: 35, members: party.members.map((m: any, i: number) => (i === 0 ? { ...m, hp: 1 } : m)) };
    press('i');
    press('r');
    const rows = [...document.querySelectorAll('.dialog .row')];
    expect(rows.length).toBe(4);
    expect(rows[2].textContent).toContain('30g');
    expect(rows[3].classList.contains('off')).toBe(true);
    press('4'); // the suite is 80g: inert
    expect(document.querySelector('.dialog')).not.toBeNull();
    press('3');
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
    expect(app.game.state.party.gold).toBe(5);
    expect(app.game.state.party.members[0].hp).toBe(app.game.state.party.members[0].maxHp);
    expect(words()).toMatch(/slept/i);
  });

  test("House of Ash with nobody fallen opens no dialogue and says Sister Ottoline's line", () => {
    townApp();
    press('h');
    press('r');
    expect(document.querySelector('.dialog')).toBeNull();
    expect(words()).toContain('Sister Ottoline');
  });

  test('House of Ash with a fallen member: r lists them with costs; an ash rite asks y/n first; n spends nothing', async () => {
    const app = townApp();
    const party = app.game.state.party;
    app.game.state.party = {
      ...party, gold: 1000,
      members: party.members.map((m: any, i: number) => (i === 0 ? { ...m, hp: 0, dead: true } : i === 1 ? { ...m, hp: 0, dead: true, ash: true } : m)),
    };
    press('h');
    press('r');
    const rows = [...document.querySelectorAll('.dialog .row')];
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('100g');
    expect(rows[1].textContent).toContain('300g');
    press('2'); // the ash member
    await flush();
    expect(document.querySelector('.dialog.confirm')).not.toBeNull();
    press('n');
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
    expect(app.game.state.party.gold).toBe(1000);
    expect(app.game.state.party.members[1].ash).toBe(true);
  });
});
