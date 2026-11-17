# L4 — Edit exercise stage targets

**ID** GT-03.07\
**Parent** [L3 — Weekly plan and exercise stages](l3-weekly-plan-and-exercise-stages.md)\
**Board issue type** Task

**Scope** Save target sets, reps, weight in kg, and sessions to stay online. Support entering the starting weight and distinguish unset weight from an explicit zero.

**Depends on** [Exercise stages](l4-show-exercise-stages.md) and the active workout integration for in-session edits.

## Acceptance criteria

- Given a user enters valid targets including 0 kg, when they save online, then the targets persist under the same stage ID.
- Given an active workout has completed sets, when the user edits its stage, then completed sets keep their original targets and upcoming sets use the updated targets.

[Plan screens](../../../../phase1-build-notes.md#plan-dedicated-planning-space-separate-from-logging) · [Plan and stage decisions](../../../../epic-3-decisions.md#schema-v1--initial-implementation)
