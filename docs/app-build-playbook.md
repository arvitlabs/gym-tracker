# APP-BUILD-TEMPLATE: Idea to First Production Deploy
 
A fixed, reusable initiative structure for building any application, from the first idea to the first live deploy in production. Clone it into a real initiative every time you start a new app, fill in the tasks, and refine the template after each use.
 
**Hierarchy:** Initiative -> Epics -> Stories -> Tasks
- **Initiative:** one per app (cloned from this template)
- **Epics:** fixed, always the same six (below)
- **Stories:** fixed checklist per epic (below)
- **Tasks:** the only part you write fresh for each app
**Track:** LAB. This template is never sprinted itself. It is refined after each real app built with it.
 
---
 
## Guiding Principles
 
1. **Everything must be runnable, clickable, or testable.** If a deliverable is something you only read, it fails the test. Mockups you click through, schemas you run, acceptance criteria that become tests.
2. **Mockups replace user stories and flow documents.** The screens are the requirements. User stories are generated later by AI from approved mockups, at sprint planning, instead of written upfront.
3. **Schema will change, so version it from day one.** Every database change is a migration file in git. Nobody edits a database by hand in any environment.
4. **AI does the enumeration, you do the judgment.** AI is better than humans at listing edge cases and generating story breakdowns. You review, triage, and decide.
5. **Don't over-design upfront.** Model and plan only what the first release needs.
6. **Refine the template after every real use.** Version it (v1, v2, ...) and note what worked and what didn't.
---
 
## Overview
 
| Epic | Purpose | Main output |
|---|---|---|
| 1. Discovery | Decide what to build and what not to | One-page spec |
| 2. Design | Make the requirements visible | Approved mockups + design tokens |
| 3. Data & Architecture | Derive the technical shape from the mockups | Schema v1 as a migration, risk list, stack decisions |
| 4. Sprint Planning | Turn approved artifacts into work | Loaded first sprint |
| 5. Build | Implement in sprint cycles | Working app in staging |
| 6. Deploy | First production release | Live app, verified |
 
Flow: `Discovery -> Design -> Data & Architecture -> Sprint Planning -> Build -> Deploy`
 
Each epic has a **gate**: you don't start the next epic until the "Done when" condition of the current one is met.
 
---
 
## Epic 1: Discovery
 
**Goal:** Decide what we are building and, just as important, what we are not.
 
**Inputs:** An idea.
**Outputs:** A one-page spec.
 
### Stories
 
**1.1 Problem and user**
- [ ] Write one paragraph: who is this for, and what pain does it solve?
- [ ] Name the primary user type (and secondary, if any)
- [ ] Describe how they solve this problem today, and why that is not good enough
**1.2 Scope**
- [ ] List the core capabilities (target 5-8, no more for v1)
- [ ] List explicit non-goals (what v1 will NOT do)
- [ ] Define success criteria: how will you know the app works and is worth having? Make them concrete.
**1.3 Constraints and context**
- [ ] Note hard constraints: deadline, budget, team size, required integrations, compliance needs
- [ ] Note anything the app depends on that already exists (APIs, systems, data)
**1.4 One-page spec**
- [ ] Combine 1.1 to 1.3 into a single page
- [ ] Test: can you explain the app in two sentences?
**Done when:** the one-page spec exists, the core capabilities and non-goals are written down, and you can explain the app in two sentences.
 
**AI usage:** Brainstorm with Claude to challenge scope ("what is the smallest version that still solves the problem?") and to surface missing constraints.
 
---
 
## Epic 2: Design
 
**Goal:** Make the requirements visible. The screens are the requirements.
 
**Inputs:** One-page spec.
**Outputs:** Approved mockups covering the happy path, plus design tokens.
 
**Why this replaces Requirements:** a mockup shows what the user sees, what data is involved, and where each action leads. The user flow is already inside it. Walking through the screens exposes problems much sooner than reviewing a flow document does.
 
### Stories
 
**2.1 Mockups of key screens**
- [ ] Identify the key screens needed for the core capabilities (not every screen)
- [ ] Build mockups in Claude Design
- [ ] Cover the main happy path from start to finish for each core capability
- [ ] Include the empty states for screens that list or display data
**2.2 Flow walkthrough**
- [ ] Click through the full flow screen by screen as the primary user
- [ ] Note every place where a step feels wrong, missing, or confusing
- [ ] Fix the mockups and walk through again
- [ ] Repeat until no broken steps remain
**2.3 Design tokens**
- [ ] Define colors, typography, spacing, and basic component styles
- [ ] Record them in one place so the build stays visually consistent
**2.4 Capture hidden rules**
Mockups show the visible path but hide some things. While reviewing the screens, write down (briefly) any rules that have no screen:
- [ ] Permissions (who can see or do what)
- [ ] Validations (what input is allowed)
- [ ] Background jobs or scheduled work
- [ ] Integrations with other systems
- [ ] What happens on failure (errors, timeouts, offline)
**Done when:** you have walked the full flow in the mockups without finding a broken step, and the hidden rules are listed.
 
**AI usage:** Generate mockup variations quickly and react to real screens instead of descriptions. Ask Claude to review the mockups for missing screens or unclear steps.
 
---
 
## Epic 3: Data & Architecture
 
**Goal:** Derive the technical shape from the approved mockups.
 
**Inputs:** Approved mockups, hidden rules list, one-page spec.
**Outputs:** Schema v1 as the first migration, seed data, CI migration step, risk list, stack and infra decisions.
 
### Stories
 
**3.1 Schema v1**
- [ ] Derive the entities and fields from the data shown on the mockup screens
- [ ] Model only what the first release needs. Do not design for imagined future features.
- [ ] Define relationships and constraints (keys, required fields, uniqueness)
- [ ] Validate by running it: write the 10-15 queries the app will actually need. If a query is awkward, the model is wrong, so fix it.
**3.2 Migration setup**
- [ ] Choose the migration tool that matches the stack (for example EF Core migrations, Prisma, Alembic, Flyway)
- [ ] Create schema v1 as the **first migration**
- [ ] Add seed data, also versioned, so any environment can be rebuilt from scratch
- [ ] Add a CI step that applies migrations automatically
- [ ] Generate the data model diagram from the schema (ERD tool or ORM output) so it cannot go stale
**3.3 Risk review**
- [ ] Give Claude the mockups, the hidden rules, and the schema
- [ ] Ask it to act as a skeptical reviewer and list: failure modes, concurrency issues, permission gaps, empty/huge/invalid inputs, and what happens when related data is deleted
- [ ] Triage every item into one of three buckets: **handle now**, **handle later**, **ignore**
- [ ] Turn "handle now" items into stories for sprint planning
**3.4 Stack and infra decisions**
- [ ] Language and framework (backend and frontend)
- [ ] Database
- [ ] Authentication approach
- [ ] Hosting and environments (local, staging, prod)
- [ ] Any third-party services
- [ ] Draw a simple architecture diagram (boxes and arrows, one page)
- [ ] Record each decision with a one-line reason
**Done when:** the schema runs from scratch on an empty database through migrations, the risk review is triaged, and the stack is decided.
 
### Schema change rules (apply from here onward)
 
1. Every change is a migration file, committed in the same PR as the code that needs it.
2. No manual database edits in any environment.
3. Migrations run through CI/CD, so local, staging, and prod stay in sync.
4. Once in prod, use **expand/contract** for risky changes: add the new column as nullable, backfill it, switch the code over, and drop the old column in a later release. Each step stays backward compatible.
5. Take a backup before any destructive migration.
(Rules 4 and 5 only matter after the first prod deploy. Until then, rules 1 to 3 are enough.)
 
---
 
## Epic 4: Sprint Planning
 
**Goal:** Turn the approved artifacts into work.
 
**Inputs:** Approved mockups, schema v1, risk list, stack decisions.
**Outputs:** The first sprint, loaded and ready.
 
### Stories
 
**4.1 AI-generated stories**
- [ ] Give Claude the mockups, schema, and "handle now" risk items
- [ ] Have it generate user stories with acceptance criteria written as Given/When/Then
- [ ] Review and edit them. Remove anything outside the one-page spec's scope.
**4.2 Task breakdown**
- [ ] Break each story into tasks
- [ ] Make sure the setup work is included: repo, CI pipeline, environments, migration tooling
**4.3 Sprint sizing and loading**
- [ ] Estimate using your existing sprint system
- [ ] Order the work so the thinnest end-to-end slice is built first
- [ ] Load the first sprint
**4.4 Traceability check**
- [ ] Confirm every story traces back to a screen, a schema change, or a risk item
- [ ] Anything that traces to nothing is scope creep, so remove it
**Done when:** the first sprint is loaded and every story traces back to a screen or a schema change.
 
**AI usage:** This is the stage where user stories are generated, not written by hand, and they become the build tasks directly.
 
---
 
## Epic 5: Build
 
**Goal:** Implement the app in sprint cycles.
 
**Inputs:** Loaded sprint, mockups, schema, design tokens.
**Outputs:** Core capabilities working end to end in staging.
 
### Stories
 
**5.1 Project foundation**
- [ ] Repo structure, linting, formatting, branch strategy
- [ ] CI pipeline running build and tests on every PR
- [ ] Staging environment available
**5.2 Sprint cycles (repeat per sprint)**
- [ ] Implement stories in priority order
- [ ] Write tests as you go
- [ ] Demo working software at the end of each sprint
- [ ] Adjust the next sprint based on what the demo showed
**5.3 Quality gates**
- [ ] Acceptance criteria from sprint planning become real automated tests
- [ ] "Handle now" risk items are covered by tests where possible
### Standing rules for Build
 
1. **A model change without a migration in the same PR does not merge.**
2. Acceptance criteria are tests, so a story is done only when its tests pass.
3. The mockups are the reference for UI. If the implementation needs to differ, update the mockup in the same PR.
**Done when:** the core capabilities from the Discovery spec work end to end in staging.
 
**AI usage:** Use Claude for implementation, test writing, and code review within each sprint.
 
---
 
## Epic 6: Deploy
 
**Goal:** First production release.
 
**Inputs:** App working in staging.
**Outputs:** Live app in production, verified.
 
### Stories
 
**6.1 CI/CD pipeline**
- [ ] Automated build, test, and deploy
- [ ] Migrations run automatically as part of deploy
- [ ] Deploys to staging first, then prod
**6.2 Production environment**
- [ ] Environment configuration and secrets management (no secrets in git)
- [ ] Production database created through migrations
- [ ] Backups enabled and a restore tested at least once
- [ ] Domain, HTTPS, and any required DNS
**6.3 First deploy and smoke test**
- [ ] Deploy to prod
- [ ] Run through the critical flows manually in prod (the core capabilities from the spec)
- [ ] Confirm the data is being written correctly
**6.4 Post-launch checklist**
- [ ] Monitoring and error alerts in place
- [ ] Logs accessible
- [ ] Rollback plan written and understood (how to revert the code and what happens to migrations)
- [ ] Note known issues and "handle later" risk items as the backlog for the next iteration
**Done when:** the app is live in prod and you have confirmed the core flow works there.
 
---
 
## Cloning This Template for a New App
 
1. Create a new initiative, named after the app.
2. Copy the six epics and their story checklists into it.
3. Replace the generic items with app-specific tasks as each epic begins. Do not pre-write tasks for later epics.
4. Work through the epics in order, respecting each gate ("Done when").
5. When the app is live, run the retrospective below.
## Retrospective (after each app)
 
Spend 20 minutes answering these, then update this template:
 
- Which stories did we skip or never use? Remove or shrink them.
- What problem appeared late that an earlier story should have caught? Add a check.
- Where did AI save the most time? Where did it mislead us?
- Did the mockups actually catch the flow problems, or did we find them in Build?
- Was the schema stable, or did migrations pile up early? What did that tell us?
Record the answer and bump the version below.
 
## Version History
 
| Version | Date | Notes |
|---|---|---|
| v1 | 2026-10-12 | Initial structure: six epics, mockup-first design, migration-first data |
