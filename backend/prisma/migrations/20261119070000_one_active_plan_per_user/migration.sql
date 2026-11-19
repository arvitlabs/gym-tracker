-- Prisma schema language cannot express a partial unique index.
-- Keep archived plan history while allowing only one active plan per user.
CREATE UNIQUE INDEX "Plan_one_active_per_user"
ON "Plan" ("userId")
WHERE "status" = 'ACTIVE';
