/*
  Warnings:

  - A unique constraint covering the columns `[userId,mobile]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_mobile_key" ON "Contact"("userId", "mobile");
