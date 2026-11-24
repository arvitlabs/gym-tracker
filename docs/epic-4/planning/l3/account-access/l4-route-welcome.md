# L4 — Route Welcome to sign-up and log-in

**ID** GT-01.01\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Status** Complete

**Scope** Build Welcome with the app name, short pitch, and both account entry points.

**Depends on** Frontend shell and routes for the account screens.

## Acceptance criteria

- Given a visitor opens Welcome, when they select **Get started**, then sign-up opens.
- Given a visitor opens Welcome, when they select **I already have an account**, then log-in opens.

[Screen 1](../../../../phase1-build-notes.md#account)

## Implementation progress

- Added the Welcome screen using the supplied Phase 1 prototype as its visual reference. Its two links navigate to `/sign-up` and `/log-in`; those destinations are placeholders for their own L4 tasks.
- Added shared Tailwind text-role tokens. `text-body` is 16px on phones and 18px on wider screens; `text-display` fluidly scales from 48px to 72px.
- Preserved the foundation connectivity check at `/health-check`.
- Production build and Prettier checks pass. Reviewed the screen at 320px and 390px widths; text and buttons fit without horizontal overflow. Browser route clicks and CI have not yet been checked for this change.
