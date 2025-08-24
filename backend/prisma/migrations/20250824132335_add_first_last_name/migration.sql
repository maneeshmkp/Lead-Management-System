-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "firstname" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'User';
