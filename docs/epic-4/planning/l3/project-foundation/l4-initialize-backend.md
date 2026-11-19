# L4 — Initialize the NestJS backend

**ID** GT-05.03

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Iteration** Sprint 1

**Scope** Scaffold NestJS and TypeScript in backend/, preserve the existing Prisma draft, and add configuration and a health endpoint.

**Depends on** [Monorepo setup](l4-configure-monorepo.md).

## Acceptance criteria

- Given dependencies are installed and local configuration is supplied, when the backend starts, then its health endpoint responds and its build succeeds.

[Stack decisions](../../../../epic-3-decisions.md#batch-1--technology-and-hosting)

## Implementation note

NestJS API scaffold, environment config, CORS origin/port settings, global request validation, and `/api/health` are in place. NestJS 11 is paired with the shared TypeScript 5.9 pin. Backend build succeeds. Database connectivity is deferred to GT-05.04–GT-05.06. Changes are uncommitted.
