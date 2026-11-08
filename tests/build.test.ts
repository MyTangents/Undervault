import { describe, expect, test } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

describe('production build', () => {
  test('makes a static site whose files are all referenced by relative paths, so it works from any folder or host', () => {
    const out = mkdtempSync(join(tmpdir(), 'undervault-dist-'));
    execSync(`npx vite build --outDir "${out}" --emptyOutDir`, { stdio: 'pipe', timeout: 120000 });
    expect(existsSync(join(out, 'index.html'))).toBe(true);
    const html = readFileSync(join(out, 'index.html'), 'utf8');
    expect(html).toMatch(/src="\.\/assets\/[^"]+\.js"/);
    expect(html).not.toMatch(/(src|href)="\/(?!\/)/); // no root-absolute paths
    expect(readdirSync(join(out, 'assets')).some((f) => f.endsWith('.js'))).toBe(true);
    expect(html).toContain('<title>Undervault</title>');
  }, 150000);
});
