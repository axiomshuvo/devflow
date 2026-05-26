<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:devflow-rules -->

# DevFlow Project Rules

## Stack

- UI: HeroUI v3 (`@heroui/react@3.x`) — NEVER use v2
- Icons: react-icons | Toast: react-toastify
- Auth: Better Auth | DB: MongoDB via Prisma
- Forms: React Hook Form + Zod | Charts: Recharts

## Phase Rules

- Phases 1–3: Frontend only — use `src/lib/mock-data.ts`, no real DB calls
- Phase 4: Backend — replace mock data with Prisma + MongoDB

## Git

- After every feature: check broken → fix → `git push`
- Prefixes: feat / fix / chore / refactor / test / docs

## Code

- 2-space indent, TypeScript strict, `"use client"` only when needed
- Zod validation on all forms, permissions checked server-side
- Never hardcode secrets, never prefix secrets with NEXT*PUBLIC*

See full instructions in `.github/copilot-instructions.md`

<!-- END:devflow-rules -->
