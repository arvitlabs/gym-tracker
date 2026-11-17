# L4 — Keep a signed-in session across reloads

**ID** GT-01.05\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Scope** Restore an eligible session using an in-memory access token and a rotating refresh token in a Secure, HttpOnly cookie. Validate the user and security stamp for protected API calls.

**Depends on** [Sign-in](l4-sign-in.md), browser cookie settings for the chosen domains, and token persistence.

## Acceptance criteria

- Given a user has an eligible session, when they reload online, then the browser restores access through the refresh cookie.
- Given two requests try to consume the same refresh token, when they reach the API concurrently, then only one consumes it and issues its replacement.
- Given 30 days pass without online activity, when the user returns online, then the app requires sign-in. A network failure alone preserves the user's local workout data.

[Session decisions](../../../../epic-3-decisions.md#authentication-alignment--november-1-2026) · [Auth risk R8](../../../../epic-3-risk-review.md#handle-now--sprint-stories)
