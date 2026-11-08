import { defineConfig } from 'vitest/config';

// `npm run sim` runs scripts/sim.sim.ts, which prints a balance table. Kept apart from the normal test run.
export default defineConfig({
  test: { include: ['scripts/*.sim.ts'], environment: 'node', reporters: ['dot'] },
});
