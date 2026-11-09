# Gym Tracker — Spec (v3)

Oct 31, 2026 · Bhaskar Mantri · supersedes v2 (folds in Batch 4 and current status)

## The pitch

A gym app that asks about your body, goal and schedule, then gives you a weekly workout plan you can follow, customize and log every day. It builds each workout from sections (warm-up, main, stretch) and lets each lift progress in stages you control — and its whole reason to exist is to make you *consistent*.

**North star:** gym consistency is hard. Every feature is judged by one question — does it make the user show up again tomorrow?

## Problem & users

**Primary user:** beginner-to-intermediate gym-goers who don't know what to do each day, so they copy random routines or wander between machines and quit.

**Secondary user:** desk-job or recurring-pain people (lower back, neck, shoulders) who want relief and mobility work, whether or not they lift.

**The gap:** existing apps either log or plan — not both — and treat recovery as an afterthought. This app does plan + log + warm-up/stretch in one place, built around keeping you consistent.

## Scope — modules (v1)

| # | Module | What it covers |
| --- | --- | --- |
| 1 | Onboarding & Accounts | Sign up / log in; name, body stats, goal, experience, gym/home, 4 or 5 days, optional desk/pain/posture |
| 2 | Plan Engine | Generated 4/5-day plan; move days between weekdays; reorder within a section; per-exercise stage progression |
| 3 | Add-on Engine | Warm-up & stretch sections (generic in P1; personalized from pain/posture in P2) |
| 4 | Daily Workout & Logging | Today, sectioned workout, log weight+reps+done, offline-first with sync |
| 5 | Exercise Library | Exercises + warm-ups + stretches, with instructions & media |
| 6 | Progress & Consistency | Workout-day goals, history, past-workout detail — the engagement layer |

## Non-goals (v1)

Nutrition / diet · social features · wearable sync · AI chat coach · payments · producing our own video content · public launch (2–3 private testers only).

## North star: consistency

1. **Zero-friction start** — Today surfaces today's workout; a **central Play button** in the nav starts or swaps today's session from anywhere.
2. **Workout-day goals** — a 4-day plan targets 4 days per week and 16 per month. A 5-day plan targets 5 per week and 20 per month. The selected plan sets the targets.
3. **Visible progress** — weekly and monthly workout-day progress, body-map of what you trained.
4. **Motivation-first home** — the Today screen leads with your own progress, not a menu.

## Success criteria

- A tester logs **≥3 planned workouts/week for 3 straight weeks** without us nagging.
- Install → first plan in **under 3 minutes**.
- A full workout logged **with one thumb, between sets**.
- Bhaskar uses it himself for **4 consecutive weeks**.

## Key decisions (locked)

| Decision | Choice |
| --- | --- |
| Platform | PWA, offline-first |
| Frontend | React + Vite + TypeScript; IndexedDB (Dexie) for local logs |
| Backend | NestJS + PostgreSQL + Prisma — **part of Phase 1** |
| Sync | Append-only logs, client-generated id + timestamp; log offline → push when online; logs are immutable |
| Accounts | Sign up (phone + email unique + name/password), log in (phone + password), in Phase 1; token/refresh details later |
| Onboarding end | Screen 05 (now 07 in the flow) = **review & generate** (no red-flag gate); Generate → straight to plan |
| Plan editing (P1) | Move training days between weekdays; reorder exercises within a section. Add / remove / swap → P2 |
| Progression (P1) | **Stage-based, weight+reps only**, manual "move to next stage". Mastery + other target types → P2; auto-progression → P3 |
| Pain/posture | Collected in P1; personalizes warm-up / stretch in P2 |
| Sections | Generic — warm-up / main / stretch all behave the same, no special-casing |
| Units | **kg only** in Phase 1 |
| Profile experience change | **Does not regenerate the plan in P1** — just saves. Warning + regen comes later |
| v1 scope | 2–3 private testers |

## Phasing

**Phase 1 — core loop, full-stack, stage weight progression, accounts.** All 18 screens below. Backend + offline sync included.

**Phase 2 — mastery, target types & full editing.** Mastery plans (push-up / pull-up / plank) + target types (bodyweight reps, timed hold, assisted, per-side); add / remove / swap exercises + section editing (exercise picker); pain/posture personalization of warm-up / stretch; reminders / push; body-weight chart + logging; best-lifts / PRs feed.

**Phase 3 — auto progression.** The app suggests the next jump (research-dependent).

## Phase 1 screens (18) + shell

Bottom nav on every tab screen: **Today · Plan · ▶ · Progress · Profile** (central Play button opens a quick-start sheet with *"Start today's workout — <focus>"* or *"Change today's workout" → Plan*).

| # | Screen | What it does |
| --- | --- | --- |
| 01 | Welcome | Pitch + Get started; "I already have an account" → Log in |
| 02 | Sign up | name, phone (unique), email (unique), password |
| 03 | Log in | phone + password |
| 04 | Body & Goal | height, weight, age, gender; goal = Build muscle / General fitness (stored, not acted on in P1) |
| 05 | Experience, Location & Schedule | Beginner / Intermediate (picks library), Gym / Home, 4 or 5 days |
| 06 | Lifestyle & Body | optional: desk job, pain areas (multi), posture concerns (multi) — used in P2 |
| 07 | Review & Generate | summary of answers + one-line disclaimer; Generate → Plan Result |
| 08 | Plan Result | the generated 4- or 5-day week; Looks good → Today, Reorder → Plan |
| 09 | Plan · Week | move days between weekdays; reorder exercises within a section; Reset to recommended |
| 10 | Exercise Stages | an exercise's stages (sets × reps × weight + sessions to stay); edit, "move to next stage" (manual); weight+reps type only |
| 11 | Today | motivation hero (weekly workout-day goal progress, previous-week feedback, and next-step message), small today card, tomorrow; Start / Resume |
| 12 | Active Workout | one workout timer; sections (warm-up / main / stretch); main = log weight + reps + done, warm-up / stretch = done-check; media space per exercise |
| 13 | Workout list | all exercises by section with status; tap to jump |
| 14 | Workout Complete | body-map of muscles trained, honest count, updated workout-day goal progress and next-step feedback, volume, PR (none on #1) |
| 15 | Exercise Detail | media, how-to, mistakes, progression chain; Back returns to origin |
| 16 | Progress | **weekly and monthly workout-day goal progress, previous-period feedback, history list** (day-1 empty state) |
| 17 | Past-workout detail | read-only: each set's actual vs target, per section |
| 18 | Profile | stats, goal, experience, current plan, reminder on/off + time, **Sign out** |

Workout-day progress counts distinct qualifying local dates in Monday–Sunday weeks and calendar months. Multiple workouts on one date count once. Late offline sync updates the original period. Past periods use the target from the plan active at period end. Partial workout eligibility is open.

### Trimmed from Progress for Phase 1
- Body-weight chart + logging → Phase 2
- Best lifts (PRs) feed → Phase 2 (a one-off "New PR" callout still shows on the Workout Complete screen when a weight target is beaten)

### Profile behaviour
- **kg only** (no kg ↔ lb toggle in P1).
- Editing stats, goal or experience just saves — **no plan regeneration** in P1. A later version will warn and regenerate.
- **Sign out** button present. Redo-onboarding and delete-account not in P1.

## Planning & progression

- **Week & days:** day count fixed at 4 or 5 from onboarding; the user only moves which weekday each training day sits on. A day is an ordered list of generic sections; in P1 the only in-section edit is reordering.
- **Stages (P1, weight + reps):** an exercise's plan is an ordered list of stages, each = target sets × reps × weight + how many sessions to stay. The stage screen shows where you are; "Move to next stage" is manual; "Add next stage" copies the last stage one step harder. Active Workout shows the current stage as the target; the user logs actuals.
- **P2:** other target types (bodyweight reps, timed hold, assisted, per-side) and mastery plans (push-up / pull-up / plank) with a goal line.
- **P3:** auto / adaptive progression.

## Backend & offline sync (Phase 1)

- NestJS + PostgreSQL + Prisma.
- **Offline-first:** log a workout with no internet → saved locally (IndexedDB / Dexie) → pushed to the backend when the connection returns. Logs are **append-only with a client-generated id + timestamp** so a resync never duplicates or conflicts — logs are immutable entries, never edited in place.
- Auth works in Phase 1 (data tied to the account); access / refresh-token details TBD.

## Modules & build order

1. Module 5 — Exercise Library (raw material; largely done)
2. Module 1 — Onboarding & Accounts
3. Module 2 — Plan Engine (incl. stage progression)
4. Module 4 — Daily Workout & Logging (incl. offline sync)
5. Module 6 — Progress & Consistency
6. Module 3 — Add-on Engine (warm-up / stretch; personalization is P2)

## Status

- **Epic 1 (Discovery):** closed.
- **Epic 2 (Design):** closed. All 18 Phase 1 screens exist on the **"Gym Tracker · Screens"** canvas, organized into Phase01 / Phase02 / Other pages. Phase 2 stage placeholders present.
- **Phase 1 clickable prototype:** published and testable end-to-end — two demo accounts (seeded "Arjun" + empty new user), real local state, matches the design.
- **Next:** Epic 3 (schema, auth, sync design) → begin development on Module 1 + Module 5 wiring.

## Still open (not blocking)

- Sign up / Log in exact minimum fields + whether OTP (deferred with the auth / token work).
