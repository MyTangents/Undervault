import type { App } from './app';
import { h } from './dom';
import { className, memberCard, partyPanel, raceName } from './party';
import { createRng } from '../../core/rng';
import { ATTRS, type Alignment, type Attr, type Character, type Stats } from '../../core/types';
import { CLASSES, ITEMS, RACES } from '../../core/data';
import { addToParty, createCharacter, eligibleClasses, rollBonusPool, setRow } from '../../core/party';
import { PLACES, SHOP, informant, raise, recruits, tale } from '../../core/town';
import { buy, displayName, equip, identifyItem, sell, unequip, visibleStock } from '../../core/items';
import { renderChronicle } from '../../core/chronicle';

const ZERO: Stats = { str: 0, iq: 0, pie: 0, vit: 0, agi: 0, luck: 0 };
const ATTR_LABEL: Record<Attr, string> = { str: 'Strength', iq: 'Intellect', pie: 'Piety', vit: 'Vitality', agi: 'Agility', luck: 'Luck' };

export function townScreen(app: App): HTMLElement {
  const g = app.game!;
  const s = g.state;
  const place = PLACES.find((p) => p.id === app.townPlace) ?? PLACES[0];
  const body = h('div', { class: 'panel main stack' });

  const inParty = app.townPlace === 'party';
  body.append(h('h3', null, inParty ? 'The Party and its Packs' : place.name), h('div', { class: 'dim' }, inParty ? 'Who is wearing what, and who is carrying whose lunch.' : place.blurb));
  if (app.townMsg) body.append(h('div', { class: app.townMsgBad ? 'bad' : 'good' }, app.townMsg));
  body.append(placeBody(app));

  const nav = h('div', { class: 'nav' },
    ...PLACES.map((p) => h('button', { class: p.id === place.id && !inParty ? 'here' : '', onclick: () => { app.townPlace = p.id; app.townMsg = ''; app.refresh(); } }, p.name)),
    h('button', { class: app.townPlace === 'party' ? 'here' : '', onclick: () => { app.townPlace = 'party'; app.townMsg = ''; app.refresh(); } }, 'The Party and its Packs'),
    h('div', { style: 'height:.6rem' }),
    h('button', { onclick: () => app.enterDungeon() }, 'Enter the Undervault ▾'),
    h('button', { class: 'quiet', onclick: () => app.saveToFile() }, 'Save to file'),
    h('button', { class: 'quiet', onclick: () => void app.loadFromFile() }, 'Load from file'),
    h('button', { class: 'quiet', onclick: () => app.dispatch({ type: 'openSettings' }) }, 'Settings'),
  );

  const side = h('div', { class: 'side stack' },
    partyPanel(s.party, (m) => { app.selectedId = m.id; app.townPlace = 'party'; app.refresh(); }, app.selectedId ?? undefined),
    h('div', { class: 'panel' }, h('h3', null, 'Chronicle'), h('div', { class: 'chron', style: 'max-height:12rem' },
      ...renderChronicle(s.chronicle, 6).map((l) => h('div', null, l)))),
  );

  return h('div', { class: 'screen town' },
    h('div', { class: 'top' },
      h('h2', null, 'Crowhithe'),
      h('span', { class: 'mono dim' }, `Day ${s.day} · ${s.party.gold} gold`)),
    h('div', { class: 'body' }, nav, body, side),
  );

  function placeBody(a: App): HTMLElement {
    switch (a.townPlace) {
      case 'tavern': return tavern(a);
      case 'smith': return forge(a);
      case 'temple': return temple(a);
      case 'inn': return inn(a);
      case 'informant': return informantPlace(a);
      case 'tales': return tales(a);
      case 'party': return partyView(a);
      default: return tavern(a);
    }
  }
}
function attempt(app: App, fn: () => string | void, ok = ''): void {
  try { const m = fn(); app.townMsg = typeof m === 'string' ? m : ok; app.townMsgBad = false; }
  catch (e) { app.townMsg = e instanceof Error ? e.message : String(e); app.townMsgBad = true; }
  app.refresh();
}

/* ------------------------------------------------------------------ tavern */
function tavern(app: App): HTMLElement {
  const g = app.game!;
  const party = g.state.party;
  const pool = createRng(g.state.day * 977 + 1);
  const waiting = recruits(g.state.day, pool, party).filter((c) => !app.recruited.has(c.id));
  const root = h('div', { class: 'stack' });

  root.append(h('div', null, 'Six is a full party. Good and evil will not share a table.'));
  root.append(h('h3', null, 'Waiting for work'));
  if (waiting.length === 0) root.append(h('div', { class: 'dim' }, 'Nobody is waiting. Come back tomorrow.'));
  const tbl = h('table', { class: 'tbl' });
  for (const c of waiting) {
    tbl.append(h('tr', null,
      h('td', null, h('b', null, c.name)),
      h('td', null, `${raceName(c.raceId)} ${className(c.classId)}`),
      h('td', { class: 'dim' }, c.alignment),
      h('td', { class: 'mono' }, `${c.maxHp} hp`),
      h('td', null, h('button', {
        disabled: party.members.length >= 6,
        onclick: () => attempt(app, () => { g.state.party = addToParty(party, c); app.recruited.add(c.id); }, `${c.name} joins you.`),
      }, 'Recruit'))));
  }
  root.append(tbl);

  root.append(h('h3', null, 'Your party'));
  const mine = h('table', { class: 'tbl' });
  party.members.forEach((m, i) => mine.append(h('tr', null,
    h('td', null, h('b', null, m.name)), h('td', null, `${className(m.classId)} · ${m.row}`),
    h('td', null,
      h('button', { class: 'quiet', onclick: () => attempt(app, () => { g.state.party = setRow(party, m.id, m.row === 'front' ? 'back' : 'front'); }) }, 'Swap row'),
      ' ',
      h('button', { class: 'quiet', onclick: () => attempt(app, () => { g.state.party = { ...party, members: party.members.filter((x) => x.id !== m.id) }; }, `${m.name} leaves.`) }, 'Dismiss')),
    h('td', { class: 'dim' }, `#${i + 1}`))));
  root.append(mine);

  root.append(h('h3', null, 'Make someone new'));
  root.append(creator(app));
  return root;
}

function creator(app: App): HTMLElement {
  const g = app.game!;
  if (!app.creator) app.creator = { pool: rollBonusPool(createRng(Date.now() & 0xffff)), alloc: { ...ZERO }, name: '', raceId: 'human', alignment: 'neutral' };
  const c = app.creator;
  const race = RACES.find((r) => r.id === c.raceId)!;
  const stats = {} as Stats;
  for (const a of ATTRS) stats[a] = race.base[a] + c.alloc[a];
  const left = c.pool - ATTRS.reduce((n, a) => n + c.alloc[a], 0);
  const eligible = eligibleClasses(stats, c.alignment);
  if (!c.classId || !eligible.includes(c.classId)) c.classId = eligible[0];

  const row = (a: Attr) => h('tr', null,
    h('td', null, ATTR_LABEL[a]),
    h('td', null, h('button', { class: 'quiet', disabled: c.alloc[a] <= 0, onclick: () => { c.alloc[a]--; app.refresh(); } }, '−')),
    h('td', { class: 'mono' }, String(stats[a])),
    h('td', null, h('button', { class: 'quiet', disabled: left <= 0 || stats[a] >= 18, onclick: () => { c.alloc[a]++; app.refresh(); } }, '+')));

  return h('div', { class: 'stack' },
    h('div', { class: 'row' },
      h('input', { type: 'text', placeholder: 'Name', value: c.name, oninput: (e: Event) => { c.name = (e.target as HTMLInputElement).value; } }),
      h('select', { onchange: (e: Event) => { c.raceId = (e.target as HTMLSelectElement).value; c.alloc = { ...ZERO }; app.refresh(); } },
        ...RACES.map((r) => h('option', { value: r.id, selected: r.id === c.raceId }, r.name))),
      h('select', { onchange: (e: Event) => { c.alignment = (e.target as HTMLSelectElement).value as Alignment; app.refresh(); } },
        ...(['good', 'neutral', 'evil'] as const).map((a) => h('option', { value: a, selected: a === c.alignment }, a)))),
    h('div', { class: 'mono' }, `Bonus points left: ${left} of ${c.pool}`),
    h('table', { class: 'tbl', style: 'width:auto' }, ...ATTRS.map(row)),
    h('div', null, 'Classes open to these scores: ',
      ...(eligible.length === 0 ? [h('i', { class: 'bad' }, 'none yet')] : eligible.map((id) => h('label', { style: 'margin-right:.8em;cursor:pointer' },
        h('input', { type: 'radio', name: 'cls', checked: id === c.classId, onchange: () => { c.classId = id; } }), ' ', className(id))))),
    h('div', { class: 'row' },
      h('button', {
        disabled: !c.name.trim() || !c.classId || g.state.party.members.length >= 6,
        onclick: () => attempt(app, () => {
          const made = createCharacter({ name: c.name.trim(), raceId: c.raceId, classId: c.classId!, alignment: c.alignment, pool: c.pool }, c.alloc, createRng(Date.now() & 0xffffff));
          g.state.party = addToParty(g.state.party, made);
          app.creator = null;
        }, `${c.name.trim()} joins you.`),
      }, 'Sign them on'),
      h('button', { class: 'quiet', onclick: () => { app.creator = null; app.refresh(); } }, 'Re-roll the bonus points')));
}

/* ------------------------------------------------------------------- forge */
function forge(app: App): HTMLElement {
  const g = app.game!;
  const party = g.state.party;
  const buyerId = app.selectedId && party.members.some((m) => m.id === app.selectedId) ? app.selectedId : party.members[0]?.id;
  const root = h('div', { class: 'stack' });
  if (party.members.length === 0) return h('div', { class: 'dim' }, 'Nobody to sell to.');
  root.append(h('div', { class: 'row' }, 'Buying for ',
    h('select', { onchange: (e: Event) => { app.selectedId = (e.target as HTMLSelectElement).value; app.refresh(); } },
      ...party.members.map((m) => h('option', { value: m.id, selected: m.id === buyerId }, m.name)))));
  const tbl = h('table', { class: 'tbl' });
  for (const it of visibleStock(party, SHOP)) {
    const detail = it.damage ? `damage ${it.damage[0]}d${it.damage[1]}` : it.ac ? `armour +${it.ac}` : it.spellId ? 'restores health' : '';
    tbl.append(h('tr', null,
      h('td', null, h('b', null, it.name)), h('td', { class: 'dim' }, detail), h('td', { class: 'mono' }, `${it.price}g`),
      h('td', null, h('button', { disabled: party.gold < it.price, onclick: () => attempt(app, () => { g.state.party = buy(party, it.id, SHOP, buyerId!); }, `Bought ${it.name}.`) }, 'Buy'))));
  }
  root.append(tbl);
  return root;
}

/* ------------------------------------------------------------------ temple */
function temple(app: App): HTMLElement {
  const g = app.game!;
  const party = g.state.party;
  const fallen = party.members.filter((m) => m.dead || m.ash);
  const root = h('div', { class: 'stack' });
  if (fallen.length === 0) root.append(h('div', null, 'Sister Ottoline weighs an urn that is not yours. "Light," she says, and does not explain.'));
  for (const m of fallen) {
    const cost = Math.max(100, m.level * 100) * (m.ash ? 3 : 1);
    root.append(h('div', { class: 'row' },
      h('b', null, m.name), h('span', { class: 'dim grow' }, m.ash ? 'ash. Only the costly rite can try.' : 'dead. The ordinary rite will try.'),
      h('button', {
        disabled: party.gold < cost,
        onclick: () => attempt(app, () => {
          const before = g.state.party.members.find((x) => x.id === m.id)!;
          const rng = createRng(Date.now() & 0xffffff);
          const after = raise(g.state.party, m.id, rng, m.ash ? 2 : 1);
          g.state.party = after;
          const now = after.members.find((x) => x.id === m.id);
          if (!now) return `${before.name} is gone for good. Sister Ottoline wept, and was told not to.`;
          if (now.ash) return `The rite failed, and ${before.name} came back as ash. It is the receipt.`;
          if (now.dead) return `The rite failed. ${before.name} stays dead, and you are ${cost} gold lighter.`;
          return `${before.name} breathes. The ash was warm. They say it counts.`;
        }),
      }, `${m.ash ? 'Ash rite' : 'Raise'} (${cost}g)`)));
  }
  return root;
}

/* ------------------------------------------------------------------- inn */
function inn(app: App): HTMLElement {
  const g = app.game!;
  const rooms: [string, string, number][] = [
    ['The stable', 'Free. Heals nothing. Levelling still happens in your sleep.', 0],
    ['A cot', 'Half the wounds, no rest for spells.', 1],
    ['A proper room', 'Everything mended, every spell restored.', 2],
    ['The suite', 'As above, and the curses sleep it off.', 3],
  ];
  const costs = [0, 10, 30, 80];
  const root = h('div', { class: 'stack' });
  root.append(h('div', null, 'Anyone with enough experience levels up when they sleep.'));
  rooms.forEach(([name, desc, tier]) => root.append(h('div', { class: 'row' },
    h('b', { style: 'width:9rem' }, name), h('span', { class: 'dim grow' }, desc),
    h('button', {
      disabled: g.state.party.gold < costs[tier],
      onclick: () => attempt(app, () => {
        const r = g.restAtInn(tier);
        app.autosave();
        return r.leveled.length ? `${r.leveled.join(', ')} grew stronger in the night.` : 'You slept. Nobody died.';
      }),
    }, `${costs[tier]}g`))));
  return root;
}

/* -------------------------------------------------------------- informant */
function informantPlace(app: App): HTMLElement {
  const g = app.game!;
  return h('div', { class: 'stack' },
    h('div', null, 'Today\'s change:'),
    ...informant(g.state.party).map((l) => h('div', { class: 'tale' }, l)));
}

/* ------------------------------------------------------------------ tales */
function tales(app: App): HTMLElement {
  const g = app.game!;
  const root = h('div', { class: 'stack' });
  root.append(h('button', {
    onclick: () => {
      const r = tale(g.state.party, createRng(Date.now() & 0xffffff));
      g.state.party = r.party;
      app.lastTale = r.tale;
      app.refresh();
    },
  }, 'Buy a round and hear a tale'));
  if (app.lastTale) {
    const t = app.lastTale;
    root.append(h('div', { class: `tale tone-${t.tone}` }, t.text, h('div', { class: 'dim', style: 'font-style:normal;margin-top:.3em' }, `— ${t.speaker}`)));
  } else if (g.state.party.heardTales && g.state.party.heardTales.length >= 12) {
    root.append(h('div', { class: 'dim' }, 'Tamsin has run out of stories for you. She says so, and then tells one anyway.'));
  }
  return root;
}

/* ------------------------------------------------------------ party & packs */
function partyView(app: App): HTMLElement {
  const g = app.game!;
  const party = g.state.party;
  const sel = party.members.find((m) => m.id === app.selectedId) ?? party.members[0];
  const root = h('div', { class: 'stack' });
  if (!sel) return h('div', { class: 'dim' }, 'Nobody to look at.');
  root.append(h('div', { class: 'row' }, ...party.members.map((m) =>
    h('button', { class: m.id === sel.id ? '' : 'quiet', onclick: () => { app.selectedId = m.id; app.refresh(); } }, m.name))));
  root.append(memberCard(sel));
  root.append(h('div', { class: 'mono' }, ATTRS.map((a) => `${a.toUpperCase()} ${sel.stats[a]}`).join('  ')));
  root.append(h('div', { class: 'dim' }, `Spells: ${sel.known.length ? sel.known.join(', ') : 'none'} · Techniques: ${sel.techniques.length ? sel.techniques.join(', ') : 'none'}`));

  const slot = (m: Character, slotName: string) => {
    const id = m.equipped[slotName];
    return h('tr', null, h('td', { class: 'dim' }, slotName),
      h('td', null, id ? displayName(party, id) : h('i', { class: 'dim' }, 'nothing')),
      h('td', null, id ? h('button', { class: 'quiet', onclick: () => attempt(app, () => { g.state.party = swap(app, sel.id, (c) => unequip(c, slotName)); }) }, 'Remove') : null));
  };
  root.append(h('h3', null, 'Wearing'), h('table', { class: 'tbl' }, ...['weapon', 'armour', 'shield', 'helm', 'trinket'].map((s) => slot(sel, s))));

  root.append(h('h3', null, 'Carrying'));
  if (sel.inventory.length === 0) root.append(h('div', { class: 'dim' }, 'Nothing but lint.'));
  const pack = h('table', { class: 'tbl' });
  sel.inventory.forEach((id) => {
    const def = ITEMS.find((i) => i.id === id)!;
    const usable = def.kind !== 'consumable' && def.kind !== 'trinket' ? true : def.kind === 'trinket';
    pack.append(h('tr', null,
      h('td', null, displayName(party, id)),
      h('td', null,
        usable ? h('button', { onclick: () => attempt(app, () => { g.state.party = swap(app, sel.id, (c) => equip(c, id)); }, `${sel.name} equips ${displayName(party, id)}.`) }, 'Equip') : null, ' ',
        h('button', { class: 'quiet', onclick: () => attempt(app, () => { g.state.party = identifyItem(party, id, sel); }, '') }, 'Study'), ' ',
        h('button', { class: 'quiet', onclick: () => attempt(app, () => { g.state.party = sell(party, sel.id, id); }, `Sold for ${Math.floor(def.price / 2)}g.`) }, `Sell ${Math.floor(def.price / 2)}g`))));
  });
  root.append(pack);
  root.append(h('div', { class: 'dim' }, 'Study asks the party to identify an item; only a Shade can. A cursed item will not come off.'));
  return root;
}

function swap(app: App, id: string, f: (c: Character) => Character) {
  const party = app.game!.state.party;
  return { ...party, members: party.members.map((m) => (m.id === id ? f(m) : m)) };
}
