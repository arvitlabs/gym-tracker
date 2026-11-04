# Epic 3 schema review

Story 3.1 · Schema v1 · Paused after Batch 3

The [Prisma schema](../backend/prisma/schema.prisma) is the draft under review. The seven batches below cover its 17 current tables. Use a sample account and rows to review columns, relationships, constraints, and real app queries before the first migration.

## Review order

1. **Accounts and onboarding** — `User`, `Profile`, `RefreshToken`. Covered.
2. **Exercise catalog and starter templates** — `Exercise`, `PlanTemplate`. Covered, with a proposed template redesign.
3. **Personal plans** — `Plan`, `PlanDay`, `PlanSection`, `PlanExercise`. Covered.
4. **Weekly scheduling and swaps** — `ScheduleRevision`. Resume here.
5. **Exercise progression** — `UserExerciseProgress`, `ExerciseStage`.
6. **Workout history and offline sync** — `Workout`, `WorkoutExercise`, `WorkoutSet`.
7. **Progression credit and streaks** — `ExerciseSessionCredit`, `StreakFreeze`.

## What we covered

### Batch 1 — Accounts

Arjun's `User` row holds his phone, verification status, and account credentials. A `Profile` row uses the same user ID and holds onboarding choices such as Beginner, Gym, four days per week, and Asia/Kolkata. Multiple `RefreshToken` rows can point to Arjun's account.

Open questions include whether signup requires a password, how to treat age over time, and which health and reminder preferences the first release needs.

### Batch 2 — Catalog and templates

Keep `Exercise.recommendedSets` and `Exercise.recommendedReps` as helpful defaults. Machine Chest Press might default to 3 sets of 12.

The user preferred relational template rows and accepted the proposal for review. Replace `PlanTemplate.content` with `PlanTemplateDay` → `PlanTemplateSection` → `PlanTemplateExercise`. Each child belongs to a parent and has a unique position within that parent. Each exercise placement references the shared `Exercise` row. The proposal allows optional target overrides and resolves defaults when creating a personal plan. Confirm where the resolved targets live during Batch 5. The current Prisma draft still stores template content in JSON.

### Batch 3 — Personal plans

Arjun's `Plan` records which template version it came from. Its own day, section, and exercise placement rows let Arjun edit his copy independently. Both template and personal placements reference the same catalog exercise. A plan day has a stable ID, and weekday assignments live in the schedule.

Workout history belongs to the session tables. For example, Machine Chest Press sits in Arjun's Main workout plan section, while Monday's 12 reps at 25 kg live in a `WorkoutSet` row.

Follow up on enforcing one active plan per user at the database level. The current index helps find active plans and permits duplicates.

## Resume at Batch 4

Walk through a sample `ScheduleRevision` row, how it maps weekdays to stable plan-day IDs, and what changes when Arjun swaps two days. Review effective dates, time zones, version conflicts, and offline retries. After all batches, validate the design with the [playbook's](app-build-playbook.md) 10–15 application queries.
