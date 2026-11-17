# L4 — Show exercise stages and starting targets

**ID** GT-03.06\
**Parent** [L3 — Weekly plan and exercise stages](l3-weekly-plan-and-exercise-stages.md)\
**Board issue type** Task

**Scope** Show ordered weight-and-rep stages, current stage, and session count. Recommend starting sets and reps and reuse existing progression for the same user and exercise.

**Depends on** [Active plan week](l4-show-active-plan-week.md), user-exercise progression, and a session credit read for existing progress.

## Acceptance criteria

- Given the user opens an exercise with saved progression, when stages load, then the current stage, ordered targets, and session count match the stored progression.
- Given the exercise has no saved progression for the user, when stages load, then recommended sets and reps are shown and the starting weight is unset.
- Given the same exercise appears in another plan, when the user opens its stages, then they see the same progression.

[Plan screens](../../../../phase1-build-notes.md#plan-dedicated-planning-space-separate-from-logging) · [Plan and stage decisions](../../../../epic-3-decisions.md#schema-v1--initial-implementation)
