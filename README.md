# Gym Tracker

Project folders:

- `frontend/` — React + Vite + TypeScript app scaffold.
- `backend/` — reserved for NestJS + PostgreSQL + Prisma.
- `docs/` — specification, screen descriptions, development playbook and prototype.

Start with [project status](docs/project-status.md), [specification](docs/Gym-Tracker-Spec-v3.md), [screen build notes](docs/phase1-build-notes.md), and [playbook](docs/app-build-playbook.md).

Open `docs/prototype/phase1-prototype.html` in a browser to view the supplied prototype. This is a design reference; the frontend scaffold is available; backend implementation is pending.

Track ongoing architecture choices in the [Epic 3 decision log](docs/epic-3-decisions.md).

See [exercise data mapping](docs/data-mapping/exercise-mapping-batch-01-review.md) for the library review and MuscleWiki references.

## Development setup

Use Node **24.22.3** and npm **11.11.0**. With nvm installed, run `nvm install` and `nvm use` in the repository. Install the pinned npm version with `npm install --global npm@11.11.0` if needed.

Run `npm ci` from the repository root. The root lockfile covers both workspaces; commit it with dependency changes.

- `npm run lint` checks code in both apps.
- `npm run format:check` checks formatting; `npm run format` fixes it.
- `npm run dev:frontend` starts the frontend at http://127.0.0.1:5173.
- `npm run dev:backend` starts the backend after GT-05.03 adds its app and dev script.
- `npm run build --workspace @gym-tracker/frontend` type-checks and builds the frontend into `frontend/dist/`. `npm run build` will build both apps once GT-05.03 supplies the backend build script.

Backend scaffolding, database setup, and test commands are subsequent GT-05 tasks. GT-05.01 remains in progress until the backend commands can also be verified.

## Environments and branches

- **Dev:** the app on your computer, with a local development database.
- **Test:** the shared online app used to check features and run demos, with a separate testing database.
- **Prod:** the final live app and its production database.

Use separate credentials and signing keys for each environment. Real secrets go in ignored environment files locally and hosting secret settings online. Only empty/example configuration belongs in Git. Use `APP_ENV=dev|test|prod` for environment identity; hosted test and prod both use `NODE_ENV=production` for optimized runtime behavior.

`dev` is the integration branch. Create a feature branch from the latest `dev` (agent branches use `codex/`), implement the change, and open a PR back into `dev`. Run checks and review before merging. GT-05.08 will automate and enforce those checks; until then, include manual validation results in the PR.

A feature branch may cover several related L4 tasks that deliver one coherent outcome, or one large L4. There is no one-branch-per-ticket rule. List every included L4 in the PR and verify each task's acceptance criteria separately. Split unrelated work or a change that becomes too large to review; branch grouping does not change task completion requirements.

Promote a ready batch using a PR from `dev` to `test`. Deploy and verify the resulting test revision. Then open a PR from `test` to `prod` for an explicit production release. Keep promotion merges ancestry-preserving (no squash/rebase for those PRs), and freeze the candidate during approval. Release the tested artifact or rerun validation if the resulting code differs. Route fixes through feature branches and dev so the branches remain aligned.

Model changes must include a migration in the same PR. Changes to approved UI behavior must update the corresponding mockup. Feature acceptance criteria and relevant risks become automated tests as features are implemented.

The GitHub default branch is `dev`; `main` is the existing bootstrap branch and has no role in the new delivery flow. Branch protection and hosted deployments still need configuration. A branch name alone does not deploy an environment. Merging into dev never deploys to prod.

## Frontend API configuration

Copy `frontend/.env.example` to `frontend/.env.local` to select a local API URL, then restart Vite. `frontend/src/config.ts` exports `apiBaseUrl` for the later API integration task. Without an override it uses `/api`, allowing hosting proxies to route one frontend build to each environment's API. A custom `VITE_API_BASE_URL` is embedded at build time; changing it requires rebuilding. All `VITE_` settings are public browser values and must contain no secrets.

The current preview does not call an API. API connectivity is delivered in GT-05.06. To preview the production build locally, run `npm run preview --workspace @gym-tracker/frontend` after building.

## Foundation checks

Run `npx playwright install chromium` once, then `npm test`. The checks build both apps, create a uniquely named temporary PostgreSQL test database, apply migrations, check database constraints and run browser checks. The database is dropped after the checks. The local PostgreSQL user in `backend/.env` needs permission to create databases. Browser failure behavior is simulated with a 503 response; a separate API test checks a real unavailable database connection.

Add each feature's acceptance and risk checks alongside that feature.

## Pull request checks

GitHub Actions runs formatting, lint, builds, migrations, and foundation tests on pull requests and pushes to `dev`, `test`, and `prod`. It uses a temporary PostgreSQL service and disposable test database. Check the **Build and test** result on the pull request before merging. Required-check protection must be configured on GitHub after the workflow is published and has run; until then, treat a passing result as a manual merge requirement.
