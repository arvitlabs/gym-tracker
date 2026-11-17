# L4 — Move training days online

**ID** GT-03.02\
**Parent** [L3 — Weekly plan and exercise stages](l3-weekly-plan-and-exercise-stages.md)\
**Board issue type** Task

**Scope** Change weekday assignments while preserving plan-day IDs. Persist both sides of a swap and its request receipt atomically.

**Depends on** [Active plan week](l4-show-active-plan-week.md), weekday constraints, and an authenticated schedule API.

## Acceptance criteria

- Given a training day and a rest day, when the user moves the workout to the rest day online, then it keeps its plan-day ID and the original weekday becomes a rest day.
- Given Thursday and Sunday are assigned workout days, when the user swaps them and retries the same request, then both days exchange places exactly once.
- Given a new request contains stale assignments, when it is submitted, then it returns a conflict and preserves the current schedule.
- Given the second assignment write fails, when the swap rolls back, then neither weekday changes and no success receipt is saved.

[Plan screens](../../../../phase1-build-notes.md#plan-dedicated-planning-space-separate-from-logging) · [Plan and stage decisions](../../../../epic-3-decisions.md#workout-edits-and-day-swaps) · [Risk review](../../../../epic-3-risk-review.md#handle-now--sprint-stories)
