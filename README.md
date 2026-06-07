# Cyber Portfolio — Interactive Security Portfolio System

Futuristic cybersecurity portfolio with a hacker-style public UI, Express API, and hidden admin panel for content updates.

## Features

- **Terminal boot screen** on homepage with typing animation
- **SOC dashboard** — stats, skills radar (Recharts), threat map, active labs feed
- **Dynamic content** — projects, labs, posts from REST API
- **Live logs page** — SIEM-style feed with pause and simulated events
- **Interactive CLI** — type commands (`help`, `dashboard`, `labs`, …)
- **Admin panel** — create posts, labs, projects without editing JSON

## Quick start

### 1. Backend (port 4000)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2. Frontend (port 3000)

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

### 3. Admin panel (port 5173)

```bash
cd updater
npm install
npm run dev
```

Open http://localhost:5173

## Project structure

```
cyber-portfolio/
├── frontend/     # Next.js public site
├── backend/      # Express API + JSON data
├── updater/      # Vite admin panel
├── shared/       # Shared types & constants
└── docs/         # Architecture & API docs
```

## Customize

- Profile copy: `frontend/app/page.tsx`, `frontend/lib/api.ts`
- Sample data: `backend/data/*.json`
- Theme: `frontend/styles/cyber-theme.css`, `tailwind.config.ts`
- Your video: `frontend/public/assets/videos/`

## Docker (optional)

```bash
docker compose up --build
```

## Authentication & contact

**Admin API key** — set `ADMIN_API_KEY` in `backend/.env`. The admin panel (`updater`) sends it via `X-API-Key` (configure in UI or `updater/.env` as `VITE_ADMIN_API_KEY`).

**Contact form** — `POST /api/contact` saves messages to `backend/data/messages.json`. For email delivery, add [Resend](https://resend.com) keys:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

**Branding** — edit `frontend/.env.local` (see `.env.local.example`) for your name, GitHub, LinkedIn, and tagline.
