# Story 3.3 — Risk review

Reviewed against the Phase 1 spec, Epic 3 decisions and schema draft. The Epic 3 decisions govern where the spec still calls partial workout eligibility open. This is a design review. Acceptance cases are for implementation and verification.

## Handle now — sprint stories

| Story | Failure to prevent | Acceptance cases |
| --- | --- | --- |
| R1 — Finalize and sync once | A lost acknowledgment, concurrent upload or partial write duplicates history or credit. | Two identical uploads produce one workout and one credit per eligible progression. A changed payload for that ID conflicts. An interrupted server write leaves neither history nor credit, and the client retains the queued workout until acknowledgment. |
| R2 — Isolate accounts online and offline | A caller supplies another user's plan, stage or workout ID, or a shared device exposes one account's queue to another. | Scope reads, mutations and replay lookups to the authenticated account. Verify that the source day belongs to the selected plan and the stage belongs to the account and exercise. After switching accounts, the second account cannot see or upload the first account's data. Reauthenticating as the original account restores its queue. |
| R3 — Apply swaps and plan replacements atomically | A replay swaps the days back, or a race overwrites a newer assignment or leaves two active plans. | Retry the same Thursday/Sunday request after success and observe exactly one swap. A new request with stale assignments conflicts and preserves the latest schedule. A recorded retry still returns success after the plan is archived. Concurrent replacements leave one active plan and preserve activation history. |
| R4 — Preserve stage and targets from the workout | Reordered or edited stages rewrite history or count an old workout toward the wrong stage. | A workout synced after a stage reorder or plan reset retains the recorded stage and targets, credits that stage once when eligible, and leaves the current stage selection alone. Completing the target sets at a different actual weight still earns credit. Validate historical references without comparing old targets to current defaults. |
| R5 — Derive workout days from saved activity | Filtering out uncompleted exercises shrinks the denominator, or late sync and midnight crossing inflate streaks. | Three completed entries out of five qualify even at different weights. Two of five and zero entries do not qualify. Use activity dates from the saved workout time zone, including for auto-closed workouts. Evaluate dates independently, count at most one day per user and date, and assign late logs to their original period. |
| R6 — Reject invalid and oversized writes | Bad counts, forged dates or large arrays cause incorrect progress or partial writes. | Set explicit body and collection limits before implementation. Reject invalid IDs, duplicate entry positions, negative weights, invalid reps, and completion data inconsistent with the logging method. Validate local activity dates against recorded timestamps and time zone. Accept explicit 0 kg and done-only entries without reps or weight. Rejected requests leave state intact. |
| R7 — Protect historical references | Resetting a plan or retiring catalog data makes old logs unreadable or prevents an offline workout from syncing. | Archive replaced plans and retire exercises without deleting referenced rows. A late upload from an archived plan can still sync when ownership and references match. An attempt to delete a referenced stage, exercise or plan is rejected. |
| R8 — Guard account recovery and token rotation | Replayed OTPs or concurrent refreshes grant duplicate access, and old credentials survive a password reset. | Apply expiry, purpose binding, one-time use and attempt limits to phone verification. A concurrent refresh consumes the old token once. Password reset invalidates old refresh tokens and old access tokens via the security stamp. Set browser credential storage and normal sign-out semantics before implementing auth. |

## Handle later

- Live multi-device draft coordination and automatic reconciliation of conflicting schedule edits. Phase 1 uses stale-write conflicts and preserves finalized history.
- Self-service account deletion. Outside Phase 1 product scope. Before public launch, confirm any provider and distribution requirements for account deletion and define the operational deletion path.

## Ignore for Phase 1

- Automatic stage advancement and a scheduled midnight workout closer. The accepted workflow advances stages manually and closes abandoned drafts on the next app use.
- Streak freeze recovery. Workout days come from saved activity.

## Review status

Design triage and sprint story drafts are complete. Implementation, database verification and provider-specific auth checks are pending. Migration work remains in Story 3.2.
