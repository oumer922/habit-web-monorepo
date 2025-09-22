

<h1 align="center">Habit Tracker (Web)</h1>

<p align="center">
  Minimal habit tracker in a <strong>pnpm + Turborepo</strong> monorepo.<br/>
  PWA
</p>

<p align="center">
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff" /></a>
  <a href="https://pnpm.io/"><img alt="pnpm" src="https://img.shields.io/badge/pnpm-9-F69220?logo=pnpm&logoColor=000" /></a>
  <a href="https://turbo.build/repo"><img alt="Turborepo" src="https://img.shields.io/badge/Turbo-Repo-000?logo=turborepo" /></a>
  <a><img alt="License" src="https://img.shields.io/badge/License-MIT-00B894" /></a>
</p>

---

## Features

- 🎯 **Tracking**: week grid, month calendar, **current** & **longest** streaks  
- 📦 **Monorepo**: `apps/web` (Next.js) + `packages/*` (ui, storage, streak-engine)
- 📱 **PWA**: installable with basic offline route at `/offline`

---

## Quick Start

> Requires **Node ≥ 18** and **pnpm 9** (`corepack enable && corepack prepare pnpm@9.12.3 --activate`).

```bash
pnpm install
pnpm --filter web dev          # http://localhost:3000
```
---
## Production (PWA service worker enabled)
```bash
pnpm --filter web build
pnpm --filter web start        # http://localhost:3000
```
---
## Repository Layout
```bash
.
├─ apps/
│  └─ web/                 # Next.js app (App Router in /app)
│     ├─ app/
│     └─ public/           # manifest.json, icons, (sw.js generated on build)
├─ packages/
│  ├─ ui/                  # Card, HabitRow, WeekGrid, MonthGrid, Theme
│  ├─ streak-engine/       # Streak + calendar helpers
│  └─ storage/             # localStorage + import/export
├─ package.json            # "workspaces": ["apps/*", "packages/*"]
├─ pnpm-workspace.yaml
├─ turbo.json
└─ .npmrc
```
---
## Scripts

From the repo root:
```bash
pnpm dev            # turbo dev (all)
pnpm build          # turbo build (all)
pnpm lint           # turbo lint (if configured)
pnpm check-types    # turbo typecheck
pnpm --filter web dev|build|start
```

---
