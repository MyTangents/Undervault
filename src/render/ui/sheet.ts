/** A character sheet as plain lines: used in the Party and Packs screen and by Inspect in camp. */
import { SPELLS } from '../../core/data';
import { displayName } from '../../core/items';
import { ATTRS } from '../../core/types';
import type { Character, Party } from '../../core/types';
import { h } from './dom';
import { className, raceName } from './party';

export const SLOTS = ['weapon', 'armour', 'shield', 'helm', 'trinket'];

export function memberSheet(m: Character, party: Party): Node[] {
  const spells = m.known.map((id) => SPELLS.find((s) => s.id === id)?.name ?? id);
  const slot = m.row === 'front' ? 'front rank' : 'back rank';
  return [
    h('div', null, h('b', null, m.name), ` · Lv ${m.level} ${raceName(m.raceId)} ${className(m.classId)} · ${m.alignment} · ${slot}`),
    h('div', null, `HP ${m.hp}/${m.maxHp}${m.dead || m.ash ? (m.ash ? ' · ash' : ' · dead') : ''}${m.status.length ? ` · ${m.status.join(', ')}` : ''}`),
    h('div', null, ATTRS.map((a) => `${a.toUpperCase()} ${m.stats[a]}`).join('  ')),
    h('div', { class: 'dim' }, `Spells: ${spells.length ? spells.join(', ') : 'none'}`),
    h('div', { class: 'dim' }, `Techniques: ${m.techniques.length ? m.techniques.join(', ') : 'none'}`),
    h('div', null, h('b', null, 'Wearing')),
    ...SLOTS.map((s) => h('div', { class: 'dim' }, `${s}: ${m.equipped[s] ? displayName(party, m.equipped[s]) : 'nothing'}`)),
    h('div', null, h('b', null, 'Carrying')),
    h('div', { class: 'dim' }, m.inventory.length ? m.inventory.map((id) => displayName(party, id)).join(', ') : 'Nothing but lint.'),
  ];
}
