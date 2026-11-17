# Work item hierarchy

Use these levels when turning the playbook's inputs into a backlog.

| Level | Meaning | Create it when |
| --- | --- | --- |
| **L1 — Initiative** | The overall product or a major investment. | The work needs a shared goal across multiple releases. Use Gym Tracker as the L1 for this backlog. |
| **L2 — Release or milestone** | A release-sized outcome with a clear scope. | A group of features must ship together. Phase 1 MVP is the first L2. |
| **L3 — Feature or workstream** | A coherent outcome under one L2, with a clear definition of done. | Several tickets are needed to deliver one capability or technical outcome. |
| **L4 — Task or Bug** | One implementable, verifiable piece of work under one L3. | It can be completed within a sprint. Split it if it contains independent outcomes or exceeds a sprint. |

## Creating tickets

1. **Write the L3 outcome.** State what will work when its L4s are done. Link the screen, schema change, or risk that justifies it.
2. **Break the L3 into L4s.** Give each L4 an action title, one parent L3, scope, dependencies if any, and a verifiable acceptance criterion. Use Given / When / Then for behavior. For bugs, include reproduction steps and expected behavior.
3. **Load the sprint with L4s.** Estimate and order them by dependency and the first end-to-end slice. Use generic **Task** and **Bug** types. Put frontend, backend, or both in the description when relevant.

## Board fields and assignment

- **Parent and type.** Publish each L3 as a GitHub Epic under its L2. Publish each L4 as a Task or Bug using GitHub's native sub-issue relationship under its L3 Epic.
- **Status** starts at Proposed on the Gym Tracker board. Move it to In progress when work starts and to Done when the acceptance criteria pass. Use In review when review is required.
- **Iteration** stays blank until the L4 is selected for a sprint. Estimate the L4 before committing to it.
- **Assignee** stays blank until someone commits to or starts the L4. Assign one accountable owner.
- **Priority** is High for work blocking the sprint goal, Medium for normal planned work, and Low for work that can wait.
- **Dependencies** list what must be available before work can start. Link blocking GitHub issues once they exist.

Keep initiatives and milestones in `l1/` and `l2/` under [Epic 4 planning](epic-4/planning/). Give each L3 Epic its own folder under `l3/`. Name its overview `l3-<epic>.md` and keep its `l4-<task>.md` files alongside it. Use the [sample backlog](epic-4-backlog.md) as a reference before publishing to GitHub.


## Gym Tracker examples

Both examples belong to **Gym Tracker (L1) → Phase 1 MVP (L2)**.

| L3 | L4 examples |
| --- | --- |
| **Database foundation** | Apply the first Prisma migration on an empty PostgreSQL database. Verify that the database rejects a second active plan for the same user. |
| **Daily workout logging** | Show today's workout from the active plan. Save a completed workout and show the updated workout-day count. |

Playbook numbers track the planning process. The first migration comes from playbook Story 3.2 and goes into the build backlog as an L4. Epic 4 is where that backlog is planned.
