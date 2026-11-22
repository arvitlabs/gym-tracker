# Backend

Story 3.1 defines the schema and data behavior for Gym Tracker.

- [Schema draft](prisma/schema.prisma)
- [Epic 3 decisions](../docs/epic-3-decisions.md)

Database setup, migrations, and execution checks are deferred.

## Local API

Install dependencies from the repository root. Run `npm run dev:backend` to start the API at `http://localhost:3000`; `GET /api/health` checks PostgreSQL and returns connected or HTTP 503 when unavailable. Set `PORT` to change the port and `FRONTEND_ORIGIN` to change the allowed browser origin. The API loads local environment files through Nest configuration.

## Local PostgreSQL connection

Copy `.env.example` to `.env` in `backend/` and replace the placeholder with your local PostgreSQL password. Keep that real file private; `.env` files are ignored by Git. The database is `gymTracker_dev`. Verify the connection with `npm run db:migrate --workspace @gym-tracker/backend` after the first migration is ready. Prisma CLI reads `DATABASE_URL` through `prisma.config.ts`.

## Development session responses

Successful login and refresh return HTTP 200 with the same success envelope. Its data contains `name`, `destination`, and `accessToken`. The refresh credential is delivered in a Secure, HttpOnly cookie. Invalid credentials or an expired refresh cookie return HTTP 401 with success false, null data, and an error containing code and message. Account sign-out returns 204. Development login and signup each allow 30 requests per IP per minute.
