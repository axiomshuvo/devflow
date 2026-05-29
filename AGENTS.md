<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Before writing code, search `node_modules/next/dist/docs/` for filenames that match the user's request keywords (for example: routing, caching, rendering), then read the most relevant guide. If that directory does not exist or is empty, rely on your existing Next.js App Router knowledge. If you do not have tools to read the file system, ask the user to paste the contents of the relevant guide before you write code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:devflow-rules -->

# DevFlow Project Rules

## Stack

- UI: HeroUI v3 (`@heroui/react@3.x`) — NEVER use v2
- Icons: react-icons | Toast: react-toastify
- Auth: Better Auth | DB: MongoDB via Prisma
- Forms: React Hook Form + Zod | Charts: Recharts

## Phase Rules

- Phases 1–3: Frontend only — use `src/lib/mock-data.ts`, no real DB calls. The user will specify the current phase in their query. If the phase is unstated, halt and ask the user to specify the current phase.
- Phase 4: Backend — replace mock data with Prisma + MongoDB

## Git

- After every feature: run `npm run build` and `npm run test` to verify changes, fix any issues, then `git push`
- If build or test issues are not resolved after 3 fix attempts, stop and ask the user for assistance instead of continuing to retry or push.
- Prefixes: feat / fix / chore / refactor / test / docs

## Code

- 2-space indent, TypeScript strict, `"use client"` only when needed
- Zod validation on all forms, permissions checked server-side
- Never hardcode secrets, never prefix secrets with NEXT*PUBLIC*

## Session Startup Workflow (Required Every New Chat)

- Before writing or changing code, ALWAYS read in this order:
  1.  `AGENTS.md`
  2.  `.github/copilot-instructions.md`
  3.  `docs/session-handoff.md` (if present)
  4.  `/memories/repo/devflow-notes.md` (if available via memory tools)
- If `docs/session-handoff.md` is missing, create it from the template below before starting feature work.
- After reading startup files, output a short "Startup Summary" with:
  1.  Current phase (1-4)
  2.  Must-follow constraints
  3.  Last completed task
  4.  Next 3 tasks
- Do not begin implementation until the Startup Summary is produced.

## Session Handoff File Template

Create or maintain `docs/session-handoff.md` in this format:

- Current Phase: (1/2/3/4)
- Last Completed: (one line)
- In Progress: (one line)
- Next Tasks:
  1.  ...
  2.  ...
  3.  ...
- Blockers: (if any)
- Quick Commands:
  - `npm run build`
  - `npm run dev`
- Notes:
  - short project-specific reminders

## End-Of-Session Workflow

- At the end of each meaningful work session, update `docs/session-handoff.md` with latest status.
- Record important technical lessons into `/memories/repo/devflow-notes.md`.
- Before push, follow Git rules above.

See full instructions in `.github/copilot-instructions.md`. If this file is missing or unreadable, proceed using only the DevFlow Project Rules in this file.

<!-- END:devflow-rules -->
