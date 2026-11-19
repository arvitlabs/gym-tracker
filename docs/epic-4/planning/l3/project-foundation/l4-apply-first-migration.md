# L4 — Apply and verify the first Prisma migration

**ID** GT-05.05

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Iteration** Sprint 1

**Scope** Connect Prisma to PostgreSQL, validate the schema with representative application queries, and create the first versioned migration. Include the active-plan uniqueness rule and verify weekday swap rollback and historical reference restrictions. Capture any schema changes with the migration.

**Depends on** [Local PostgreSQL](l4-setup-local-postgresql.md), the existing schema draft, and resolution of schema findings needed by the migration.

## Acceptance criteria

- Given an empty database, when the migrations are applied, then the schema is created successfully and the representative queries run. A second active plan is rejected, a failed swap rolls back, and referenced history remains protected.

[Stack decisions](../../../../epic-3-decisions.md#batch-1--technology-and-hosting)
