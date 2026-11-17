# L4 — Queue and sync offline day swaps

**ID** GT-03.03\
**Parent** [L3 — Weekly plan and exercise stages](l3-weekly-plan-and-exercise-stages.md)\
**Board issue type** Task

**Scope** Allow swaps between existing downloaded workout days. Replay the queued request on reconnect. If the change replaces an active workout, ask before discarding its draft.

**Depends on** [Online day swaps](l4-move-training-days-online.md), account-scoped offline plan storage, and the active workout draft flow.

## Acceptance criteria

- Given both days are downloaded, when the user swaps them offline and reconnects, then the queued change is applied once or a stale-schedule conflict is shown.
- Given a swap would replace an active workout, when the user cancels the discard confirmation, then the draft and schedule stay as they were. Confirming replaces the old draft with the selected workout.

[Plan screens](../../../../phase1-build-notes.md#plan-dedicated-planning-space-separate-from-logging) · [Plan and stage decisions](../../../../epic-3-decisions.md#workout-edits-and-day-swaps) · [Risk review](../../../../epic-3-risk-review.md#handle-now--sprint-stories)
