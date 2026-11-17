# L4 — Move to the next stage manually

**ID** GT-03.09\
**Parent** [L3 — Weekly plan and exercise stages](l3-weekly-plan-and-exercise-stages.md)\
**Board issue type** Task

**Scope** Let the user explicitly choose Move to next stage. Preserve the earlier stage and its historical workout targets and credits.

**Depends on** [Exercise stages](l4-show-exercise-stages.md) and stage-linked workout history for the historical verification.

## Acceptance criteria

- Given a next stage exists, when the user selects Move to next stage online, then that stage becomes current and prior workout history remains linked to the earlier stage.
- Given the user completes additional qualifying sessions, when their count reaches the stage target, then the current stage stays selected until they advance it manually.

[Plan screens](../../../../phase1-build-notes.md#plan-dedicated-planning-space-separate-from-logging) · [Plan and stage decisions](../../../../epic-3-decisions.md#schema-v1--initial-implementation)
