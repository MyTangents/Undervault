import type { Character, Party } from '../../core/types';
import { CLASSES, RACES } from '../../core/data';
import { h } from './dom';

export const className = (id: string): string => CLASSES.find((c) => c.id === id)?.name ?? id;
export const raceName = (id: string): string => RACES.find((r) => r.id === id)?.name ?? id;

const STATUS_TEXT: Record<string, string> = {
  asleep: 'asleep', silenced: 'silenced', poisoned: 'poisoned', paralysed: 'paralysed', shielded: 'warded', blessed: 'blessed',
};

/** One party member as a small card: name, class, hit points and any trouble they are in. */
export function memberCard(m: Character, onClick?: () => void, selected = false): HTMLElement {
  const frac = m.maxHp > 0 ? Math.max(0, m.hp / m.maxHp) : 0;
  const trouble = [m.ash ? 'ash' : m.dead ? 'dead' : '', ...m.status.map((s) => STATUS_TEXT[s] ?? s)].filter(Boolean).join(', ');
  const casts = m.maxCharges.some((c) => c > 0) ? ` · ${m.charges.slice(0, 3).join('/')} charges` : '';
  return h('div', { class: `member${m.dead || m.ash ? ' dead' : ''}`, style: selected ? 'background:#d9c68e' : null, onclick: onClick },
    h('span', { class: 'nm' }, m.name),
    h('span', { class: 'mono' }, `${m.hp}/${m.maxHp}`),
    h('span', { class: 'meta' }, `Lv ${m.level} ${raceName(m.raceId)} ${className(m.classId)} · ${m.row}${casts}${trouble ? ` · ${trouble}` : ''}`),
    h('div', { class: `bar${frac < 0.3 ? ' low' : ''}` }, h('i', { style: `width:${Math.round(frac * 100)}%` })),
  );
}

export function partyPanel(p: Party, onPick?: (m: Character) => void, selectedId?: string): HTMLElement {
  return h('div', { class: 'panel' },
    h('h3', null, `Party · ${p.gold} gold`),
    p.members.length === 0 ? h('div', { class: 'dim' }, 'Nobody. The Sump Tap is open.') : null,
    ...p.members.map((m) => memberCard(m, onPick ? () => onPick(m) : undefined, m.id === selectedId)),
  );
}
