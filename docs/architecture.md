# Architecture

## Overview

Monorepo with three runtimes:

| Layer | Stack | Port |
|-------|-------|------|
| Frontend | Next.js 14, TypeScript, Tailwind, Framer Motion, Recharts | 3000 |
| Backend | Node.js, Express, JSON file store | 4000 |
| Admin | Vite, React, React Router | 5173 |

## Data flow

```
Admin Panel (updater) ──POST──► Express API ──► data/*.json
                                      ▲
Public Site (frontend) ──GET──────────┘
```

## Frontend routes

- `/` — Terminal boot + profile
- `/dashboard` — SOC console (radar, stats, threat map)
- `/projects`, `/labs` — API-driven content
- `/logs` — Live polling SIEM-style feed
- `/contact` — Inquiry form (demo)

## Extension points

- Replace `memoryStore` with Supabase (`backend/src/db/supabase.js`)
- Add JWT auth on write routes for admin
- Embed portfolio video under `frontend/public/assets/videos/`
