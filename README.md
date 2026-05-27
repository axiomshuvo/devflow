# DevFlow 🚀

DevFlow is a Jira/Linear-style issue tracking and team analytics app built with Next.js 16, HeroUI v3, Tailwind CSS v4, and TypeScript.

It is currently in the frontend phase, so the app runs on mock data from `src/lib/mock-data.ts` while the UI, routing, charts, forms, and tables are being built out.

## What’s inside

- Dashboard, projects, issues, team, analytics, settings, and activity views
- Reusable UI building blocks like badges, stats cards, tables, and layout shells
- Mock-driven forms with React Hook Form + Zod
- Charts and summaries powered by Recharts

## Stack

- Next.js 16.2.6 App Router
- HeroUI v3.1.0
- Tailwind CSS v4
- React Hook Form + Zod
- Recharts
- react-icons
- react-toastify

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify the app before shipping changes:

```bash
npm run build
```

## Current Phase

- Phase 1–3: frontend only, mock data only
- Phase 4: backend integration with Prisma and MongoDB

## Project Notes

- Keep new UI work aligned with the provided reference designs.
- Use HeroUI v3 components and Tailwind v4 patterns.
- Do not add real database calls until Phase 4 starts.

## Folder Guide

- `src/app/` - routes and page layouts
- `src/components/` - shared, layout, and feature components
- `src/lib/mock-data.ts` - all mock fixtures
- `src/types/` - shared TypeScript types

## Credits

Created and maintained by [Pradipta Sarker](https://github.com/axiomshuvo) ✨
