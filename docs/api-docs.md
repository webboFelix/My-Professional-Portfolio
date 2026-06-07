# API Reference

Base URL: `http://localhost:4000`

## Health

`GET /api/health` → `{ status, service, time }`

## Auth (admin)

`GET /api/auth/verify` — requires `X-API-Key` or `Authorization: Bearer <ADMIN_API_KEY>`

## Contact

`POST /api/contact` — public, rate-limited

Body: `{ name, email, message }` (honeypot field `website` must be empty)

Stores to `data/messages.json`; emails via Resend when `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set.

## Admin writes

All `POST`, `PUT`, `DELETE` on posts, labs, projects, and logs require the admin API key header.

## Posts

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` — body: `{ title, slug, excerpt, content, tags[], featured? }`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

## Labs

- `GET /api/labs`
- `GET /api/labs/:id`
- `POST /api/labs` — body: `{ title, description, difficulty, category, status, tools[], url? }`

## Projects

- `GET /api/projects`
- `POST /api/projects` — body: `{ title, description, techStack[], category, githubUrl?, featured? }`

## Logs

- `GET /api/logs?limit=50`
- `POST /api/logs` — body: `{ level, source, message }`
- `POST /api/logs/simulate` — append random SOC event
