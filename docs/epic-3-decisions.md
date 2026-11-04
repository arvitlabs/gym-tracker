# Epic 3 — Data & Architecture decisions

Updated: November 1, 2026 · Status: In progress

Keep decisions concise. Work through one batch at a time. Product scope and screens remain in the spec and Phase 1 build notes.

## Batch 1 — Technology and hosting

### Agreed

- Frontend: React + TypeScript + Vite; React revision.
- Backend: Node.js + NestJS + TypeScript; NestJS learning and practice.
- Database: PostgreSQL + Prisma.
- Offline storage: IndexedDB through Dexie; sync designed in Batch 2.
- Platform: PWA.
- Folders: frontend/, backend/, docs/.
- Frontend hosting: Vercel Hobby for personal testing.
- Backend/database hosting: free managed services during testing; reassess paid plans before launch. No server administration.

### Proposed

- Backend: Render Free; sleeps when idle, so first requests can be slow.
- Database: Neon Free; avoids Render Free PostgreSQL’s 30-day expiry.

### Open

- Confirm Render and Neon; choose regions and environments.
- Package versions, package manager, styling, routing and PWA tooling.
- Testing, CI and media sources.

Hosting references: [Vercel](https://vercel.com/docs/plans/hobby), [Render](https://render.com/docs/free), [Neon](https://neon.com/pricing). Checked October 31, 2026.

## Batch 2 — Accounts and offline behavior

Status: In progress.

### Agreed

- Signup: name, phone and password; verify phone with SMS OTP.
- Login: phone + password or phone + SMS OTP, chosen by the user.
- Forgot password: verify phone with SMS OTP, then set a new password.
- Email: optional record; not used for login or verification.
- This replaces the earlier email-login and email-recovery direction.
- Existing domain: arvitlabs.com (Cloudflare); email setup deferred.
- Stay signed in; require login after 30 days without online activity.
- After online setup, downloaded plans support offline workout logging and resume.
- Sync saved logs automatically when online; expired login preserves local logs until reauthentication.
- Warn before sign-out if workouts are unsynced.
- Signup, login, OTP and password recovery require internet.

### Open
- SMS provider: compare MSG91 and Firebase Phone Authentication; not selected. Firebase requires billing for real SMS; published India rate is $0.07/SMS after the first 10 free SMS/day. Firebase handles phone OTP, while phone + password needs custom backend handling. Sources: https://firebase.google.com/pricing and https://cloud.google.com/identity-platform/pricing (checked October 31, 2026).
- Provider-specific session implementation and account-isolated local storage details.

### Workout and plan rules

- Remove a workout from the pending-sync queue only after backend acknowledgment; keep history available locally. Retries must remain duplicate-safe if acknowledgment is lost.
- Abandoned workouts: on app open/resume or before starting a workout, check for an active workout from an earlier local calendar day. Finalize using actual logged sets only, mark it auto-closed and queue it for sync. Upload when online and authenticated.
- No scheduled job: closure happens at the next app use, not guaranteed at midnight. Do not count closed-app time as workout duration; use recorded activity for the end time.
- Multiple-device coordination is deferred for Phase 1; records still belong to their authenticated account.
- Exercise progression belongs to the user + exercise, independently of plans; reuse it when the exercise appears in a later plan.
- Before reset/replacement, archive the current plan and its edits; create a new active plan. Resetting a plan must not reset exercise progression.
- Each workout preserves its targets as used at the time; later plan edits or resets do not change workout history.
- Any actual logged progress counts toward the streak, including auto-closed partial workouts; merely starting a workout does not count. No main-section requirement.
- Proposed data model: exercise library entry; user-exercise progression (stages/current stage/session count); plan references to exercises; immutable workout target snapshots.
- Archived plans may include a read-only progression snapshot for context; live progression remains independent.
- Logged progress means a set marked done or a done-only exercise checked complete; target edits alone do not qualify. Distinct exercise variants have distinct progressions.

## Batch 3 — Database design

Status: In progress. Define Phase 1 entities, relationships, constraints, historical targets and required queries.

Agreed logging rules:
- Each exercise defines its logging method, independently of its section.
- Reps + weight: allow 0 kg for bodyweight exercises.
- Done-only: one completion checkbox.
- Timed holds and other progression types remain Phase 2.

### Proposed database structure

- Account: User (unique normalized phone, optional email, password hash, verified phone), Profile (onboarding answers/timezone), RefreshToken (hashed, rotating, revocable tokens).
- Library: Exercise (variant identity, logging method, instructions/media, muscles, level/location).
- Planning: versioned PlanTemplate seed; user Plan → PlanDay → PlanSection → PlanExercise. Plans hold arrangement, not progression. One active plan per user.
- Progression: UserExerciseProgress → ExerciseStage. Unique user/exercise pair; current stage and session credit independent of plans. Recommended sets/reps; starting weight entered by user.
- History: Workout → WorkoutExercise → WorkoutSet, with original targets, actuals, completion/activity timestamps and source plan/day. Completed records immutable.
- Consistency: workout-derived daily credit plus weekly freeze usage; rest days and schedule swaps must be evaluated against dated schedule history.
- Sync: client-generated IDs, duplicate-safe upload, acknowledged queue removal; versioned schedule-swap operations. Queue and mutable active workout stored locally in IndexedDB.

Constraints: nonnegative weights; positive reps/sets; stage stays positive; account ownership enforced; stage-session credit granted once per exercise per workout. Done-only entries do not require weight/reps. Distinguish unset starting weight from an explicit 0 kg.

To resolve during schema implementation: whether to represent unfinished workouts on the backend, and how schedule snapshots preserve historical streak calculations after swaps. SMS integration remains unselected; the provider choice does not change workout ownership.

## Batch 4 — Runnable database foundation

Not started. Create and verify the first migration, seeds, required queries, CI migration check and generated schema diagram.

## Batch 5 — Risk review and sign-off

Not started. Triage risks, settle remaining architecture choices and verify the Epic 3 gate before sprint planning.

## Completion gate

Schema runs from scratch through migrations; risks triaged; stack and architecture settled. No implementation has been verified yet.

## Workout edits and day swaps

- Reordering exercises or editing progression requires internet. Apply changes to the active workout immediately; preserve completed sets and their original targets.
- Offline: workout logging/resume and swaps between existing downloaded workout days are allowed.
- Swapping days updates the weekly schedule too (e.g. Legs today, Chest on the previous Legs day); queue the schedule change for sync.
- Swapping during an active workout resets that unfinished session to the selected workout. Do not create a second partial session. Show a discard-progress confirmation; reset only after confirmation.
- Reset clears the discarded draft’s logs and derived credit; retain separately completed workout history and existing exercise progression. Workout-derived streak/session credit is based on retained logs.
- Other plan edits, generation and plan reset require internet.
- Streak activity belongs to the date logged, not the auto-close date. Stage-session credit requires completing the exercise’s target sets; partial effort can still earn streak credit. Stage advancement stays manual.

## Account and database baseline

Accepted on proceeding to the next discussion:
- Phone unique; email optional; user-owned records isolated by account.
- One active plan per user; previous plans archived.
- Generate from Beginner/Intermediate × Gym/Home × 4/5-day templates; give each user an editable copy.
- One progression per user + exercise, reused across plan appearances.
- Shared exercise library maintained by us; no custom user-created exercises in Phase 1.
- One active workout at a time; multiple completed workouts per day allowed, with streak credit once per day.

## Streaks and starting progression

- Streak follows planned training days; any logged progress qualifies. Rest days do not break it; extra workouts can earn that day’s credit.
- One automatic freeze per Monday–Sunday calendar week: first missed training day forgiven; second missed training day breaks the streak. Unused freezes do not accumulate. A frozen day is not a completed workout.
- Starting progression: recommend sets/reps; user enters starting weight. Reuse existing exercise progression when available.

## Schema v1 — initial implementation

- File: backend/prisma/schema.prisma. Formatted and validated using Prisma 7.10.1; database execution not yet tested.
- Confirmed: active drafts stay on the device; upload only finalized/auto-closed workouts. Preserve dated schedule revisions for past streak calculations.
- Models cover accounts/profile/refresh tokens, exercise library, versioned templates, user plans/sections/order, independent exercise stages, completed workout snapshots, session credits and weekly freezes.
- Sync uses immutable client IDs and payload hashes; duplicate upload must not repeat session credit. Schedule revisions retain full assignments with effective dates.
- Prisma schema alone does not enforce all rules. First migration must add one-active-plan partial uniqueness, numeric/check constraints and cross-record ownership/consistency checks. API transactions must enforce immutable history, template validation, valid current-stage selection and atomic credit/schedule updates.
- Before migration: define stale offline schedule replay behavior; stage edits must not retroactively alter previous session credits; freeze calculations must reconcile delayed offline activity.
- Next: Batch 4 migration/configuration, seeds and representative database queries; then Batch 5 risk review. Epic 3 remains open.

## Authentication alignment — November 1, 2026

- Follow ai-rules/backend/02-api/authentication-jwt-flow.md, adapted to personal accounts: access JWT + rotating refresh token + security stamp; no session_id claim. Supersedes the earlier Session model.
- User adds isActive and securityStamp. RefreshToken stores hash, issuance stamp, creation/activity/expiry, revocation and used state. Access JWTs are not persisted.
- Every protected API request validates JWT signature/expiry/issuer/audience, then current user activity and stamp through a minimal lookup. Derive ownership from authenticated identity.
- Refresh validates current auth state; consume the old token and issue its replacement atomically. Concurrent refreshes share one frontend operation.
- Password change/reset or forced full revocation rotates the user stamp and revokes all refresh tokens atomically. Normal sign-out revokes its refresh token; already-issued access-token revocation semantics must be settled before implementation.
- Keep 30-day online-inactivity rule; backend manages activity/expiry. Offline network failures preserve local workouts and do not imply invalid credentials.
- No tenant/branch/permission tables added. Browser credential storage remains open; do not inherit sessionStorage automatically.
- Firebase remains only a candidate for phone verification; if used, NestJS verifies Firebase proof before issuing this app’s tokens.
- Revised schema formatted and validated with Prisma 7.10.1. No migration or auth runtime implemented yet.

## Exercise naming — November 1, 2026

- Agreed: UUID primary identity; stable unique slug; editable display name. Each table should have its own UUID ID; composite-key tables still need schema alignment.
- Collect names before approving canonical slugs. Draft inventory: 876 external entries in data-mapping/exercise-inventory.json, readable names in data-mapping/exercise-names.md; 199 need equipment clarification. Not an exhaustive or approved Phase 1 list.
- Proposed convention and lifecycle: data-mapping/exercise-slug-design.md. Separate identity-changing variants; aliases for equivalent names; explicit load meaning; frozen slugs; persistent UUID seed manifest.
- Canonical slugs and library scope remain under review. No exercise records seeded or schema changes made in this naming task.

## Exercise media — November 1, 2026

- Required: quick exercise demo (GIF/video/photos) plus separately curated YouTube explanation.
- Research: data-mapping/exercise-media-sources.md. ExerciseDB/AscendAPI free GIF API is a testing candidate; provider not selected. Keep our UUID/slug and map external IDs explicitly.
- Offline logging must work without media; offline media caching depends on provider permission. MuscleWiki streaming terms prohibit permanent video storage.
- Proposed schema follow-up: ExerciseMedia child records instead of one mediaUrl, with source/licence attribution. Not implemented yet.

- Media scope clarified: collect demos only for unique exercises used by approved Phase 1 four-/five-day plans, not the full inventory. Public MuscleWiki website has separate conditional non-profit/academic sharing permission; see data-mapping/exercise-media-sources.md. Provider licence for our intended use remains unresolved.

## Exercise names — single-source decision

- MuscleWiki is the sole naming reference for the selected Phase 1 exercise library. Keep its exact exercise name and source page/ID when available.
- Select required exercises first, then verify each movement/equipment variant against MuscleWiki before assigning our UUID and stable slug.
- Our own records hold independently defined app metadata, logging rules and progression; do not import instructional text/media as part of the naming task.
- The earlier Free Exercise DB inventory is reference-only, not the source of final names. Do not merge its names into the canonical library.
- Freeze accepted slugs and UUIDs; later source display-name changes need review and must not regenerate identity.
- Video selection and licensing deferred. No names fetched or approved in this decision update.

## Exercise name matching — first batch

- Preserved supplied v1 library as data-mapping/exercise-library-final-v1.md. Its older progression guidance does not supersede current product decisions.
- data-mapping/exercise-name-mapping.json records three source-verified beginner chest matches: Machine Chest Press, Dumbbell Bench Press, Machine Pec Fly. UUIDs and proposed slugs included; draft, not seeded.
- Machine Pec Fly selected from the document’s handle-grip cues; elbow-pad Machine Bent Arm Pec Fly remains a distinct variant. Source difficulty does not override our library placement.
- Next naming group: beginner back. Other groups remain unmatched.

## Full-library mapping workflow

- Follow data-mapping/exercise-mapping-plan.md: 10 ordered batches covering gym groups, bodyweight ladders/support and optional-later references; machine-readable coverage in data-mapping/exercise-mapping-queue.json.
- Preserve first three draft UUIDs. Chest batch now has five source-verified matches; seated cable fly remains pending exact-match research. Batch not closed.
- Every source mention gets a disposition; alternatives split only after review, repeats share canonical identity. No silent substitutions or automatic phase-scope changes.

## Naming review correction — UUIDs deferred

- Supersedes earlier draft UUID assignments: no generated exercise or task UUIDs during naming review. Removed the five draft exercise UUIDs and queue UUIDs; source links/readable task references connect review entries.
- Keep original name, exact MuscleWiki name, source link, proposed slug, match status and notes. Assign permanent exercise UUIDs only when preparing approved seed data.
- Database tables still use UUID primary keys; this changes when seed identities are assigned, not the database ID type.

## Exercise instructions

- Extend mapping to include ordered how-to steps from the same verified MuscleWiki exercise page; retain source attribution and separate collection/review status. Videos deferred.
- Reuse must follow website/API terms applicable to the chosen collection route and intended app use. No instructions copied yet.
- Existing Exercise.instructions String[] supports the ordered steps; no schema change needed for the steps themselves.

## Chest naming batch review

- Batch 01 researched: five name matches with short attributed instruction paraphrases; seated cable fly remains unresolved with Cable Bench Chest Fly as a candidate.
- See data-mapping/exercise-mapping-batch-01-review.md. Names/steps remain draft; source wording issues flagged, reuse permission not marked resolved. No UUIDs, media downloads or seed import.

## Mapping batches 01–02 update

- User confirmed Seated cable fly → Cable Bench Chest Fly; chest mapping now 6/6. Summarized instructions remain draft.
- Back reviewed: 4/7 matched with source links and summaries; beginner close/neutral grip and both angle-specific supported rows need clarification.
- Keep all human-readable results in the existing data-mapping/exercise-mapping-batch-01-review.md (now cumulative), with the same JSON mapping/queue. No UUID assignment.

## Back batch choices confirmed

- Beginner close/neutral entry uses straight-bar Narrow Pulldown; intermediate neutral-grip movement stays separate.
- Both chest-supported rows use dumbbells. 30-degree row maps to Dumbbell Laying Incline Row; 60-degree row remains flagged without forced substitution.
- Batch 02: 6 matched, 1 explicitly flagged. Same cumulative review file; no UUIDs. Next: legs.

## Leg mapping batch review

- Added batch 03 to the same cumulative review and JSON mapping. 7/13 source rows matched; leg press/goblet alternatives give 8 named entries.
- Open: beginner curl/hip thrust, calf equipment, walking-lunge equipment and glute-dominant step-down source match. High-bar squat match inferred from original upper-back cue and documented.
- No UUIDs, media or seed data generated.

## Leg choices and pause

- User confirmed seated beginner leg curl; dumbbell beginner hip thrust; calf raises on elevated surface without a machine; dumbbell walking lunges; step-down remains flagged.
- Matching paused explicitly by user. Resume only on request. Pending calf/lunge source verification and hip-thrust instructions; do not call batch fully complete.

## Mapping resumed — November 3, 2026

- Resume requested. Same review and trackers; no UUIDs.
- Calves matched to Calf Raises on an elevated surface; both placements share one future identity. Dumbbell hip-thrust steps summarized.
- Legs: 11/13 rows matched; dumbbell walking lunge lacks verified exact source, step-down remains user-flagged.
- Shoulders: 5/6 rows matched with source names/links/instruction summaries; behind-body cable lateral raise has a general low-cable candidate requiring disposition. Machine overhand grip is a proposed source variant; original grip unspecified.

## Lateral raise and lunge references

- User confirmed Cable Low Single Arm Lateral Raise; original behind-body setup note kept separately. Shoulders 6/6 naming matches.
- User selected Dumbbell Forward Lunge as reference for walking lunges. Record RELATED_SOURCE_ACCEPTED, not an exact match: source returns to start, original travels forward. Final execution/slug not silently changed.
- Same cumulative review and trackers updated; no UUIDs.

## Arm mapping batch review — November 3, 2026

- Added Batch 05 to same cumulative review: five matched names across four full source rows and one matched alternative. No UUIDs.
- Open: pushdown attachment, overhead cable attachment, meaning/equipment of reverse preacher. Cable vs rope is modality vs attachment, not automatically two movements.

## Arm mapping choices — November 3, 2026

- Pushdown: straight bar. Overhead cable extension: rope variant. Reverse preacher: overhand grip on sloped pad, matched EZ-bar version; behind-body cable alternative retained.
- Arms 7/7 source rows mapped in the same review file; no UUIDs. Next: abs.

## Abs mapping batch — November 3, 2026

- Crunch matched to Crunches. Both lying reverse-crunch variations flagged: MuscleWiki namesake describes a seated V movement. Rope cable crunch awaits kneeling confirmation; source hip-motion instructions differ from library fixed-hip cue.
- Results appended to same cumulative review; no UUIDs.

## Abs disposition and pause — November 3, 2026

- Kneeling rope cable crunch confirmed; source hip-motion cue kept flagged against original fixed-hip cue. Both original reverse-crunch variations retained with no exact source match.
- User paused mapping after Batch 06. Next on request: Batch 07 bodyweight push/pull. No UUIDs generated.
