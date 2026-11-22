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

## Finish each coding task

In the response, briefly summarize the applicable rule areas consulted, the implementation, and checks actually performed. Do not claim a check was run unless it was run. Mention any unresolved application decision that affects the next step.
