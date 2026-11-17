# L4 — Reset a forgotten password

**ID** GT-01.06\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Scope** Let a user start recovery from log-in, verify their phone, and set a new password. Invalidate existing credentials when the reset succeeds.

**Depends on** [Phone code verification](l4-verify-phone-codes.md), [sign-in](l4-sign-in.md), and [session refresh](l4-refresh-session.md).

## Acceptance criteria

- Given an existing user verifies a valid recovery code and sets a new password, when they next sign in with that password, then sign-in succeeds and the old password fails.
- Given a reset succeeds, when a device presents an access or refresh token issued before the reset, then the API rejects it.
- Given the recovery code fails validation, when a reset is attempted, then the password and active sessions are preserved.

[Recovery decisions](../../../../epic-3-decisions.md#authentication-alignment--november-1-2026) · [Auth risk R8](../../../../epic-3-risk-review.md#handle-now--sprint-stories)
