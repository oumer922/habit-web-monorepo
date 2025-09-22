Habit Web Monorepo

A clean Next.js habit tracker in a pnpm + Turborepo monorepo.
Features weekly & monthly views, dark mode, reminders, and import/export — all running entirely in the browser (PWA-ready).

✨ Features

Monorepo: apps/web (app) + packages/* (shared libs)

UI: simple components (Card, HabitRow, WeekGrid, MonthGrid)

Tracking: current streak, longest streak, week view, month view

Reminders: per-habit time (HH:MM) via Notifications API (client-only)

Data: localStorage; Export JSON/CSV & Import JSON

Theme: dark / light (Tailwind dark class)

PWA: installable, basic offline route at /offline

🧱 Tech Stack

Next.js 14 (App Router) – apps/web

Tailwind CSS

Turborepo + pnpm workspaces

TypeScript

next-pwa (service worker)

Packages:

@repo/ui – shared components

@repo/streak-engine – streak logic & calendar helpers

@repo/storage – localStorage CRUD, import/export

📁 Project Structure
.
├─ apps/
│  └─ web/                 # Next.js app
│     ├─ app/              # App Router (layout/page files)
│     └─ public/           # PWA manifest & icons
├─ packages/
│  ├─ ui/                  # shared React components
│  ├─ streak-engine/       # streak + calendar logic
│  └─ storage/             # persistence & import/export
├─ package.json            # workspaces + scripts
├─ pnpm-workspace.yaml
├─ turbo.json
└─ .npmrc

🚀 Quick Start

Requirements: Node ≥ 18, pnpm 9 (via Corepack)

# Windows PowerShell
corepack enable
corepack prepare pnpm@9.12.3 --activate
pnpm -v

# install everything
pnpm install

# dev server (Next.js)
pnpm --filter web dev   # http://localhost:3000


Production build + PWA service worker:

pnpm --filter web build
pnpm --filter web start  # http://localhost:3000

🧭 Using the App

Add a habit → pick schedule (daily / weekdays / custom)

Click day buttons to toggle completion (week & month)

Longest 🔥 appears next to habit name

Reminders: open “Month view & reminder”, enable checkbox, set time
(Notifications need permission & a tab open)

Import/Export: toolbar buttons for JSON/CSV

Theme: 🌙/☀️ toggle in header

⚙️ Workspace Scripts

From repo root:

pnpm dev            # turbo dev (all)
pnpm build          # turbo build (all)
pnpm lint           # turbo lint
pnpm check-types    # turbo typecheck
pnpm --filter web dev|build|start

📱 PWA

Manifest: apps/web/public/manifest.json

Icons: apps/web/public/icon-192.png, icon-512.png

Offline route: /offline

Service worker is enabled only in production (next build).

🎨 Theming

Tailwind darkMode: "class". We toggle the dark class on <html>:

Hook: @repo/ui → useTheme()

Button: ThemeToggle

🧩 Packages (API overview)

@repo/streak-engine

currentStreak(logs, schedule)

longestStreak(logs, schedule)

weekCells(logs, schedule)

monthMatrix(year, month0, logs)

@repo/storage

loadHabits() / saveHabits(habits)

upsertHabit(habit) / removeHabit(id)

toggleLog(id, isoDate)

exportJSON() / importJSON(json, mode?)

exportCSV()

@repo/ui

Card, HabitRow, WeekGrid, MonthGrid

useTheme, ThemeToggle

🛠️ Troubleshooting

“Could not find a production build” → run pnpm --filter web build before start.

TS can’t find @repo/typescript-config → ensure workspaces link it:

pnpm -F @repo/ui add -D @repo/typescript-config@workspace:*
pnpm -F @repo/streak-engine add -D @repo/typescript-config@workspace:*
pnpm -F @repo/storage add -D @repo/typescript-config@workspace:*
pnpm -F web add -D @repo/typescript-config@workspace:*


Windows path issues → use PowerShell and avoid trailing slashes in git remotes.

📦 Release / Deploy

CI/CD: add a GitHub Action or connect the repo to Vercel.

For Vercel:

root: repo root

framework: Next.js

install: pnpm i

build: pnpm --filter web build

output: .next inside apps/web (Vercel detects automatically if you set the project to that subdirectory or use monorepo detection).

📝 License

MIT © You

🙌 Contributing

PRs welcome. Keep commits small and focused (feature/package per commit).
Run pnpm lint and pnpm check-types before opening a PR.
