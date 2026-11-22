# L4 — Make the shared testing environment available

**ID** GT-05.09

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Status** Paused

**Iteration** Sprint 1

**Scope** Confirm and record frontend, backend, and database hosting choices, regions, testing URLs, and environment configuration. Provision the shared testing environment, which serves as the playbook's staging environment. Deploy the foundation app using a documented repeatable process, apply committed migrations through that process, and configure frontend/API connectivity. Keep dev, test, and prod credentials and databases separate, and keep secrets outside git. Record the domain/origin decisions needed for later auth cookie, CORS, and CSRF configuration. This task makes staging usable; the full production release pipeline remains Epic 6.

**Depends on** GT-05.06 and GT-05.08; hosting choices, connected accounts, and credentials must be available. Complete before the first sprint demo; local foundation and feature development can proceed while hosting access is resolved.

## Acceptance criteria

- Given the documented hosting and environment settings, when the foundation is deployed, then the testing frontend and API have reachable HTTPS URLs and use the testing database.
- Given a fresh testing database, when the documented deployment process runs, then it applies versioned migrations and the deployed frontend can verify API/database connectivity.
- Given a later passing revision, when the same documented process is followed, then it updates the testing app without hand-editing the database.
- Given the environment documentation, when a contributor prepares a sprint demo, then they can find the URLs, deployment steps, health checks, and required secret names without exposing secret values. No testing service connects to production data.

[Build staging requirement](../../../../app-build-playbook.md#epic-5-build) · [Technology and hosting decisions](../../../../epic-3-decisions.md#batch-1--technology-and-hosting)
