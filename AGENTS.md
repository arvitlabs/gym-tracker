# Gym Tracker coding instructions

## Project stack

This project uses NestJS, Prisma, and PostgreSQL for the backend and React for the frontend. The repository is an npm workspace with `backend/` and `frontend/`. Check the relevant `package.json` files and existing code for installed versions and current patterns before changing code.

## Before changing code

- Read this repository's existing instructions and relevant product/specification docs first. Check `docs/epic-3-decisions.md` for settled application and data decisions when the task touches those areas.
- The central AI rules are in `/Users/alluririshivarma/Documents/GitHub/ai-rules`. Read its `RULES-INDEX.md` first, then the relevant domain index and only the rules needed for this task. Do not copy those rules into this repository.
- For backend work, use `/Users/alluririshivarma/Documents/GitHub/ai-rules/backend-nestjs/index.md`, its architecture overview, and task-specific rules.
- For Prisma schema, queries, transactions, or migrations, also read the relevant Prisma and PostgreSQL rules selected by the NestJS index.
- For frontend work, use `/Users/alluririshivarma/Documents/GitHub/ai-rules/frontend-react/index.md`, its feature-boundary rule, and task-specific rules.
- For full-stack work, consult both indexes. Read cross-cutting rules only when their topic applies.
- Do not apply Angular or .NET rules to this project unless the user explicitly asks.
- Follow existing project instructions, application decisions, and installed library versions. If a rule conflicts with the app's established architecture or a settled decision, flag the conflict and follow the project unless the user decides otherwise. Do not make an incompatible architectural change based only on a generic rule.

## Surface decisions in chat

The rule files include generic recommendations and open choices. Before implementation, compare relevant choices against project docs, current code, and dependency versions:

- If the project has already decided the point, use that decision.
- If it is an ordinary reversible implementation detail, choose the option that best fits the existing app.
- If it affects product behavior, security, data ownership or persistence, API compatibility, or a hard-to-reverse architecture choice and remains undecided, ask the user about that specific choice in chat before making a dependent change. Briefly state the options and consequences. Continue independent work that does not depend on the answer.
- Call out conflicts, assumptions, and unresolved choices in chat; do not silently treat draft rules as approved application decisions.

## React feature folders

- Under `frontend/src/features/<feature>/`, place screens in `pages/`, feature-owned controls in `components/`, and endpoint calls and response mapping in `data/`. Create each folder when it has a consumer.
- Keep temporary multi-page form drafts in a feature-owned module separate from session and API logic. Keep single-screen state with its screen.
- Material UI and shadcn/ui are available for frontend components. Use the shared MUI theme and Tailwind typography tokens to match the application design.
- Place layouts used across features in `frontend/src/components/layout/` and reusable UI primitives in `frontend/src/components/ui/`.

## UI references and components

- Before implementing a screen, consult the corresponding screen in `docs/prototype/phase1-prototype.html` and related product decisions. Match the prototype while applying the app's shared header, mobile typography and accessibility instructions.
- Prefer existing shadcn/ui or Material UI components for controls and interactions. If a needed component is unavailable, tell the user before building a new individual component.

## Mobile-first interface and typography

- Treat a 320 CSS-pixel-wide phone as the baseline, then scale layouts up at larger breakpoints.
- Use shared Tailwind typography tokens by text role (such as `text-body`, `text-title`, and `text-display`); keep phone defaults in the theme and centralize wider-screen size changes there instead of adding per-screen arbitrary sizes.
- Use fluid display sizes with a deliberate small-screen minimum; check that headings and labels wrap without clipping or horizontal scrolling. Keep ordinary body copy at 16px or larger on phones unless the design reference clearly requires otherwise.
- Avoid fixed-height content that can cut off text or controls. Keep touch controls comfortably tappable and keyboard focus visible.
- Before finishing a screen, inspect it at 320px and a common phone width such as 390px, then confirm it still scales at desktop width.

## Finish each coding task

In the response, briefly summarize the applicable rule areas consulted, the implementation, and checks actually performed. Do not claim a check was run unless it was run. Mention any unresolved application decision that affects the next step.
