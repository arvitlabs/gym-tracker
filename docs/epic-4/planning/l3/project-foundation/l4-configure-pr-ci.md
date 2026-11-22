# L4 — Run foundation checks on every pull request

**ID** GT-05.08

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Status** Complete

**Iteration** Sprint 1

**Scope** Add GitHub Actions checks for pull requests targeting dev, test, and prod and pushes to those branches. Use the documented Node version, package manager, and locked dependencies. Run lint, formatting, both application builds, and the test suites. Start isolated PostgreSQL, apply committed migrations to an empty database, and run integration checks. Configure the resulting checks as required before merging, with no direct-push bypass in the normal contributor workflow. If repository settings cannot enforce this, record the exact limitation and retain the documented merge gate.

**Depends on** GT-05.01, GT-05.05, and GT-05.07.

## Acceptance criteria

- Given a pull request to dev, test, or prod, when CI runs, then lint, formatting, both builds, tests, and migration/integration checks run with no manual database setup.
- Given an empty CI PostgreSQL database, when the committed migrations are applied, then schema creation and the database checks succeed.
- Given a build, test, lint, format, or migration failure, when CI finishes, then the PR shows a failed check and cannot merge under the configured rules. Any unavailable enforcement setting is explicitly documented.
- Given a passing foundation PR, when checks finish, then the PR has a successful result for every required check; CI does not require production credentials.

[Project foundation and quality gates](../../../../app-build-playbook.md#epic-5-build) · [Migration rules](../../../../app-build-playbook.md#schema-change-rules-apply-from-here-onward)

## Implementation progress

- The pull request workflow runs formatting, lint, app builds, tests, and migrations against isolated PostgreSQL. The `Build and test` check passed on PR #40.
- An active GitHub ruleset protects `dev`: changes must arrive through a pull request, the passing `Build and test` check is required on the current base, and force pushes are blocked. No bypass actors are configured. Test/prod branch checks will apply when those branches are created.
