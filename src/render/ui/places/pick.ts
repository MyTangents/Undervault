import type { Character } from '../../../core/types';
import type { App } from '../app';
import type { KeyCommand } from '../keys';

/** "Who": the member a forge or party screen is about. Keys 1 to 6 pick one; Left and Right step through the party. */
export function memberPicker(app: App, onChange: () => void) {
  const members = () => app.game!.state.party.members;
  const current = (): Character | undefined => {
    const ms = members();
    return ms.find((m) => m.id === app.selectedId) ?? ms[0];
  };
  const select = (id: string) => { app.selectedId = id; onChange(); };
  const step = (dir: 1 | -1) => {
    const ms = members();
    if (ms.length === 0) return;
    const at = Math.max(0, ms.findIndex((m) => m.id === current()?.id));
    select(ms[(at + dir + ms.length) % ms.length].id);
  };
  const commands = (): KeyCommand[] => [
    ...members().map((m, i): KeyCommand => ({ key: String(i + 1), label: m.name, hidden: true, run: () => select(m.id) })),
    { key: 'ArrowLeft', label: 'Previous member', hidden: true, run: () => step(-1) },
    { key: 'ArrowRight', label: 'Next member', run: () => step(1) },
  ];
  return { current, select, step, commands };
}
