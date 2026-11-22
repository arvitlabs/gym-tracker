# L3 — Project foundation

**ID** GT-05

**Parent** [L2 — Phase 1 MVP](../../l2/phase-1-mvp.md)

**Board issue type** Epic

**Iteration** Sprint 1

**Outcome** A developer can run, build, and test the frontend and backend from the monorepo with reproducible PostgreSQL setup, shared development standards, PR checks, and a working shared testing environment.

**Done when** Both apps build and run locally, the first migration works on an empty database, and the frontend can verify API and database connectivity. Linting, formatting, builds, tests, and migration checks pass in PR CI; merge requirements and the branch workflow are documented and enforced where available. The same foundation works at shared HTTPS testing URLs against a separate testing database.

**Scope** Local development setup for React/Vite/TypeScript, NestJS, and PostgreSQL/Prisma; Node/package manager and branch decisions; linting/formatting; test tooling; PR CI; and the shared testing environment required by playbook Story 5.1. The three environments are dev (local), test (shared staging), and prod (final live app). Phase 1 exercise and template seeds are tracked in GT-02.05. Feature acceptance/risk tests belong to their feature tasks, and the production release pipeline remains Epic 6.

**Build order** Complete the local foundation, test tooling, and PR checks before starting the main application feature tasks. Make the shared testing environment available before the first sprint demo. Confirm hosting access early so environment work can proceed alongside local setup.

**Progress** GT-05.01–GT-05.08 are complete. GT-05.09, the shared testing environment, is paused at the user's request. The L3 remains in progress until the shared environment is available. Estimates and accountable owners remain unset; sprint sizing remains Epic 4 planning work.

## L4 tasks in dependency order

1. [Configure the monorepo development setup](l4-configure-monorepo.md)
2. [Initialize the React frontend](l4-initialize-frontend.md)
3. [Initialize the NestJS backend](l4-initialize-backend.md)
4. [Set up local PostgreSQL](l4-setup-local-postgresql.md)
5. [Apply and verify the first Prisma migration](l4-apply-first-migration.md)
6. [Verify the frontend, API, and database together](l4-verify-local-app-connection.md)
7. [Configure frontend, backend, and integration test tooling](l4-configure-test-tooling.md)
8. [Run foundation checks on every pull request](l4-configure-pr-ci.md)
9. [Make the shared testing environment available](l4-setup-testing-environment.md)

[Project foundation playbook](../../../../app-build-playbook.md#epic-5-build) · [Database risks](../../../../epic-3-risk-review.md#findings-from-the-schema-review)
