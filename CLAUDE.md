# Optivaize AI - Project Guidelines

## Code Style Rules

- **NEVER use mdash (em dash) characters** in any text, code, or content. Use a comma, period, or rewrite the sentence instead.

## Database Migrations

- Migrations are in `server/migrate.js` using a versioned system with a `migrations` tracking table.
- Each migration has a unique `id` (e.g. `003_my_feature`) and an `up` function.
- To add a new migration, append a new object to the `migrations` array at the bottom of the list.
- Migrations run automatically on container start via `server/entrypoint.sh`.
- Already-applied migrations are skipped, so it is safe to re-run.

## Teamleader Integration

- OAuth tokens are stored in the `teamleader_tokens` PostgreSQL table (singleton row).
- Tokens (including refresh token) persist in PostgreSQL, so the connection survives restarts and works across machines.
- Tokens auto-refresh on expiry. If a 401 is returned, a retry with a fresh token is attempted.
- Backend proxy endpoints at `/api/teamleader/*` in `server/index.js`:
  - `GET /api/teamleader/authorize` - starts OAuth flow
  - `GET /api/teamleader/callback` - handles OAuth callback
  - `GET /api/teamleader/status` - check connection status
  - `GET /api/teamleader/invoices` - current month invoices
  - `GET /api/teamleader/invoices-ytd` - year-to-date invoices
  - `GET /api/teamleader/deals` - open deals with sideloaded customer and responsible user
  - `GET /api/teamleader/projects` - running projects
  - `GET /api/teamleader/tasks` - incomplete tasks (including overdue from past months)
  - `GET /api/teamleader/users` - team members
- Hidden TV dashboard at `/stats/123121221213213` (not linked anywhere, not in sitemap).
  - Designed for horizontal TV display (100vh, no scroll).
  - Shows: KPIs (month/YTD invoiced vs paid, pipeline, action items), sales pipeline, active projects, action required items, and team workload.
  - Auto-refreshes every 2 minutes with a live clock.
- Env vars needed: `TEAMLEADER_CLIENT_ID`, `TEAMLEADER_CLIENT_SECRET`, `TEAMLEADER_REDIRECT_URI`.
- For local testing, set `TEAMLEADER_REDIRECT_URI=http://localhost:3333/api/teamleader/callback` and register both localhost and production URLs in Teamleader.
