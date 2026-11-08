/** Keyboard routing: layers of command tables, the same tables the screens print as `F)ight`. */

export interface KeyCommand {
  /** One lowercase letter or digit, or a key name such as `Escape`, `Enter`, `ArrowUp`. */
  key: string;
  label: string;
  /** false: printed dimmed and inert (still consumes its key). Default true. */
  enabled?: boolean;
  /** bound but not printed (for example Escape beside a printed L)eave) */
  hidden?: boolean;
  /** a held key keeps running it (walking); other commands ignore key repeat */
  repeat?: boolean;
  run: () => void;
}

export interface KeyLayer {
  name: string;
  commands(): KeyCommand[];
  /** Sees the key first (original case). Return true to consume it. */
  onKey?(key: string): boolean;
  /** Hides the layers below it. */
  modal?: boolean;
  /** Text entry: letters go to onKey and never run commands; only Escape and Enter reach the table. */
  typing?: boolean;
}

export interface KeyMods { repeat?: boolean; ctrl?: boolean; alt?: boolean; meta?: boolean }

const norm = (k: string) => (k.length === 1 ? k.toLowerCase() : k);

export class KeyRouter {
  /** While true only Enter and Space act (by calling onSkip): a round playing out. */
  locked = false;
  onSkip?: () => void;
  private layers: KeyLayer[] = [];

  push(l: KeyLayer): void { this.layers.push(l); }

  /** Removes the named layer (and everything above it); without a name, only the top one. */
  pop(name?: string): void {
    if (name === undefined) { this.layers.pop(); return; }
    const i = this.layers.map((l) => l.name).lastIndexOf(name);
    if (i >= 0) this.layers.length = i;
  }

  top(): KeyLayer | undefined { return this.layers[this.layers.length - 1]; }
  clear(): void { this.layers = []; }

  /** True when the key was consumed (the caller should preventDefault). */
  handle(key: string, mods: KeyMods = {}): boolean {
    if (mods.ctrl || mods.alt || mods.meta) return false;
    if (this.locked) {
      if (mods.repeat) return false;
      if (key === 'Enter' || key === ' ') { this.onSkip?.(); return true; }
      return false;
    }
    const held = !!mods.repeat;
    const k = norm(key);
    for (let i = this.layers.length - 1; i >= 0; i--) {
      const l = this.layers[i];
      if ((!held || key.startsWith('Arrow')) && l.onKey?.(key)) return true;
      const named = k === 'Escape' || k === 'Enter';
      if (!l.typing || named) {
        const c = l.commands().find((x) => norm(x.key) === k);
        if (c) {
          if (held && !c.repeat) return false;
          if (c.enabled !== false) c.run();
          return true;
        }
      }
      // A text-entry layer swallows printable keys even when onKey declined them.
      if (l.typing && k.length === 1) return true;
      if (l.modal) break;
    }
    return false;
  }
}

const KEY_NAMES: Record<string, string> = {
  Escape: 'Esc', Enter: 'Enter', ' ': 'Space', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
};

/** `F)ight`, `The P)arty`; `X) Walk` when the letter is not in the label; names print as `Esc) Leave`. */
export function labelOf(c: KeyCommand): string {
  if (c.key.length !== 1) return `${KEY_NAMES[c.key] ?? c.key}) ${c.label}`;
  const ch = c.key.toLowerCase();
  const lower = c.label.toLowerCase();
  let at = -1;
  for (let i = 0; i < lower.length; i++) {
    if (lower[i] === ch && (i === 0 || lower[i - 1] === ' ')) { at = i; break; }
  }
  if (at < 0) at = lower.indexOf(ch);
  if (at < 0) return `${c.key.toUpperCase()}) ${c.label}`;
  return `${c.label.slice(0, at)}${c.label[at].toUpperCase()})${c.label.slice(at + 1)}`;
}

/** Keys (lowercased) used by more than one command. */
export function duplicateKeys(cmds: KeyCommand[]): string[] {
  const seen = new Set<string>();
  const dup: string[] = [];
  for (const c of cmds) {
    const k = norm(c.key);
    if (seen.has(k) && !dup.includes(k)) dup.push(k);
    seen.add(k);
  }
  return dup;
}
