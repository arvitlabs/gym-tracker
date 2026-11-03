# Gym Tracker — Phase 1 Build Notes (final)

Oct 31, 2026 · source of truth for the mockups — pairs with `Gym-Tracker-Spec-v3.md`.

Design canvas: **"Gym Tracker · Screens"** (Phase01 page). Clickable prototype: **"Gym Tracker · Phase 1 Prototype"**.
Bottom nav on every tab screen: **Today · Plan · ▶ · Progress · Profile** (central Play button → quick-start sheet).

**Flow:** Welcome → Sign up (or Log in) → Body & Goal → Experience/Location/Schedule → Lifestyle & Body → Review & Generate → Plan Result → Today.
**Daily loop:** Today → Active Workout → Workout Complete → Today.

---

## Phasing (locked)

**Phase 1 — core loop, full-stack, stage weight progression, accounts.**
All 18 screens below. NestJS + Postgres backend, offline-first sync, accounts included.

**Phase 2 — mastery, target types & full editing.**
Mastery plans (push-up/pull-up/plank) + target types (bodyweight reps, timed hold, assisted, per-side); add/remove/swap exercises + section editing (exercise picker); pain/posture personalization of warm-up/stretch; reminders/push; body-weight chart + logging; best-lifts/PR feed.

**Phase 3 — auto progression.**
App suggests the next jump — research-dependent.

---

## PHASE 1 — screens

### Account

**1. Welcome**
- Shows: app name, one-line pitch.
- Actions: Get started → Sign up; "I already have an account" → Log in.

**2. Sign up**
- Collects: name, phone (unique), email (unique), password.
- Actions: Create account → Body & Goal; "Log in" link.
- Note: token/refresh/OTP wiring deferred — screen + minimal fields only.

**3. Log in**
- Collects: phone + password.
- Actions: Log in → Today (returning user); "Sign up" link.

### Onboarding

**4. Body & Goal** (step 1/4)
- Collects: height, weight, age, gender, goal (**Build muscle / General fitness** — 2 options only).
- Note: goal stored, not acted on in P1.

**5. Experience, Location & Schedule** (step 2/4)
- Collects: experience (**Beginner / Intermediate** — drives exercise library), location (**Gym / Home** — Gym = full equipment, Home = bodyweight), schedule (**4 / 5 days**).
- Note: no equipment questions.

**6. Lifestyle & Body** (step 3/4, optional)
- Collects: desk job (y/n); **pain areas** multi-select (neck / shoulders / upper back / lower back / hips / knees / elbows / none); **posture concerns** (forward head / rounded shoulders / lower-back arch / not sure).
- Note: collected in P1; **personalizing warm-up/stretch from these = Phase 2**.

**7. Review & Generate** (step 4/4)
- Shows: summary of entered answers + one-line disclaimer ("general exercise guidance, not medical advice"). **No red-flag question.**
- Actions: **Generate my plan → straight to Plan Result**.

**8. Plan Result**
- Shows: generated 4- or 5-day week (strip + day list: muscle focus + exercise count).
- Actions: Looks good → Today; Reorder → Plan · Week.

### Plan (dedicated planning space, separate from logging)

**9. Plan · Week**
- Shows: the week (4/5 training + rest); each day its focus; open a day → its sections + exercises.
- Does: **move a training day to another weekday**; **reorder exercises within a section**; open exercise → Exercise Detail; open its plan → Exercise Stages; **Reset to recommended**; Save → Today.
- Note: **add / remove / swap exercises and section editing = Phase 2.**

**10. Exercise Stages (weight + reps)**
- Shows: ordered list of **stages** (each = target sets × reps × weight + sessions to stay); current stage + session x of y.
- Does: edit a stage's target; **"Move to next stage"** (manual); **"Add next stage"** (copies the last, one step harder).
- Note: **weight + reps target type only** in P1. Mastery / other target types → P2.

### Daily loop (the core)

**11. Today** (home)
- Shows: **motivation hero** = streak (big) + weekly ring (x/5) + one-line message; small today card (focus + current/next exercise); tomorrow in one line; rest-day state. Day-1 empty state ("let's begin").
- Actions: **Start / Resume** → Active Workout; tap exercise → Exercise Detail; bottom nav.

**12. Active Workout**
- Shows: one **whole-workout timer**; **sections (warm-up / main / stretch)** as a segmented bar; current exercise with **media space** (video / image) + name.
- Logs: **main = weight + reps + done per set** (add/delete sets); **warm-up / stretch = done-check only**.
- Actions: Next / Back; "?" → Exercise Detail; open list → Workout list; X → exit (**resume later**); Finish → Complete (**confirm if sets unlogged**, Complete shows honest count).

**13. Workout list**
- Shows: every exercise grouped by section with status.
- Actions: tap to jump; back to Active Workout.

**14. Workout Complete**
- Shows: **body-map animation of muscles trained**; honest count (e.g. 2/5); streak; volume; PR (**none on workout #1**).
- Actions: Done → Today.

### Library

**15. Exercise Detail**
- Shows: media space, name, muscle tags, level, default target, how-to steps, common mistakes, progression chain.
- Actions: **Back → wherever it was opened from** (Today / Plan / Workout).

### Progress & Profile

**16. Progress**
- Shows: **streak + streak freeze, workouts this month, history list.** Day-1 empty state.
- **Removed from P1:** body-weight chart + logging, best-lifts (PRs) feed → Phase 2.
- Actions: tap a history row → Past-workout detail; bottom nav.

**17. Past-workout detail** (read-only)
- Shows: that day's sections; each set's **actual vs target** (target = the stage/weight target).
- Actions: Back → Progress.

**18. Profile**
- Shows: stats, goal, experience, current plan, reminder on/off + time.
- Actions: edit stats/goal/experience; Save; **Sign out**; Go to plan → Plan · Week; bottom nav.
- ✅ **Units: kg only** (no kg↔lb for now).
- ✅ **Editing experience does NOT regenerate the plan in P1** — just saves. Later: warn + regenerate.
- ✅ **Sign out** button added. (Redo onboarding / delete account — not now.)

---

## Key decisions (recap)

- North star: **consistency** — every screen judged by "does it make them show up tomorrow?"
- Plan is a **generated fixed 4/5-day** plan; location drives gym vs home; experience drives beginner/intermediate exercises.
- **Generic sections** — warm-up/main/stretch all behave the same; no special-casing "main".
- **Stage-based weight progression** in P1 (manual advance), weight+reps only.
- **Simple weight target** per lift lives inside the current stage; log shows target + last time; user bumps stage manually.
- **Pain/posture collected** in P1, **acted on** in P2.
- **Phase 1 is full-stack:** NestJS + Postgres backend, offline-first logging (IndexedDB) that syncs to the backend when online, accounts tied to the backend.
- **Offline sync shape:** append-only logs with client-generated id + timestamp — logs are immutable; a resync never duplicates or conflicts. If tempted to edit a past log in place, don't; that's where sync conflicts start.

---

## PHASE 2 — screens / scope (separate on the canvas)

**New screens:**
- **Exercise picker** — browse library by muscle group + level, search, preview via Exercise Detail, add/swap into a section.
- **Day editor (full)** — add / rename / remove sections; add / remove / swap exercises.
- **Stage screens for other target types** — bodyweight reps, timed hold, assisted → weighted, reps per side.
- **Mastery stage screens** — push-up / pull-up / plank with a goal line.
- Possibly an **add-on review** screen for personalized warm-up/stretch.

**Enhancements (not always new screens):**
- Pain/posture → **personalized warm-up & stretch content** (uses answers from onboarding step 6).
- **Reminders / push** setup (likely folded into Profile).
- Body-weight chart + logging (returns to Progress).
- Best-lifts (PRs) feed (returns to Progress).

**On the canvas already as placeholders:** Ph1StagePushup, Ph1StagePlank, Ph1StagePullup, Ph1StageSide (empty files).
**Phase 2 full screens already drawn:** Ph1PlanDay (day editor), Ph1Picker (exercise picker).
**Older drafts (superseded):** PlanEditor, PickPlan, and non-Ph1 originals — on the "Other" page.

---

## PHASE 3

Auto / adaptive progression (app suggests the next jump) — research-dependent.

---

## Backend / auth track

- NestJS + PostgreSQL + Prisma — **in Phase 1**.
- Sign up / log in work against the backend; sync works.
- Access-token / refresh-token / OTP details still "discuss later" with the auth work.

---

## Status

- **Epic 1 (Discovery):** closed.
- **Epic 2 (Design):** closed. All 18 Phase 1 screens exist on the "Gym Tracker · Screens" canvas, organized into Phase01 / Phase02 / Other pages.
- **Phase 1 clickable prototype:** published — two demo accounts (seeded "Arjun" + empty new user), full flow walkable.
- **Next:** Epic 3 — schema + auth + sync design, then begin development on Module 1 and the exercise/plan data wiring.

## Still open (not blocking)

- Sign up / Log in exact minimum fields + whether OTP (settled with the auth / token work).
