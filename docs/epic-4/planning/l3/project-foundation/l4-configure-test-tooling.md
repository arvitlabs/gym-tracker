# L4 — Configure frontend, backend, and integration test tooling

**ID** GT-05.07

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Status** Complete

**Iteration** Sprint 1

**Scope** Choose and document the frontend, backend, browser, and database integration test tools. Add repeatable test commands and isolated PostgreSQL test configuration. Automate the existing GT-05 foundation acceptance criteria: API health, frontend-to-API connectivity, database-unavailable behavior, and the migration/constraint checks from GT-05.05. Establish where future Given/When/Then feature tests and handle-now risk tests belong; those feature tests are delivered with their respective features.

**Depends on** GT-05.01–GT-05.06. Test setup can begin after both apps are scaffolded; the complete checks require the migration and connection check.

## Acceptance criteria

- Given a fresh checkout and documented test configuration, when the test commands run, then frontend, backend, browser connection checks, and database integration checks run without using a developer's normal database or production data.
- Given the API and database are healthy, when the browser connection check runs, then it reports success; given the database is unavailable, the check verifies the expected failure state.
- Given the migration verification cases from GT-05.05, when the database suite runs, then it checks active-plan uniqueness, swap rollback, and historical reference restrictions against PostgreSQL.
- Given a behavior check fails, when the test command completes, then it returns a failing exit code. The README explains how each future story's acceptance criteria and relevant risks become tests.

[Build quality gates](../../../../app-build-playbook.md#epic-5-build) · [Database risks](../../../../epic-3-risk-review.md#findings-from-the-schema-review)

## Implementation progress

- Added isolated PostgreSQL migration/integrity checks, backend health checks including database-unavailable behavior, and a browser connection check. The test workflow passed in GitHub Actions on PR #40.
