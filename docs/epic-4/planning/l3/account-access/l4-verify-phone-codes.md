# L4 — Verify phone codes

**ID** GT-01.02\
**Parent** [L3 — Account access](l3-account-access.md)\
**Board issue type** Task

**Scope** Request and verify one-time phone codes for sign-up, log-in, and recovery. Provide an allowlisted test flow. Production delivery depends on the SMS provider decision.

**Depends on** Backend and database foundation. Real SMS delivery depends on provider configuration.

## Acceptance criteria

- Given an allowlisted test phone in the testing environment, when its valid code is submitted for the requested purpose, then verification succeeds.
- Given a code is expired, already used, or bound to a different phone or purpose, when it is submitted, then verification fails.
- Given the configured attempt limit is reached, when another attempt is made, then verification is blocked.
- Given the app runs in production, when a test code is submitted, then the test flow is disabled.

[Phone verification decisions](../../../../epic-3-decisions.md#batch-2--accounts-and-offline-behavior) · [Auth risk R8](../../../../epic-3-risk-review.md#handle-now--sprint-stories)
