// Builds the game and publishes dist/ to the gh-pages branch of origin (the branch GitHub Pages serves).
// Usage: npm run deploy. It only ever force-pushes gh-pages, never main.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' && cmd === 'npm', ...opts });
const out = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', ...opts }).trim();

const root = resolve(import.meta.dirname, '..');
const remote = out('git', ['remote', 'get-url', 'origin'], { cwd: root });
const sha = out('git', ['rev-parse', '--short', 'HEAD'], { cwd: root });

run('npm', ['run', 'build'], { cwd: root });

const work = mkdtempSync(join(tmpdir(), 'undervault-pages-'));
try {
  cpSync(join(root, 'dist'), work, { recursive: true });
  writeFileSync(join(work, '.nojekyll'), '');
  const git = (...args) => run('git', args, { cwd: work });
  git('init', '-q', '-b', 'gh-pages');
  git('add', '-A');
  git('-c', 'user.name=Undervault deploy', '-c', 'user.email=deploy@users.noreply.github.com', 'commit', '-q', '-m', `Deploy ${sha}`);
  git('push', '-f', remote, 'gh-pages');
} finally {
  rmSync(work, { recursive: true, force: true });
}
console.log(`Published ${sha} to gh-pages.`);
