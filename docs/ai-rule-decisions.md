# Gym Tracker decisions on shared AI rules

Use this log when a central rule leaves a choice open or Gym Tracker adapts it. Rule paths below are relative to the central ai-rules repository identified in [AGENTS.md](../AGENTS.md). The [application decisions](epic-3-decisions.md) cover product behavior.

| Central rule and guidance | Gym Tracker decision and reason | Implementation status |
| --- | --- | --- |
| `backend-nestjs/01-architecture/data-layer-placement-rules.md` allows direct use of a shared database provider for simple access and feature-owned repositories for more complex persistence. | Use an account repository for user queries, session persistence and atomic database operations. Shared infrastructure owns the connection lifecycle. The account service owns password checks and sign-in decisions. | Implemented. The account repository and health check share one Nest-managed Prisma client. Verified signup, duplicate signup, login, concurrent refresh, and device-specific logout against PostgreSQL. |
| `backend-nestjs/02-api/api-response-contract-rules.md` requires consistent HTTP statuses and documented response shapes. The envelope is a project choice. | Adopt `{ success, data, error }` for backend JSON responses. Keep HTTP status meaningful and the refresh credential in its cookie. Successful responses set error to null. Failed responses set data to null. | Implemented globally for JSON endpoints through a shared interceptor and exception filter. Logout returns HTTP 204. |
| `backend-nestjs/02-api/authentication-session-rules.md` calls for server-side validation, expiry and revocation. | Personal accounts use a short-lived access token in memory and a rotating refresh credential in an HttpOnly cookie. A normal logout revokes one device. | Implemented for development. Deployment-specific browser settings remain open. |
| `frontend-react/04-ui-styling/shared-ui-and-design-token-rules.md` recommends reusable controls and shared style tokens. | Use shadcn/ui with Tailwind. Keep responsive type sizes in named tokens so account screens and future screens share the same mobile defaults. | Implemented in the frontend. |

## Custom error ownership

The central NestJS exception-handling and API-response rules require safe messages, meaningful HTTP statuses and translation at the transport boundary. They leave the error catalog and folder layout to the project.

Gym Tracker groups custom errors by what the failure means. A feature owns its business errors and their HTTP mappings in `features/<feature>/errors/`. For example, the account repository translates the phone uniqueness violation into `PhoneAlreadyRegisteredError` and preserves the database cause. Any caller can let it reach the global filter.

An error that has the same meaning across features belongs in `shared/errors/`. Its public status and message belong in `shared/http/shared-error-responses.ts`. For example, a protected operation that requires a valid session can raise `AuthenticationRequiredError`. The application registry combines shared and feature mappings. The global filter translates them once and retains the existing public HTTP status names in `error.code`. Unexpected failures follow the filter’s safe 500 fallback.

## Candidates for the central rules

- Add an optional two-scope error catalog example to `backend-nestjs/05-cross-cutting/exception-handling-rules.md` showing a feature-owned conflict, a shared authentication failure, and one HTTP filter consuming both.

- Once the account refactor is verified, consider adding a small NestJS example showing one shared database provider and a feature-owned transaction that creates both an account and its session.
- Once the response contract is verified with the frontend, consider adding the envelope as an optional NestJS example, including a 401 failure.
- For future entries, record the source rule, local choice, reason and implementation status. Promote a choice to the central rules only where it also helps other projects.
