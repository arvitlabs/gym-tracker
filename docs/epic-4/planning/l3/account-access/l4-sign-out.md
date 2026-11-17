# L4 — Sign out the current device

**ID** GT-01.07\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Scope** Clear browser credentials and revoke the current session online. Hide account data on this device. Integrate the unsynced-workout warning when the account-scoped queue is available.

**Depends on** [Session refresh](l4-refresh-session.md) and a decision on session-scoped revocation. The warning and queue checks depend on account-scoped workout storage.

## Acceptance criteria

- Given a user is signed in on two devices, when they sign out online on one, then that session's access and refresh credentials are rejected and the other device stays signed in.
- Given the API is unreachable, when the user signs out, then browser credentials are cleared, account data is hidden, and server revocation remains unconfirmed.
- Given this account has unsynced workouts, when the user starts sign-out, then the app warns them and preserves the queue for the same account.

[Session decisions](../../../../epic-3-decisions.md#authentication-alignment--november-1-2026) · [Auth risk R8](../../../../epic-3-risk-review.md#findings-from-the-schema-review)
