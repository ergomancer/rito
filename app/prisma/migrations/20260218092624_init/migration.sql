-- CreateEnum
CREATE TYPE "Access" AS ENUM ('USER', 'AUTHOR', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('INSTAGRAM', 'X', 'FACEBOOK', 'REDDIT', 'DISCORD', 'GITHUB', 'LINKEDIN', 'MASTODON', 'BLUESKY');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'RETURNED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access" "Access" NOT NULL DEFAULT 'USER',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "canQuib" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "headline" TEXT,
    "bio" TEXT,
    "avatar" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Social" (
    "socialId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("socialId")
);

-- CreateTable
CREATE TABLE "Author" (
    "userId" TEXT NOT NULL,
    "hooked" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Series" (
    "seriesId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hooked" INTEGER NOT NULL DEFAULT 0,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("seriesId")
);

-- CreateTable
CREATE TABLE "Blog" (
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seriesId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contentFile" TEXT NOT NULL,
    "reads" INTEGER NOT NULL DEFAULT 0,
    "bumps" INTEGER NOT NULL DEFAULT 0,
    "spills" INTEGER NOT NULL DEFAULT 0,
    "submittedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT NOT NULL,
    "moderationStatus" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "moderationNote" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("blogId")
);

-- CreateTable
CREATE TABLE "Moderator" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Moderator_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Quib" (
    "quibId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bumps" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Quib_pkey" PRIMARY KEY ("quibId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Social_platform_username_key" ON "Social"("platform", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Series_name_key" ON "Series"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_contentFile_key" ON "Blog"("contentFile");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Author"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Author"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("seriesId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "Moderator"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quib" ADD CONSTRAINT "Quib_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quib" ADD CONSTRAINT "Quib_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("blogId") ON DELETE RESTRICT ON UPDATE CASCADE;
