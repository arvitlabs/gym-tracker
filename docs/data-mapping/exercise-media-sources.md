# Exercise media sources

Checked November 1, 2026. Research, not a selected provider or purchase.

## Required experience

- Exercise demonstration: GIF, short looping video or photos, paired with the correct exercise variant.
- Separate YouTube explanation chosen by the app owner; use official embed or outbound link. YouTube needs internet; do not download its videos for offline use.
- Own UUID and canonical slug remain independent of a provider’s names/IDs.

## Shortlist

1. ExerciseDB / AscendAPI free API: about 1,500 exercise names, metadata and 180p GIFs. No API key advertised. Free use is restricted to non-commercial projects, attribution required, strict rate limits. Best candidate for private testing; confirm caching/offline media rights and actual quotas before integration. Free access is not an unrestricted media licence.
   - https://oss.exercisedb.dev/docs
   - https://exercisedb.dev/
2. Existing Free Exercise DB: names, metadata and exercise photos, not animated demonstrations. Repository declares Unlicense; our 876-entry inventory is based on this source. Useful free photo fallback, subject to per-asset review.
   - https://github.com/yuhonas/free-exercise-db
   - https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE.md
3. MuscleWiki: names, videos and preview images. Free plan is browser Playground only; app API access starts at $10/month for testing, Growth at $39.99/month. Standard terms allow video streaming but prohibit permanent media storage/rehosting. Poor fit if offline demonstrations are required. Preserve branding and required attribution.
   - https://api.musclewiki.com/pricing
   - https://api.musclewiki.com/faq
4. Gym visual: named exercise GIFs, videos and illustrations; paid media licensing permits website/app use. Check selected pack price and permission for app-side offline caching before purchase. Public previews are not licensed production assets. Do not scrape the site.
   - https://gymvisual.com/
   - https://gymvisual.com/content/3-terms-and-conditions-of-use

Similarly named ExerciseDB.io separately advertises a downloadable names+GIF bundle ($199 Starter / $599 Pro one-time), self-hosting and commercial use. Do not assume its licence or content rights are the same as AscendAPI’s service; verify the seller’s asset rights and included EULA before purchase.
- https://exercisedb.io/
- https://exercisedb.io/faq

## Proposed Phase 1 approach

Evaluate ExerciseDB’s free GIF API for non-commercial testing; retain existing inventory as a reference. Select a small exercise set and manually match exact variants before finalizing canonical names/slugs. Do not automatically merge records by similar names. Provider unavailable/offline: preserve workout logging and show text or permitted cached photos.

YouTube explanations are separately curated. Embedding must be enabled; keep an ordinary watch link as fallback if a video becomes unavailable. No YouTube Data API is necessary simply to store a chosen video ID and display an embed.
- https://support.google.com/youtube/answer/171780
- https://developers.google.com/youtube/terms/developer-policies-guide

## Proposed data change, pending schema review

Current Exercise.mediaUrl/mediaType supports one asset only. Prefer an ExerciseMedia child table with UUID id, exerciseId, role (DEMO/EXPLANATION), media kind, URL or YouTube ID, provider/source ID, attribution/licence reference and ordering. One exercise can then have a demo, fallback photo and detailed explanation. Keep media bytes outside PostgreSQL; store references. Cache only when source rights permit. This table has not been added yet.

## Public MuscleWiki website clarification

Checked November 1, 2026: https://musclewiki.com/terms has a separate Copyright Notice permitting videos, instructional text and muscle information to be shared for non-profit or academic use with MuscleWiki branding and links. This differs from the API terms. It excludes image assets and muscle maps; rights are revocable. Browser download capability alone is not a licence. Whether a private prototype intended for later commercial launch falls within that permission needs clarification; do not label all free/private testing non-profit automatically.

Media scope: only unique exercises used in the approved Phase 1 four-/five-day plans, including warm-up/stretch entries. Reuse one matched demo when an exercise repeats. Broader inventory remains reference only; this media decision does not remove existing experience/home/gym variants from product scope. No media downloaded yet.
