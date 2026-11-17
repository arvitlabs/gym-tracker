# Epic 4 backlog draft

**L1** Gym Tracker  
**L2** Phase 1 MVP

## L3 — Daily workout logging

**Outcome** A user can open today's scheduled workout, log what they completed, and see the saved session reflected in workout-day progress.

**Done when** Today shows the scheduled workout or rest day, a workout can be logged and saved, and qualifying activity updates workout-day progress.

**Source** [Phase 1 spec, Module 4 and Screen 11](Gym-Tracker-Spec-v3.md).

### L4 — Show today's workout from the active plan

| Field | Draft value |
| --- | --- |
| Type | Task |
| Parent | Daily workout logging |
| Status | Backlog |
| Priority | Medium |
| Sprint | Unset |
| Assignee | Unassigned |
| Estimate | Pending sizing |
| Dependency | Active plan and weekday assignments are available to the Today screen. |

**Scope** Read the active plan and render the scheduled workout or rest-day state on Today. This task includes the UI and any data access needed to render those states.

**Acceptance criteria**

- **Given** the user's local day is Thursday and the active plan schedules Upper Body that day, **when** the user opens Today, **then** the screen shows Upper Body as today's workout.
- **Given** the active plan has no workout scheduled for the user's current local day, **when** the user opens Today, **then** the screen shows a rest day.

**Source** [Phase 1 spec, Screen 11](Gym-Tracker-Spec-v3.md) and [PlanDay schema](../backend/prisma/schema.prisma).
