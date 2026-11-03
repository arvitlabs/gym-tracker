# Exercise naming and slug mapping plan

Source: exercise-library-final-v1.md · Naming source: MuscleWiki only · Created November 1, 2026

## Scope and outputs

- Cover all 43 gym source rows, bodyweight base exercises, ladders, support variants and optional-later mentions. Counts are source tasks, not final unique exercises.
- Preserve the original library; mapping names does not approve older progression rules or promote Phase 2 content into Phase 1.
- exercise-mapping-queue.json: every source task, batch, source location, status and matched source URLs.
- exercise-name-mapping.json: name mappings with original label, exact MuscleWiki name, proposed slug, source URL and mapping rationale. No UUIDs yet.
- This plan: batch order, per-entry checklist, unresolved choices and completion gates.
- Names, source references and step-by-step instructions from the same matched page. Collect instructions only under applicable reuse permission; record collection/review status separately. Videos, provider subscriptions and database seeding remain deferred.

## Same procedure for every batch

1. Review each source entry and its cues. Split true alternatives; identify equipment, grip, posture and movement differences.
2. Search MuscleWiki and open the individual English exercise page. Verify the movement, not just the title. Do not invent source IDs.
3. Record MATCHED, NEEDS_CLARIFICATION or NO_EXACT_MATCH with evidence. PENDING means not yet researched; NO_EXACT_MATCH requires a documented search.
4. Reuse the same verified source mapping for equivalent mentions; one alternative row can have several candidate matches. Assign UUIDs only when preparing seed data.
5. Record ordered how-to steps from the matched page once reuse permission is established, preserving source attribution and flagging unclear wording for review. Name matching can proceed while this is pending. Assign a proposed slug under the naming convention; retain our original label as mapping provenance. Keep slugs proposed until naming review is complete.
6. Check duplicates and source links, summarize exceptions and update the queue before proceeding to the next batch. Normal matches do not need repeated approval; unresolved choices remain visibly open.
7. A batch closes only when every task is matched or explicitly resolved/deferred. Final naming approval is separate from source verification.

## Ordered batches

### 01. Gym — Chest (beginner + intermediate) — 6 source tasks

Status: MAPPING_COMPLETE — 6/6 matched; instruction text remains draft

- [x] Machine chest press (B1; source line 207)
- [x] Flat dumbbell press (B1; source line 208)
- [x] Pec deck / machine fly (B1; source line 209)
- [x] Incline dumbbell press (B2; source line 342)
- [x] Barbell bench press (B2; source line 343)
- [x] Seated cable fly (B2; source line 344) — user confirmed Cable Bench Chest Fly

### 02. Gym — Back (beginner + intermediate) — 7 source tasks

Status: MAPPING_COMPLETE_WITH_FLAG — 6/7 matched; 60-degree row explicitly flagged by user

- [x] Lat pulldown, wide grip (B1; source line 228)
- [x] Seated cable row (B1; source line 229)
- [x] Lat pulldown, close / neutral grip (B1; source line 230) — straight-bar Narrow Pulldown
- [x] Neutral-grip pulldown, leaning back (B2; source line 349)
- [x] One-arm dumbbell row (B2; source line 350)
- [x] Chest-supported row, bench about 30° (B2; source line 351) — dumbbells confirmed
- [ ] Chest-supported row, bench about 60° (B2; source line 352) — FLAGGED by user, dumbbells confirmed

### 03. Gym — Legs (beginner + intermediate) — 13 source tasks

Status: REVIEW_REQUIRED — 11/13 source rows matched; dumbbell walking lunge unmatched; step-down explicitly flagged

- [x] Leg press (or goblet squat) (B1; source line 246)
- [x] Leg curl (B1; source line 247) — seated confirmed
- [x] Light dumbbell Romanian deadlift (B1; source line 248)
- [x] Hip thrust (B1; source line 249) — dumbbell source matched; instructions pending
- [x] Calf raise machine (B1; source line 250)
- [x] Barbell squat (B2; source line 371)
- [x] Romanian deadlift (B2; source line 372)
- [ ] Walking lunge (B2; source line 373)
- [x] Leg extension (B2; source line 374)
- [x] Seated leg curl (B2; source line 375)
- [x] Barbell hip thrust (B2; source line 376)
- [ ] Glute-dominant step-down (B2; source line 377)
- [x] Standing calf raise (B2; source line 378)

### 04. Gym — Shoulders (beginner + intermediate) — 6 source tasks

Status: MAPPING_COMPLETE — 6/6 matched; instructions remain draft

- [x] Machine shoulder press (B1; source line 280)
- [x] Dumbbell lateral raise (B1; source line 281)
- [x] Reverse pec deck (B1; source line 282)
- [x] Seated dumbbell shoulder press (B2; source line 357)
- [x] Cable lateral raise (B2; source line 358) — user accepted low single-arm source with separate setup note
- [x] Reverse cable fly (B2; source line 359)

### 05. Gym — Arms (beginner + intermediate) — 7 source tasks

Status: MATCHED — 7/7 source rows; 8 entries including both curl alternatives

- [x] Dumbbell curl (B1; source line 299)
- [x] Cable pushdown (B1; source line 300)
- [x] Hammer curl (B1; source line 301)
- [x] Overhead dumbbell extension (B1; source line 302)
- [x] Lying incline dumbbell curl (B2; source line 364)
- [x] Reverse preacher curl or behind-the-body cable curl (B2; source line 365)
- [x] Overhead cable or rope extension (B2; source line 366)

### 06. Gym — Abs (beginner + intermediate) — 4 source tasks

Status: REVIEW_REQUIRED — 2/4 names matched; 2 reverse-crunch variations retained and flagged by user; cable cue review pending

- [x] Crunch (B1; source line 320)
- [ ] Reverse crunch (knees tucked) (B1; source line 321)
- [ ] Reverse crunch, legs straighter (B2; source line 383)
- [x] Rope cable crunch (B2; source line 384)

### 07. Bodyweight — push and pull ladders — 15 source tasks

Status: REVIEW_REQUIRED - 15 researched; 9 matched (8 canonical proposals), 1 user-selected wall source pending verification, 1 user-accepted related ring source, 1 negative push-up deferred, 2 no exact match, 1 setup clarification. Written page verification where accessible; visual playback not inspected.

- [ ] Wall push-up (A; source line 87)
- [x] Incline push-up — hands at chest height (A; source line 87)
- [x] Incline push-up — hands at hip height (A; source line 87)
- [ ] Negative push-up — return on knees (A; source line 87)
- [x] Full push-up (A; source line 87)
- [x] Decline push-up (A; source line 87)
- [x] Diamond push-up (A; source line 87)
- [ ] Archer push-up (A; source line 87)
- [x] Knee push-up (A; source line 87)
- [x] Pull-up (A; source line 114)
- [x] Dead hang (A; source line 114)
- [ ] Scapular pulls (A; source line 114)
- [ ] Inverted row — steep (A; source line 114)
- [x] Inverted row — horizontal (A; source line 114)
- [ ] Negative pull-up (A; source line 114)

### 08. Bodyweight — squat, glute bridge and calf variants — 13 source tasks

Status: PENDING

- [ ] Chair squat (A; source line 140)
- [ ] Bodyweight squat (A; source line 140)
- [ ] Pause squat (A; source line 140)
- [ ] Split squat (A; source line 140)
- [ ] Bulgarian split squat (A; source line 140)
- [ ] Box pistol squat (A; source line 140)
- [ ] Pistol squat (A; source line 140)
- [ ] Glute bridge (A; source line 175)
- [ ] Glute bridge — pause at top (A; source line 175)
- [ ] Single-leg glute bridge (A; source line 175)
- [ ] Calf raise — both legs (A; source line 175)
- [ ] Calf raise — single leg (A; source line 175)
- [ ] Calf raise — step edge (A; source line 175)

### 09. Bodyweight — plank and core support — 10 source tasks

Status: PENDING

- [ ] Knee plank (A; source line 164)
- [ ] Full forearm plank (A; source line 164)
- [ ] Long-lever plank (A; source line 164)
- [ ] Rocking plank (A; source line 164)
- [ ] Side plank — knees (A; source line 175)
- [ ] Side plank — full (A; source line 175)
- [ ] Side plank — top-leg lift (A; source line 175)
- [ ] Superman — hold (A; source line 175)
- [ ] Superman — repetitions (A; source line 175)
- [ ] Superman — alternating arm/leg (A; source line 175)

### 10. Optional later exercises and coverage reconciliation — 4 source tasks

Status: PENDING

- [ ] Pike push-up (A; source line 45)
- [ ] Single-leg glute bridge (optional-list reference) (A; source line 45)
- [ ] Dead bug (A; source line 45)
- [ ] Hollow hold (A; source line 45)

## Decisions and exceptions to track

- Chest: all six names matched; user confirmed Cable Bench Chest Fly. Back batch has six matches and one explicitly flagged 60-degree row. All results are in exercise-mapping-batch-01-review.md.
- Split Leg press (or goblet squat), Reverse preacher curl or behind-the-body cable curl, and Overhead cable or rope extension into candidates. Slash labels like pec deck/machine fly may instead be synonyms.
- Clarify unspecified leg-curl/hip-thrust/calf-machine equipment, cable attachments, walking-lunge load and chest-supported row equipment.
- Neutral versus close grip are different attributes; confirm both. Lean-back amount and bench angles need movement review, not automatic slug suffixes.
- Different rep counts, light load, hold durations and pause lengths do not automatically create new identities. Two incline push-up heights may be one exercise with different setup guidance.
- Superman hold versus repetitions and calf step-edge variants need deliberate identity/logging decisions.
- Optional single-leg glute bridge repeats a support progression; reuse the same canonical record.
- Warm-up light/medium sets are prescriptions on the chosen lift, not new exercises. General form cues and Bodyweight ↔ gym links are cross-references, not extra records.
- The ankle-stretch/mobility reference points to another document not supplied. Log it as an external dependency; do not invent its contents.

## Final reconciliation gate

- All source rows and named variants accounted for; synonyms/repeats map to the same verified source entry.
- Exact names come only from verified MuscleWiki pages; gaps remain explicit rather than guessed.
- Proposed slug uniqueness, source reference validity and original-label coverage checked. No generated UUIDs in this review.
- Review names, proposed slugs and Phase 1 inclusion together. Assign and preserve UUIDs later in the seed manifest.
- No migration/seed import until the naming manifest is reviewed.

Batch 02 clarified: straight-bar narrow grip for beginner pulldown; both supported rows use dumbbells. Keep 60-degree row flagged; proceed to batch 03.

Batch 03 user decisions: seated curl, dumbbell hip thrust, elevated-surface calves without machine, dumbbell walking lunges; keep step-down flagged. Resumed November 3, 2026.

November 3 resume: completed calf/hip-thrust follow-up; walking lunge remains unmatched. Batch 04 researched and added to the existing cumulative review.

User accepted Dumbbell Forward Lunge as related reference for Walking lunge; retain source execution difference and defer final slug. Cable lateral raise confirmed.

Batch 05: do not split cable versus rope into different exercises automatically; rope is a cable attachment. Reverse preacher clarified as pronated curl on sloped pad; EZ-bar source selected. Straight-bar pushdown and rope overhead extension selected.

Mapping paused by user on November 3, 2026 after Batch 06 disposition. Resume at Batch 07 only when requested.

November 3, 2026: resumed Batch 07. All 15 tasks researched; 9 matched, wall source user-selected pending page verification, ring archer accepted as related source, negative push-up deferred by user, 2 no exact match, steep inverted row needs setup clarification. Two incline heights share one canonical proposal with separate library setup notes. Other exceptions remain open. Next research batch: 08. See cumulative review for sources and draft instructions.
