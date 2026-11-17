# L4 — Generate and save the first plan

**ID** GT-02.06\
**Parent** [L3 — Onboarding and first plan](l3-onboarding-and-first-plan.md)\
**Board issue type** Task

**Scope** Save onboarding profile data and create the authenticated user's editable active plan from the matching published template. Wire Generate my plan to the API and open Plan Result on success.

**Depends on** [Onboarding review](l4-review-onboarding-answers.md), [template seeds](l4-seed-plan-templates.md), and database enforcement of one active plan per user.

## Acceptance criteria

- Given an authenticated new user chooses an approved combination, when generation succeeds, then their profile and matching personal plan are saved and Plan Result opens.
- Given the same user retries after a lost response or submits concurrently, when generation completes, then they have one active plan and the published template is preserved.
- Given generation fails, when the request ends, then the app retains the user's answers and offers a retry without a partially saved plan.

[Onboarding screens](../../../../phase1-build-notes.md#onboarding) · [Plan and account decisions](../../../../epic-3-decisions.md#account-and-database-baseline)
