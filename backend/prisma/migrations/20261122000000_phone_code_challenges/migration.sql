CREATE TYPE "PhoneCodePurpose" AS ENUM ('SIGN_UP', 'LOGIN', 'RECOVERY');

CREATE TABLE "PhoneCodeChallenge" (
    "id" UUID NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "purpose" "PhoneCodePurpose" NOT NULL,
    "verifier" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "consumedAt" TIMESTAMPTZ(3),
    CONSTRAINT "PhoneCodeChallenge_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "PhoneCodeChallenge_attempts_check" CHECK ("attempts" >= 0)
);

CREATE INDEX "PhoneCodeChallenge_phone_purpose_createdAt_idx"
    ON "PhoneCodeChallenge"("phone", "purpose", "createdAt");
