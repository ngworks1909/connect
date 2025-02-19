-- CreateTable
CREATE TABLE "Contact" (
    "contactId" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://github.com/shadcn.png',

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contactId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_mobile_key" ON "Contact"("mobile");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
