import { exportSave, importSave, saveFilename, type SaveData } from '../core/save';

/** Saves the game as a file the player keeps, so it can be loaded in any browser on any device. */
export function downloadSave(data: SaveData): void {
  const blob = new Blob([exportSave(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = saveFilename(data);
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/** Reads a chosen save file. Never throws: a bad file comes back with a message. */
export async function loadFromFile(file: File): Promise<{ data: SaveData | null; message?: string }> {
  try {
    return importSave(await file.text());
  } catch {
    return { data: null, message: 'That file could not be read.' };
  }
}

/** Opens the system file picker and resolves with the chosen file, or null if cancelled. */
export function pickFile(accept = '.json,application/json'): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.style.display = 'none';
    input.addEventListener('change', () => { resolve(input.files?.[0] ?? null); input.remove(); });
    input.addEventListener('cancel', () => { resolve(null); input.remove(); });
    document.body.append(input);
    input.click();
  });
}
