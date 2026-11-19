# L4 — Initialize the React frontend

**ID** GT-05.02

**Parent** [L3 — Project foundation](l3-project-foundation.md)

**Board issue type** Task

**Iteration** Sprint 1

**Scope** Scaffold React, Vite, and TypeScript in frontend/. Add the app entry point and configuration for the backend URL.

**Depends on** [Monorepo setup](l4-configure-monorepo.md).

## Acceptance criteria

- Given dependencies are installed, when the frontend development command runs, then the app opens locally. The production build also succeeds.

[Stack decisions](../../../../epic-3-decisions.md#batch-1--technology-and-hosting)

## Implementation verification

React/Vite/TypeScript scaffold and public API URL configuration implemented. Verified under Node 24.22.3: frontend production build with TypeScript checking, lint, formatting, and local browser rendering at http://127.0.0.1:5173. Changes are uncommitted and awaiting user review. Backend connectivity is intentionally deferred to GT-05.06.
