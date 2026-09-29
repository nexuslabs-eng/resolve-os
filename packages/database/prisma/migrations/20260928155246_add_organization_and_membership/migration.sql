-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OBSERVER', 'ENGINEER', 'INCIDENT_COMMANDER', 'ADMIN');

-- CreateEnum
CREATE TYPE "JobRole" AS ENUM ('SOFTWARE_ENGINEER', 'SITE_RELIABILITY_ENGINEER', 'DEVOPS_PLATFORM_ENGINEER', 'ENGINEERING_MANAGER', 'INCIDENT_COMMANDER', 'OTHER');

-- CreateEnum
CREATE TYPE "TeamSize" AS ENUM ('ONE_TO_FIVE', 'SIX_TO_TWENTY', 'TWENTY_ONE_TO_FIFTY', 'FIFTY_ONE_TO_TWO_HUNDRED', 'TWO_HUNDRED_PLUS');

-- CreateEnum
CREATE TYPE "PrimaryResponsibility" AS ENUM ('APPLICATION_ENGINEERING', 'RELIABILITY_SRE', 'PLATFORM_ENGINEERING', 'INFRASTRUCTURE', 'ENGINEERING_LEADERSHIP', 'OTHER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jobRole" "JobRole",
ADD COLUMN     "primaryResponsibility" "PrimaryResponsibility",
ADD COLUMN     "teamSize" "TeamSize";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_organizationId_key" ON "Membership"("userId", "organizationId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
