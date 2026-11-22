# L4 — Verify the frontend, API, and database together

**ID** GT-05.06

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Status** Complete

**Iteration** Sprint 1

**Scope** Wire the frontend to the local API, configure the local development origin, and verify a database-backed connection check. Document how to start the complete local app.

**Depends on** [Frontend](l4-initialize-frontend.md), [backend](l4-initialize-backend.md), and [first migration](l4-apply-first-migration.md).

## Acceptance criteria

- Given the frontend, API, and database are running, when the frontend checks the API connection, then the API verifies database connectivity and the frontend shows success. When the database is unavailable, the check reports failure.

[Stack decisions](../../../../epic-3-decisions.md#batch-1--technology-and-hosting)
