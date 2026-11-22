# First release plan — Phase 1 MVP

Baseline recorded on November 22, 2026. All estimates below are remaining effort from this date, measured in focused developer hours with AI assistance. The planning target is **190 hours**, with a range of **160–220 hours**. This replaces the earlier conversational estimate of 200–300 remaining hours.

## Release outcome

Two to three private testers can install the PWA, create an account, generate a plan, follow and log a workout offline, reconnect and sync it once, and see history and workout-day progress. Include the approved Phase 1 exercise details, generic warm-up and stretch sections, manual stages, and profile behavior.

Release acceptance follows the [specification](Gym-Tracker-Spec-v3.md), [screens](phase1-build-notes.md), and later [architecture decisions](epic-3-decisions.md). The three-week tester consistency measure is observed after release.

## Feature estimate baseline

| Feature | Remaining range, hours | Planning target, hours |
| --- | --- | --- |
| Foundation — GT-05 | 8–12 | 10 |
| Account access — GT-01 | 20–28 | 24 |
| Onboarding, seeds, and first plan — GT-02 | 22–30 | 26 |
| Weekly plan and exercise stages — GT-03 | 22–30 | 26 |
| Today, workout logging, and offline sync | 36–48 | 42 |
| Exercise detail, history, progress, and profile | 24–32 | 28 |
| Release testing, fixes, and private deployment | 28–40 | 34 |
| **Total** | **160–220** | **190** |

These estimates include implementation and feature-level verification. The release row covers integration checks, fixes across features, deployment, and smoke testing. Record time against one feature per entry to avoid counting it twice.

Foundation code, migrations, and tests already exist on the foundation branch. The foundation estimate covers remaining review, fixes, and the shared testing environment. Earlier effort is outside this remaining-work baseline.

The lower estimate assumes the existing foundation passes review, approved mockups guide implementation, and the established Phase 1 scope is followed. Offline retries, session revocation, exercise mapping exceptions, and production SMS setup remain sources of uncertainty. Provider charges and delivery lead times are separate from focused developer hours.

## Proposed sprint allocation

Sprint 1 assignments already exist on GitHub. Later sprint allocations below are a proposal to refine during the midpoint planning tasks.

| Sprint | Dates, inclusive | Proposed focus | Remaining target, hours |
| --- | --- | --- | --- |
| [Sprint 1](sprints/sprint-01/worklog.md) | Nov 19–Dec 2, 2026 | Finish foundation (10), accounts (24), begin onboarding (12) | 46 |
| [Sprint 2](sprints/sprint-02/worklog.md) | Dec 3–16, 2026 | Finish onboarding (14), weekly plan/stages (26), begin workout loop (10) | 50 |
| [Sprint 3](sprints/sprint-03/worklog.md) | Dec 17–30, 2026 | Finish workout loop and sync (32), begin remaining screens (18) | 50 |
| [Sprint 4](sprints/sprint-04/worklog.md) | Dec 31, 2026–Jan 13, 2027 | Finish remaining screens (10), release verification and deployment (34) | 44 |
| **Total** | | | **190** |

January 13 is the initial release target. At 25 focused hours per week, Sprint 1's remaining 46 hours is a stretch because this baseline starts on November 22. Use actual logged capacity to revise the forecast on November 25. If work carries over, plan an additional sprint through January 27. Dates are a forecast, and availability around holidays needs confirmation.

## Estimate versus actual

Record daily sessions in the sprint worklogs. At the weekend, sum their durations by L3 across all relevant sprints and update the cumulative totals below. Use the feature name for work whose L3 is still to be planned.

Keep the original estimate and add time spent so far, completion status, and any revised remaining estimate. Compare the estimate with actual time when the feature is complete. Use those comparisons to estimate similar work in future projects.

The actual-hours column starts as unrecorded and is filled from worklog entries. This baseline estimates remaining effort from November 22, 2026. Record any earlier hours separately.

| L3 or feature | Baseline remaining hours | Logged hours from Nov 22 | Weekend update |
| --- | --- | --- | --- |
| GT-05 — Foundation | 10 | Unrecorded | |
| GT-01 — Account access | 24 | Unrecorded | |
| GT-02 — Onboarding and first plan | 26 | Unrecorded | |
| GT-03 — Weekly plan and exercise stages | 26 | Unrecorded | |
| Today, workout logging, and offline sync | 42 | Unrecorded | |
| Exercise detail, history, progress, and profile | 28 | Unrecorded | |
| Release testing, fixes, and private deployment | 34 | Unrecorded | |

## Sources and worklogs

- [Worklog instructions](sprints/README.md)
- [Sprint 1 worklog](sprints/sprint-01/worklog.md)
- [Sprint 2 worklog](sprints/sprint-02/worklog.md)
- [Sprint 3 worklog](sprints/sprint-03/worklog.md)
- [Sprint 4 worklog](sprints/sprint-04/worklog.md)
- [Planning hierarchy](work-item-hierarchy.md)
