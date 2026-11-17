# L4 — Create an account with a verified phone

**ID** GT-01.03\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Scope** Connect sign-up to the account API. Require name, phone, and password. Email is optional.

**Depends on** [Phone code verification](l4-verify-phone-codes.md) and account persistence.

## Acceptance criteria

- Given a new user enters valid details and verifies their phone, when sign-up succeeds, then one account is created and the user proceeds to Body & Goal signed in.
- Given the phone is unverified or already belongs to an account, when sign-up is submitted, then no new account is created.
- Given sign-up is unavailable because the device is offline, when the user tries to submit, then the screen shows that a connection is required.

[Screen 2](../../../../phase1-build-notes.md#account) · [Account decisions](../../../../epic-3-decisions.md#batch-2--accounts-and-offline-behavior)
