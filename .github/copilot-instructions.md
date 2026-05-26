# DevFlow — GitHub Copilot Agent Instructions

## Project Overview
DevFlow is a full-stack issue tracking and team analytics platform (Jira/Linear-style).
Built as a portfolio project demonstrating full-stack Next.js engineering.

## Tech Stack
| Layer | Tool |
|-------|------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Package manager | npm |
| UI Library | **HeroUI v3** (`@heroui/react@3.x`) |
| Styling | Tailwind CSS v4 |
| Auth | Better Auth |
| Database | MongoDB (Atlas) |
| ORM | Prisma (MongoDB adapter) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | react-icons |
| Toast | react-toastify |
| Utilities | clsx, tailwind-merge, date-fns |
| Hosting | Vercel |

---

## Hard Rules — Always Follow

### Library Versions
- **ALWAYS** use `@heroui/react@3.x` — never v2 or earlier
- When adding any new package, check for the latest stable version first
- Never downgrade a library without explicit user approval
- Use `react-icons` for all icons (not lucide-react, not heroicons directly)
- Use `react-toastify` for all toast/notification feedback

### Code Style
- TypeScript strict mode everywhere
- 2-space indentation
- Server Components by default — add `"use client"` only when needed (hooks, browser events, browser APIs)
- Keep `page.tsx` files thin — move logic to components, actions, and lib files
- Import alias `@/*` maps to `src/*`

### Build Phases
- **Phase 1–3 (current): Frontend only** — all pages use mock data from `src/lib/mock-data.ts`
- **Phase 4 (later): Backend** — replace mock data with real Prisma + MongoDB queries
- Do NOT add real database calls until Phase 4 is explicitly started

### Git Workflow
- After every major step: check for broken things (`npm run build` or `npm run dev`) → fix → `git push`
- Commit prefix conventions:
  - `feat:` — new page or feature
  - `fix:` — bug fix
  - `chore:` — setup, config, dependency install
  - `refactor:` — code cleanup without behavior change
  - `test:` — adding or fixing tests
  - `docs:` — README or documentation only

### Component Patterns
- Use HeroUI v3 components for all UI elements (Button, Card, Input, Table, Modal, etc.)
- Follow hydration mismatch prevention: use `mounted` state + `useEffect` for any theme/client-only values
- Shared components live in `src/components/shared/`
- Layout components live in `src/components/layout/`
- Feature components live in `src/components/{feature}/`

### Forms & Validation
- All forms use React Hook Form + Zod schema validation
- Zod schemas live in `src/lib/validations.ts` or feature-specific files
- Show field-level error messages using HeroUI Input `errorMessage` prop

### Security (apply from day 1)
- Never hardcode secrets — use `.env` for all config, `.env.example` for templates
- Permissions must be checked server-side, not only hidden in UI
- Never prefix secrets with `NEXT_PUBLIC_` — only public/safe values use that prefix
- Validate all form inputs with Zod on both client and server

### Design
- Design images are provided per page — follow them closely
- Maintain consistent spacing (Tailwind spacing scale), border-radius, and badge colors across all pages
- Use `dark` mode support via HeroUI theme

---

## Folder Structure
```
src/
  app/
    (auth)/
      login/page.tsx
      register/page.tsx
    (dashboard)/
      layout.tsx
      dashboard/page.tsx
      projects/page.tsx
      projects/[projectId]/page.tsx
      projects/create/page.tsx
      issues/page.tsx
      issues/[issueId]/page.tsx
      issues/create/page.tsx
      my-tasks/page.tsx
      team/page.tsx
      analytics/page.tsx
      settings/page.tsx
      notifications/page.tsx
      github-import/page.tsx
    api/
      auth/[...all]/route.ts      (Better Auth — Phase 4)
      github/import/route.ts      (Phase 4)
    layout.tsx
    page.tsx
  components/
    layout/
      sidebar.tsx
      topbar.tsx
    shared/
      page-header.tsx
      stats-card.tsx
      status-badge.tsx
      priority-badge.tsx
      empty-state.tsx
      loading-skeleton.tsx
    projects/
      project-card.tsx
    issues/
      issue-table.tsx
      issue-row.tsx
    forms/
      project-form.tsx
      issue-form.tsx
  lib/
    mock-data.ts        (all mock data for Phase 1-3)
    validations.ts      (Zod schemas)
    utils.ts            (cn helper, formatDate, etc.)
    db.ts               (Prisma client — Phase 4)
    auth.ts             (Better Auth config — Phase 4)
    permissions.ts      (RBAC helpers — Phase 4)
  actions/              (Server Actions — Phase 4)
    project-actions.ts
    issue-actions.ts
    comment-actions.ts
  types/
    index.ts            (shared TypeScript types)
prisma/
  schema.prisma         (Phase 4)
  seed.ts               (Phase 4)
```

---

## Routes Map
| Route | Page |
|-------|------|
| `/login` | Sign in |
| `/register` | Sign up / create workspace |
| `/dashboard` | Overview — stats, charts, recent activity |
| `/projects` | All projects — search, filter, cards |
| `/projects/create` | New project form |
| `/projects/[id]` | Project detail — issues, team, charts |
| `/issues` | All issues — table, filters, pagination |
| `/issues/create` | New issue form |
| `/issues/[id]` | Issue detail — description, comments, activity |
| `/my-tasks` | Current user's assigned issues |
| `/team` | Members, roles, invite |
| `/analytics` | Charts and productivity metrics |
| `/settings` | Workspace settings |
| `/notifications` | Mentions, assignments, alerts |
| `/github-import` | Import repo issues |

---

## RBAC (Role-Based Access Control — enforced in Phase 4)
| Action | Admin | Manager | Developer | Viewer |
|--------|-------|---------|-----------|--------|
| Create project | ✅ | ✅ | ❌ | ❌ |
| Edit project | ✅ | ✅ | ❌ | ❌ |
| Delete/archive project | ✅ | ❌ | ❌ | ❌ |
| Create issue | ✅ | ✅ | ✅ | ❌ |
| Edit any issue | ✅ | ✅ | ❌ | ❌ |
| Edit assigned issue | ✅ | ✅ | ✅ | ❌ |
| Comment | ✅ | ✅ | ✅ | read only |
| Invite member | ✅ | ✅ | ❌ | ❌ |
| View analytics | ✅ | ✅ | ✅ | ✅ |
