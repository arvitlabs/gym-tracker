# Exercise identity and slug proposal

November 1, 2026 · Draft for review; not yet applied to schema or seeds.

## Inventory first

The adjacent inventory contains 876 source entries: 584 strength, 123 stretching, 61 plyometrics, 38 powerlifting, 35 Olympic weightlifting, 21 strongman and 14 cardio. It is a reference pool, not every exercise in existence or the Phase 1 release list. “Normal” is interpreted as home/bodyweight, warm-up, mobility and stretching.

Source: https://github.com/yuhonas/free-exercise-db
Data: https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json
License: https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE.md (Unlicense).
Retrieved November 1, 2026; snapshot digest recorded in exercise-inventory.json. Only names and classification metadata retained, not media or instructions.

199 records have missing or “other” equipment. Source labels are not trusted as canonical names. All entries need identity and scope review. Name-normalized candidates have no exact collisions; this does not establish semantic uniqueness.

## Identity

- Database ID: permanent UUID, used by plans, personal progression and history. Every table gets a UUID ID; combined uniqueness rules remain constraints.
- Slug: unique stable human-readable key. Never replace the UUID with a source ID or slug.
- Display name: readable label, independently editable.
- Aliases: alternate names/spellings for search; not extra exercises. Ambiguous names like “squat” must not silently identify one variant.
- External references: source + sourceId map to our UUID after review; preserve provenance separately from identity.

## Proposed format

`equipment[-position]-movement[-grip][-execution][-assistance]`

Omit optional qualifiers unless they distinguish a supported variant. Movement names are curated phrases, not arbitrary word splitting. Slugs are labels, not a format the app parses to discover equipment or other attributes.

- Lowercase ASCII words, single hyphens; no spaces, punctuation, arbitrary numeric suffixes or underscores.
- Explicit equipment for gym variants; bodyweight for unweighted bodyweight movements; mobility/stretching can use their established movement names where equipment adds no distinction.
- Equipment vocabulary starts with barbell, dumbbell, ez-bar, cable, machine, smith-machine, kettlebell, band, bodyweight, suspension-trainer, foam-roller. Add equipment deliberately when needed.
- Positions include flat, incline, decline, seated, standing, prone, supine and kneeling where meaningful.
- Use one term consistently: single-arm/single-leg, alternating, neutral-grip, pronated-grip, supinated-grip. Left/right executions share one exercise when they share a prescription.
- Numeric angles are used only for a deliberately distinct variant (e.g. 45-degree); do not split every adjustable bench angle automatically.
- Exclude sets, reps, load, stage, goal, difficulty, gym/home, language, date and template name. Those are separate data.

Examples:
- Barbell Flat Bench Press → barbell-flat-bench-press
- Dumbbell Flat Bench Press → dumbbell-flat-bench-press
- Dumbbell Incline Bench Press → dumbbell-incline-bench-press
- Dumbbell Incline Bench Press, Neutral Grip → dumbbell-incline-bench-press-neutral-grip
- Dumbbell Single-Arm Row → dumbbell-row-single-arm
- Cable Seated Row, Neutral Grip → cable-seated-row-neutral-grip
- Barbell Back Squat → barbell-back-squat
- Bodyweight Squat → bodyweight-squat
- Standard Push-Up → bodyweight-push-up
- Incline Push-Up → bodyweight-incline-push-up
- Pull-Up → bodyweight-pull-up
- Machine-Assisted Pull-Up → machine-pull-up-assisted
- Standing Quadriceps Stretch → standing-quadriceps-stretch
- Cat-Cow → cat-cow

## Same exercise or new variant?

Same UUID: display rename, spelling correction, translated name, new instructions/media, progression stage change, load/reps change, switching plan or weekday.

Separate UUID: materially different movement, equipment, assistance mechanism, or execution that should have separate targets/history. Grip/angle/unilateral differences become variants only when intentionally supported; no automatic combination explosion.

Review before import: weighted versus unweighted bodyweight movements, assisted machines, cable attachments, and single-arm versus bilateral movements. For each, define what logged kilograms mean (total load, per implement, or assistance). Names alone cannot settle this. Home location still means the spec's available equipment, not permission to add dumbbells to every home plan.

## Lifecycle and duplicate prevention

1. Search names, aliases and variants before adding an entry.
2. Review equipment/movement/variant and merge equivalent source entries into one canonical record.
3. Assign canonical display name and slug explicitly; reject duplicate slugs.
4. Assign UUID once in a committed seed manifest; reruns preserve it. Slug-only upserts must never recreate a renamed exercise with a new UUID.
5. Freeze the slug once used. A rare correction needs an explicit migration/old-key mapping; never silently regenerate it or reuse a retired slug.
6. New variants get a new UUID/slug. Retiring an exercise preserves its history. Duplicate merges require an explicit progression/history conflict review, never silent deletion.

## Review order

1. Chest/pushing.
2. Back/pulling.
3. Shoulders and arms.
4. Legs and hips.
5. Core and bodyweight.
6. Warm-up, mobility and stretches.
7. Cardio/advanced specialties: retain as reference; decide later what fits Phase 1.

For each group: approve the canonical names/variants, aliases, slugs, logging method and load meaning. Then create the small Phase 1 seed library. None of the 876 name-based candidates are approved canonical slugs yet.
