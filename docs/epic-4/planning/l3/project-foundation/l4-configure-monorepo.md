# L4 — Configure the monorepo development setup

**ID** GT-05.01

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Iteration** Sprint 1

**Scope** Choose and record the Node version and package manager, commit the lockfile, and add repeatable install, development, build, lint, and format-check commands for the existing frontend and backend folders. Configure shared linting and formatting rules. Document the feature → dev → test → prod workflow, using `codex/` for agent-created feature branches from dev and PRs back to dev. Set dev as the intended default/integration branch. Allow multiple related L4s in one feature branch or a single large L4, list included tasks in the PR, and verify each separately. Keep real credentials outside version control.

**Depends on** Existing gym-tracker repository.

## Acceptance criteria

- Given a fresh checkout and the documented Node version, when dependencies are installed, then both apps can use the documented development and build commands.
- Given a fresh checkout, when the documented lint and format checks run, then both apps are checked consistently; invalid code or formatting makes the relevant check fail.
- Given a contributor starts a change, when they follow the README, then the branch naming, PR review, and required validation steps are clear. Database model changes must include their migration in the same PR; changes to approved UI behavior must include the corresponding mockup update.

[Stack decisions](../../../../epic-3-decisions.md#batch-1--technology-and-hosting)

## Implementation progress

- Shared npm workspaces, lockfile, Node 24.22.3 pin, npm 11.11.0 selection, ESLint, Prettier, and EditorConfig are configured.
- GitHub default branch is dev. The current foundation branch is codex/gt-05-foundation. Branch protection is tracked in GT-05.08.
- Verified clean dependency installation under Node 24.22.3, lint, formatting, and rejection of invalid frontend/backend TypeScript and unformatted input.
- Still In progress: development/build commands are wired at the root, but app scripts and runtime verification require GT-05.02 and GT-05.03. No app build is claimed yet.
