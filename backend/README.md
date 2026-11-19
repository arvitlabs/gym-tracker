# Backend

Story 3.1 defines the schema and data behavior for Gym Tracker.

- [Schema draft](prisma/schema.prisma)
- [Epic 3 decisions](../docs/epic-3-decisions.md)

Database setup, migrations, and execution checks are deferred.

## Local API

Install dependencies from the repository root. Run `npm run dev:backend` to start the API at `http://localhost:3000`; `GET /api/health` returns `{"status":"ok"}`. Set `PORT` to change the port and `FRONTEND_ORIGIN` to change the allowed browser origin. The API loads local environment files through Nest configuration. Database setup and database-backed health checks are later tasks.
