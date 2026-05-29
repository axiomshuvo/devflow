# DevFlow Session Handoff

- Current Phase: 2 (Frontend — mock data only, no real DB calls)
- Last Completed: Fixed nested `<button>` hydration error in Topbar dropdown trigger; added agent startup workflow to AGENTS.md.
- In Progress: —

## Next Tasks

1. Commit and push local changes: `AGENTS.md`, `topbar.tsx`, `teams-panel.tsx`, `.vscode/`, `docs/`.
2. Confirm with user which page/feature to build next (Phase 2/3 frontend work).
3. Continue building remaining pages using `src/lib/mock-data.ts`.

## Blockers

- None

## Quick Commands

- `npm run dev` — start dev server
- `npm run build` — production build check
- `git add -A && git commit -m "..." && git push` — push all changes

## Recent Commits (for context)

- feat: implement team interactive features and fixes
- feat: redesign team tabs
- feat: add notifications/github import pages and fix sidebar nav
- feat(my-tasks): make task tabs functional
- fix(projects): make create wizard step-specific with validation and navigation

## Completed Pages

- `/dashboard`, `/projects`, `/projects/create`, `/projects/[id]`, `/projects/[id]/settings`
- `/issues`, `/issues/create`, `/issues/[id]`, `/issues/[id]/edit`
- `/my-tasks`, `/team`, `/settings`, `/notifications`, `/github-import`
- `/activity`, `/analytics`, `/calendar`

## Notes

- ALWAYS read AGENTS.md + .github/copilot-instructions.md + this file at the start of every session.
- During Phases 1–3, do NOT add real DB or Prisma query logic.
- HeroUI v3 compound component API — no provider wrapper needed.
- Tailwind v4 — no tailwind.config.ts, uses CSS import in globals.css.
- Keep this file updated at end of each meaningful work session.
