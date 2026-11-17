# L4 — Sign in with a password or phone code

**ID** GT-01.04\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Scope** Offer a choice of phone and password or phone and SMS code. Wire both options to sign-in.

**Depends on** [Account creation](l4-create-account.md) and [phone code verification](l4-verify-phone-codes.md).

## Acceptance criteria

- Given a returning user has a verified phone, when they submit their correct password with that phone, then they sign in and land on Today.
- Given the same user chooses SMS sign-in, when they submit a valid login code for that phone, then they sign in and land on Today.
- Given the password or code is invalid, when the user submits it, then access is denied and the screen shows a failure message.

[Screen 3](../../../../phase1-build-notes.md#account) · [Account decisions](../../../../epic-3-decisions.md#batch-2--accounts-and-offline-behavior)
