-- CreateEnum
CREATE TYPE "LoggingMethod" AS ENUM ('REPS_WEIGHT', 'DONE_ONLY');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('BEGINNER', 'INTERMEDIATE');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('GYM', 'HOME');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('BUILD_MUSCLE', 'GENERAL_FITNESS');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "securityStamp" UUID NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phoneVerifiedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" UUID NOT NULL,
    "heightCm" DECIMAL(5,2) NOT NULL,
    "weightKg" DECIMAL(6,2) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "goal" "Goal" NOT NULL,
    "experience" "Experience" NOT NULL,
    "location" "Location" NOT NULL,
    "trainingDays" INTEGER NOT NULL,
    "deskJob" BOOLEAN,
    "painAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "postureConcerns" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "timeZone" TEXT NOT NULL,
    "reminderEnabled" BOOLEAN NOT NULL DEFAULT false,
    "reminderTime" VARCHAR(5),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "securityStamp" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "revokedAt" TIMESTAMPTZ(3),
    "isUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "loggingMethod" "LoggingMethod" NOT NULL,
    "muscles" TEXT[],
    "experience" "Experience" NOT NULL,
    "locations" "Location"[],
    "instructions" TEXT[],
    "commonMistakes" TEXT[],
    "mediaUrl" TEXT,
    "mediaType" TEXT,
    "progressionChain" JSONB,
    "recommendedSets" INTEGER,
    "recommendedReps" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanTemplate" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "experience" "Experience" NOT NULL,
    "location" "Location" NOT NULL,
    "trainingDays" INTEGER NOT NULL,

    CONSTRAINT "PlanTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanTemplateDay" (
    "id" UUID NOT NULL,
    "templateId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "focus" TEXT NOT NULL,
    "weekday" "Weekday",

    CONSTRAINT "PlanTemplateDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanTemplateSection" (
    "id" UUID NOT NULL,
    "dayId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlanTemplateSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanTemplateExercise" (
    "id" UUID NOT NULL,
    "sectionId" UUID NOT NULL,
    "exerciseId" UUID NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlanTemplateExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "templateId" UUID NOT NULL,
    "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDaySwapRequest" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "payload" JSONB NOT NULL,
    "appliedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanDaySwapRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDay" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "focus" TEXT NOT NULL,
    "weekday" "Weekday",

    CONSTRAINT "PlanDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSection" (
    "id" UUID NOT NULL,
    "dayId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlanSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanExercise" (
    "id" UUID NOT NULL,
    "sectionId" UUID NOT NULL,
    "exerciseId" UUID NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlanExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExerciseProgress" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "exerciseId" UUID NOT NULL,
    "currentStageId" UUID,
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "UserExerciseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseStage" (
    "id" UUID NOT NULL,
    "progressId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "targetSets" INTEGER NOT NULL,
    "targetReps" INTEGER NOT NULL,
    "targetWeightKg" DECIMAL(7,2),
    "sessionsToStay" INTEGER NOT NULL,

    CONSTRAINT "ExerciseStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "sourceDayId" UUID NOT NULL,
    "startedAt" TIMESTAMPTZ(3) NOT NULL,
    "endedAt" TIMESTAMPTZ(3) NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "timeZone" TEXT NOT NULL,
    "autoClosed" BOOLEAN NOT NULL DEFAULT false,
    "payloadHash" TEXT NOT NULL,
    "receivedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" UUID NOT NULL,
    "workoutId" UUID NOT NULL,
    "exerciseId" UUID NOT NULL,
    "nameSnapshot" TEXT NOT NULL,
    "muscleSnapshot" TEXT[],
    "sectionName" TEXT NOT NULL,
    "sectionPosition" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "loggingMethod" "LoggingMethod" NOT NULL,
    "stageId" UUID,
    "targetSnapshot" JSONB NOT NULL,
    "doneAt" TIMESTAMPTZ(3),
    "activityDate" DATE,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSet" (
    "id" UUID NOT NULL,
    "workoutExerciseId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "targetReps" INTEGER,
    "targetWeightKg" DECIMAL(7,2),
    "actualReps" INTEGER,
    "actualWeightKg" DECIMAL(7,2),
    "doneAt" TIMESTAMPTZ(3),
    "activityDate" DATE,

    CONSTRAINT "WorkoutSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSessionCredit" (
    "id" UUID NOT NULL,
    "workoutId" UUID NOT NULL,
    "progressId" UUID NOT NULL,
    "stageId" UUID NOT NULL,
    "creditedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ExerciseSessionCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_slug_key" ON "Exercise"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTemplate_key_version_key" ON "PlanTemplate"("key", "version");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTemplateDay_templateId_position_key" ON "PlanTemplateDay"("templateId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTemplateDay_templateId_weekday_key" ON "PlanTemplateDay"("templateId", "weekday");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTemplateSection_dayId_position_key" ON "PlanTemplateSection"("dayId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTemplateExercise_sectionId_position_key" ON "PlanTemplateExercise"("sectionId", "position");

-- CreateIndex
CREATE INDEX "Plan_userId_activatedAt_idx" ON "Plan"("userId", "activatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_id_userId_key" ON "Plan"("id", "userId");

-- CreateIndex
CREATE INDEX "PlanDaySwapRequest_planId_idx" ON "PlanDaySwapRequest"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanDay_id_planId_key" ON "PlanDay"("id", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanDay_planId_position_key" ON "PlanDay"("planId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PlanDay_planId_weekday_key" ON "PlanDay"("planId", "weekday");

-- CreateIndex
CREATE UNIQUE INDEX "PlanSection_dayId_position_key" ON "PlanSection"("dayId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PlanExercise_sectionId_position_key" ON "PlanExercise"("sectionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseProgress_userId_exerciseId_key" ON "UserExerciseProgress"("userId", "exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseStage_id_progressId_key" ON "ExerciseStage"("id", "progressId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseStage_progressId_position_key" ON "ExerciseStage"("progressId", "position");

-- CreateIndex
CREATE INDEX "Workout_userId_startedAt_idx" ON "Workout"("userId", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_workoutId_sectionPosition_position_key" ON "WorkoutExercise"("workoutId", "sectionPosition", "position");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutSet_workoutExerciseId_position_key" ON "WorkoutSet"("workoutExerciseId", "position");

-- CreateIndex
CREATE INDEX "ExerciseSessionCredit_stageId_idx" ON "ExerciseSessionCredit"("stageId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSessionCredit_workoutId_progressId_key" ON "ExerciseSessionCredit"("workoutId", "progressId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanTemplateDay" ADD CONSTRAINT "PlanTemplateDay_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PlanTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanTemplateSection" ADD CONSTRAINT "PlanTemplateSection_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "PlanTemplateDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanTemplateExercise" ADD CONSTRAINT "PlanTemplateExercise_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "PlanTemplateSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanTemplateExercise" ADD CONSTRAINT "PlanTemplateExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PlanTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDaySwapRequest" ADD CONSTRAINT "PlanDaySwapRequest_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDay" ADD CONSTRAINT "PlanDay_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSection" ADD CONSTRAINT "PlanSection_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "PlanDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "PlanSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseProgress" ADD CONSTRAINT "UserExerciseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseProgress" ADD CONSTRAINT "UserExerciseProgress_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseProgress" ADD CONSTRAINT "UserExerciseProgress_currentStageId_id_fkey" FOREIGN KEY ("currentStageId", "id") REFERENCES "ExerciseStage"("id", "progressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseStage" ADD CONSTRAINT "ExerciseStage_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "UserExerciseProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_planId_userId_fkey" FOREIGN KEY ("planId", "userId") REFERENCES "Plan"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_sourceDayId_planId_fkey" FOREIGN KEY ("sourceDayId", "planId") REFERENCES "PlanDay"("id", "planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "ExerciseStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSessionCredit" ADD CONSTRAINT "ExerciseSessionCredit_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSessionCredit" ADD CONSTRAINT "ExerciseSessionCredit_stageId_progressId_fkey" FOREIGN KEY ("stageId", "progressId") REFERENCES "ExerciseStage"("id", "progressId") ON DELETE RESTRICT ON UPDATE CASCADE;
