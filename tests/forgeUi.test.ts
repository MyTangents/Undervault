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
const flush = () => new Promise((r) => setTimeout(r, 0));
const words = () => document.querySelector('.msgwin')?.textContent ?? '';
const scene = () => document.querySelector('.sceneextra')?.textContent ?? '';
const rows = () => [...document.querySelectorAll('.dialog .row')] as HTMLElement[];
const member = (app: Record<string, any>, i: number) => app.game.state.party.members[i];
function give(app: Record<string, any>, i: number, patch: Record<string, unknown>) {
  const p = app.game.state.party;
  app.game.state.party = { ...p, members: p.members.map((m: any, j: number) => (j === i ? { ...m, ...patch } : m)) };
}

function town(place: string, gold = 100) {
  const app = makeApp();
  press('n');
  app.game.state.party = { ...app.game.state.party, gold };
  press(place);
  return app;
}

beforeEach(() => { localStorage.clear(); TYPING.msPerChar = 0; });
afterEach(() => { TYPING.msPerChar = 14; });

describe('the forge', () => {
  test('keys 1 to 6 and Left/Right choose who', () => {
    const app = town('f');
    expect(scene()).toContain(member(app, 0).name);
    press('3');
    expect(scene()).toContain(member(app, 2).name);
    press('ArrowRight');
    expect(scene()).toContain(member(app, 3).name);
    press('ArrowLeft'); press('ArrowLeft');
    expect(scene()).toContain(member(app, 1).name);
    press('ArrowLeft'); press('ArrowLeft');
    expect(scene()).toContain(member(app, 5).name); // wraps
  });

  test('b opens the stock with prices, unaffordable rows inert; buying adds the item and takes the gold', async () => {
    const app = town('f', 10);
    press('b');
    const list = rows();
    expect(list.length).toBeGreaterThan(5);
    expect(list[0].textContent).toContain('Bread Knife');
    expect(list[0].textContent).toContain('8g');
    expect(list.some((r) => r.classList.contains('off'))).toBe(true);
    const dear = list.findIndex((r) => r.classList.contains('off'));
    press(String(dear + 1)); // inert
    expect(document.querySelector('.dialog')).not.toBeNull();
    expect(app.game.state.party.gold).toBe(10);
    press('1');
    await flush();
    expect(document.querySelector('.dialog')).toBeNull();
    expect(app.game.state.party.gold).toBe(2);
    expect(member(app, 0).inventory).toContain('bread-knife');
    expect(words()).toContain('Bought Bread Knife');
  });

  test('s lists the chosen member\'s items with sale prices and selling pays half; with an empty pack it says so', async () => {
    const app = town('f', 0);
    press('s');
    expect(document.querySelector('.dialog')).toBeNull();
    expect(words()).toMatch(/nothing/i);
    give(app, 0, { inventory: ['short-sword'] });
    press('s');
    expect(rows().length).toBe(1);
    expect(rows()[0].textContent).toContain('20g');
    press('1');
    await flush();
    expect(app.game.state.party.gold).toBe(20);
    expect(member(app, 0).inventory).toEqual([]);
    expect(words()).toContain('Sold');
  });

  test('i lists unidentified items and uses the existing Study rule; nothing to identify says so', async () => {
    const app = town('f');
    press('i');
    expect(document.querySelector('.dialog')).toBeNull();
    expect(words()).toMatch(/nothing/i);
    give(app, 0, { classId: 'shade', inventory: ['overdraft-blade'] });
    press('i');
    expect(rows().length).toBe(1);
    expect(rows()[0].textContent).toContain('Odd Sword');
    press('1');
    await flush();
    expect(app.game.state.party.identified).toContain('overdraft-blade');
    expect(words()).toContain('The Overdraft Blade');
    // a class that cannot study leaves it unidentified and says why
    const app2 = town('f');
    give(app2, 0, { inventory: ['overdraft-blade'] });
    press('i'); press('1'); await flush();
    expect(app2.game.state.party.identified ?? []).not.toContain('overdraft-blade');
    expect(words()).toMatch(/shade/i);
  });
});

describe('the party and packs', () => {
  test('the sheet shows the face, attributes, hit points, spells, techniques and slots', () => {
    const app = town('p');
    const m = member(app, 0);
    expect(document.querySelector('.townx .face canvas')?.getAttribute('data-portrait')).toBeTruthy();
    const text = scene();
    for (const a of ['STR', 'IQ', 'PIE', 'VIT', 'AGI', 'LUCK']) expect(text).toContain(a);
    expect(text).toContain(`${m.hp}/${m.maxHp}`);
    expect(text).toMatch(/Spells/);
    expect(text).toMatch(/Techniques/);
    for (const slot of ['weapon', 'armour', 'shield', 'helm', 'trinket']) expect(text).toContain(slot);
    press('2');
    expect(scene()).toContain(member(app, 1).name);
  });

  test('e equips from a list, u removes from the worn slots, s studies an item', async () => {
    const app = town('p');
    give(app, 0, { inventory: ['short-sword', 'mending-draught'] });
    press('e');
    expect(rows().length).toBe(1); // the potion cannot be worn
    expect(rows()[0].textContent).toContain('Shortsword');
    press('1'); await flush();
    expect(member(app, 0).equipped.weapon).toBe('short-sword');
    expect(member(app, 0).inventory).toEqual(['mending-draught']);
    expect(words()).toContain('equips');
    press('u');
    expect(rows().length).toBe(1);
    press('1'); await flush();
    expect(member(app, 0).equipped.weapon).toBeUndefined();
    expect(member(app, 0).inventory).toContain('short-sword');
    // nothing to equip or remove says so instead of opening an empty box
    give(app, 0, { inventory: [], equipped: {} });
    press('e'); press('u');
    expect(document.querySelector('.dialog')).toBeNull();
    // a cursed item that is worn will not come off, and the message says so
    give(app, 0, { inventory: [], equipped: { weapon: 'overdraft-blade' } });
    press('u'); press('1'); await flush();
    expect(words()).toMatch(/cursed/i);
    expect(member(app, 0).equipped.weapon).toBe('overdraft-blade');
    give(app, 0, { inventory: ['overdraft-blade'], equipped: {} });
    press('s');
    expect(rows().length).toBe(1);
    press('1'); await flush();
    expect(words()).toMatch(/shade/i);
  });
});
