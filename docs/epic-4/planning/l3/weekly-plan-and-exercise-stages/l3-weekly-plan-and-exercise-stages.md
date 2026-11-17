# L3 — Weekly plan and exercise stages

**ID** GT-03\
**Parent** [L2 — Phase 1 MVP](../../l2/phase-1-mvp.md)\
**Board issue type** Epic

**Outcome** A user can view and adjust their active week, restore their recommended plan, and manage their weight-and-rep stages manually.

**Done when** Weekday changes and exercise order persist, eligible offline swaps reconcile safely, resetting restores the recommended plan while retaining history and progression, and users can set targets, add stages, and advance manually.

**Scope** Screens 9–10. Plan · Week can link to Exercise Detail, which has its own screen. Active Workout and saved workout history are dependencies for verifying edits against real sessions.

## L4 tasks in dependency order

1. [Show the active plan week](l4-show-active-plan-week.md)
2. [Move training days online](l4-move-training-days-online.md)
3. [Queue and sync offline day swaps](l4-sync-offline-day-swaps.md)
4. [Reorder exercises within a section](l4-reorder-section-exercises.md)
5. [Reset to the recommended plan](l4-reset-to-recommended-plan.md)
6. [Show exercise stages and starting targets](l4-show-exercise-stages.md)
7. [Edit exercise stage targets](l4-edit-stage-targets.md)
8. [Add the next exercise stage](l4-add-exercise-stage.md)
9. [Move to the next stage manually](l4-advance-exercise-stage.md)

**Proposed first slice** Open the first saved plan in Plan · Week, move a training day online, and reopen the plan to verify the change. Offline swap and active workout cases need the downloaded plan and workout draft flows. Sprint sizing and selection are pending.

[Phase 1 screens](../../../../phase1-build-notes.md#plan-dedicated-planning-space-separate-from-logging) · [Editing and swap decisions](../../../../epic-3-decisions.md#workout-edits-and-day-swaps) · [Plan and progression decisions](../../../../epic-3-decisions.md#schema-v1--initial-implementation)
