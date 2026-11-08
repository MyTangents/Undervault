# Undervault — notes for Claude sessions

*Sorcery: Realm of the Undervault*: a browser homage to the first Wizardry. Short name: **Undervault**.

- Spec: `docs/superpowers/specs/2026-11-08-undervault-design.md`. Plan: `docs/superpowers/plans/2026-11-08-undervault-demo-plan.md`.
  Throwaway visual reference: `docs/dev/spike-hall.html`.
- Commands (Node 24, npm 11): `npm test`, `npm run dev`, `npm run build`, `npm run sim`.
- Game rules live in `src/core` as plain TypeScript with no DOM and no Three.js, so they can be tested and simulated headlessly.
  Rendering, UI and audio live in `src/render`.
- **Every name is original.** Nothing from Wizardry (`tests/names.test.ts` guards this). Do not add names from that game.
- Title string is one constant (`src/title.ts`); the title may change before a public launch (trademark check first).
- Look: vector, dungeon-like not cyberpunk, muted earthy palettes, low bloom, more fog. Tone: R-rated storytelling, not explicit.
- Do not create a GitHub remote or enable Pages without the owner's go.
