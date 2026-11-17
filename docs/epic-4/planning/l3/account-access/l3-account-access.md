# L3 — Account access

**ID** GT-01\
**Parent** [L2 — Phase 1 MVP](../../l2/phase-1-mvp.md)\
**Board issue type** Epic

**Outcome** A new user can verify their phone and create an account. A returning user can sign in or recover access with their verified phone.

**Done when** Welcome routes to sign-up and log-in. Verified sign-up opens Body & Goal, and returning sign-in opens Today. Account recovery and session checks pass, including keeping another device signed in during normal sign-out.

**Scope** Screens 1–3, password recovery from log-in, and the session behavior those flows rely on. Onboarding questions, Today content, and workout sync belong to their respective epics.

## L4 tasks in dependency order

1. [Route Welcome to sign-up and log-in](l4-route-welcome.md)
2. [Verify phone codes](l4-verify-phone-codes.md)
3. [Create an account with a verified phone](l4-create-account.md)
4. [Sign in with a password or phone code](l4-sign-in.md)
5. [Keep a signed-in session across reloads](l4-refresh-session.md)
6. [Reset a forgotten password](l4-reset-password.md)
7. [Sign out the current device](l4-sign-out.md)

**First end-to-end slice** Welcome → sign-up → verify an allowlisted test phone → Body & Goal. It depends on the app and database foundation. Production SMS remains an open dependency. Sprint sizing and selection are pending.

[Phase 1 screens](../../../../phase1-build-notes.md#account) · [Account and session decisions](../../../../epic-3-decisions.md#batch-2--accounts-and-offline-behavior) · [Auth risk R8](../../../../epic-3-risk-review.md#handle-now--sprint-stories)
