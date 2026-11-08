import type { App } from '../app';
import type { KeyCommand } from '../keys';

/** L)eave, also on Escape: back to the town menu. */
export function leaveCommands(app: App): KeyCommand[] {
  const run = () => { app.townPlace = 'menu'; app.townMsg = ''; app.refresh(); };
  return [{ key: 'l', label: 'Leave', run }, { key: 'Escape', label: 'Leave', hidden: true, run }];
}
