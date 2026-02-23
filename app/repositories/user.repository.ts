import { prisma } from "../prisma/lib/prisma";
import { Prisma } from "../prisma/generated/client";
import { getProfile } from "./profile.repository";
import { DatabaseError } from "../lib/definitions/errors";

//query to create a new user
export async function createUser(data: Prisma.UserCreateArgs) {
  const user = await prisma.user.create(data).catch((err) => {
    console.log(err);
    throw DatabaseError;
  });
  return user;
}

//query to get user by userid
export async function getUserByUserId(userId: string) {
  const user = await prisma.user
    .findUnique({
      where: { userId },
    })
    .catch((err) => {
      console.log(err);
      throw DatabaseError;
    });
  return user;
}

//query to get user by username
export async function getUserByUsername(username: string) {
  const profile = await getProfile(username);
  const user = profile ? await getUserByUserId(profile.userId) : profile;
  return user;
}

//query to get user by email
export async function getUserByEmail(email: string) {
  const user = await prisma.user
    .findUnique({
      where: { email },
    })
    .catch((err) => {
      console.log(err);
      throw DatabaseError;
    });
  return user;
}
