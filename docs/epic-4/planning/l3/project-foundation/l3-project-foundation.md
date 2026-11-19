# L3 — Project foundation

**ID** GT-05

**Parent** [L2 — Phase 1 MVP](../../l2/phase-1-mvp.md)

**Board issue type** Epic

**Iteration** Sprint 1

**Outcome** A developer can run and build the frontend and backend from the monorepo and use a reproducible local PostgreSQL database.

**Done when** Both apps build and run locally, the first migration works on an empty database, and the frontend can verify API and database connectivity.

**Scope** Local development setup for React/Vite/TypeScript, NestJS, and PostgreSQL/Prisma in the existing repository. Phase 1 exercise and template seeds are tracked in GT-02.05.

## L4 tasks in dependency order

1. [Configure the monorepo development setup](l4-configure-monorepo.md)
2. [Initialize the React frontend](l4-initialize-frontend.md)
3. [Initialize the NestJS backend](l4-initialize-backend.md)
4. [Set up local PostgreSQL](l4-setup-local-postgresql.md)
5. [Apply and verify the first Prisma migration](l4-apply-first-migration.md)
6. [Verify the frontend, API, and database together](l4-verify-local-app-connection.md)

[Project foundation playbook](../../../../app-build-playbook.md#epic-5-build) · [Database risks](../../../../epic-3-risk-review.md#findings-from-the-schema-review)
