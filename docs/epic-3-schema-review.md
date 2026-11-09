# Epic 3 schema review

Story 3.1 · Schema v1 · Batches 1–7 walked through · Open decisions and schema changes pending

The [Prisma schema](../backend/prisma/schema.prisma) is the draft under review. The seven batches below cover its 16 current tables. Use a sample account and rows to review columns, relationships, constraints, and real app queries before the first migration.

## Review order

1. **Accounts and onboarding** — `User`, `Profile`, `RefreshToken`. Covered.
2. **Exercise catalog and starter templates** — `Exercise`, `PlanTemplate`. Covered, with a proposed template redesign.
3. **Personal plans** — `Plan`, `PlanDay`, `PlanSection`, `PlanExercise`. Covered.
4. **Weekly scheduling and swaps** — `PlanDay.weekday`. Covered. Offline swap conflicts and retries remain open.
5. **Exercise progression** — `UserExerciseProgress`, `ExerciseStage`. Walkthrough covered.
6. **Workout history and offline sync** — `Workout`, `WorkoutExercise`, `WorkoutSet`. Walkthrough covered.
7. **Progression credit and workout-day goals** — `ExerciseSessionCredit` and goal queries. `StreakFreeze` needs schema follow-up.

## What we covered

### Batch 1 — Accounts

Arjun's `User` row holds his phone, verification status, and account credentials. A `Profile` row uses the same user ID and holds onboarding choices such as Beginner, Gym, four days per week, and Asia/Kolkata. Multiple `RefreshToken` rows can point to Arjun's account.

Open questions include whether signup requires a password, how to treat age over time, and which health and reminder preferences the first release needs.

### Batch 2 — Catalog and templates

Keep `Exercise.recommendedSets` and `Exercise.recommendedReps` as helpful defaults. Machine Chest Press might default to 3 sets of 12.

The user preferred relational template rows and accepted the proposal for review. Replace `PlanTemplate.content` with `PlanTemplateDay` → `PlanTemplateSection` → `PlanTemplateExercise`. Each child belongs to a parent and has a unique position within that parent. Each exercise placement references the shared `Exercise` row. The proposal allows optional target overrides and resolves defaults when creating a personal plan. Confirm where the resolved targets live during Batch 5. The current Prisma draft still stores template content in JSON.

### Batch 3 — Personal plans

Arjun's `Plan` records which template version it came from. Its own day, section, and exercise placement rows let Arjun edit his copy independently. Both template and personal placements reference the same catalog exercise. A plan day has a stable ID, and weekday assignments belong to the personal plan.

Workout history belongs to the session tables. For example, Machine Chest Press sits in Arjun's Main workout plan section, while Monday's 12 reps at 25 kg live in a `WorkoutSet` row.

Follow up on enforcing one active plan per user at the database level. The current index helps find active plans and permits duplicates.

### Batch 4 — Weekly scheduling and swaps

- The selected plan sets the workout-day targets: 4 days/week and 16/month for a 4-day plan, or 5 days/week and 20/month for a 5-day plan. Users do not edit these targets separately.
- Count distinct qualifying local workout dates per Monday–Sunday week and calendar month. Two workouts on one date count once. Late offline logs update the original period. Derive progress from logs without a stored counter or separate goal-history table.
- Use the plan active at the end of each past period to determine its target. Keep plan activation and archive timing available for that lookup.
- Show progress and previous-period feedback. For example, “You trained 3 of 4 days last week.” When the current week is also at 3 of 4, add “One more workout this week gets you to your goal.”
- Open: which partial workouts qualify, and how to handle conflicting or retried offline swaps.

The draft stores the current weekday on `PlanDay.weekday` and enforces one assigned day per weekday per plan. A swap preserves both day IDs. Apply it in one transaction, temporarily clearing an assignment so the swap respects uniqueness. Offline conflict and retry behavior is still open. `ScheduleRevision` has been removed. `StreakFreeze` remains flagged for removal in Batch 7.

Goal queries use the active plan for the current period and the plan active immediately before the next period starts for a completed period. Read the 4-day or 5-day setting from that plan’s versioned template. The month target is fixed at 16 or 20 regardless of the number of weeks in the month.

### Batch 5 — Exercise progression

One `UserExerciseProgress` per user and exercise survives plan changes. For a new exercise, the proposal is to initialize `ExerciseStage` from template targets or catalog defaults, with starting weight entered by the user. For example, Arjun's chest press starts at 3 sets of 12 at 25 kg. Existing progression carries over when he changes plans. Advancement is manual. Confirm how to identify a stage across edits so a delayed workout credits the stage actually trained. The draft stores a stage position on credits, which can become ambiguous if positions are reused.

### Batch 6 — Workout history and offline sync

`Workout` stores the finalized session and its source plan/day. `WorkoutExercise` stores the exercise, section, and target snapshot. `WorkoutSet` stores each set's target, actual values, and local activity date. For example, set 2 targeted 12 reps at 25 kg and Arjun logged 10 at 25 kg. The phone keeps the draft and uploads the finalized session under a stable ID. A retry with the same ID and payload acknowledges the existing record. A changed payload for that ID is rejected. Validate ownership and save the session and its credits atomically.

### Batch 7 — Progression credit and workout-day goals

`ExerciseSessionCredit` records at most one credit per workout and exercise progression. Completing the required target sets can earn credit. Weekly and monthly goals count distinct qualifying local activity dates from the logs. A partial workout can be eligible for a workout day independently of stage credit. Proposed eligibility is at least one completed main-workout set or main-workout done-only item. Confirm before implementation. Remove `StreakFreeze` in the schema follow-up.

## Before the first migration

- Confirm partial workout eligibility, offline swap conflict and retry behavior, and stage identity across edits.
- Apply the relational template redesign, enforce one active plan per user, and verify plan activation history supports period-end target lookups.
- Validate the revised design with the [playbook's](app-build-playbook.md) 10–15 application queries.
