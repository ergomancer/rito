import { DatabaseError } from "../lib/definitions/errors";
import { prisma } from "../prisma/lib/prisma";

//query to check whether a username exists
export async function usernameExists(username: string) {
  const count = await prisma.profile
    .count({ where: { username } })
    .catch((err) => {
      console.error(err);
      throw DatabaseError;
    });
  return count;
}

//query to get profile by username
export async function getProfile(username: string) {
  const profile = await prisma.profile
    .findUnique({ where: { username } })
    .catch((err) => {
      console.log(err);
      throw DatabaseError;
    });
  return profile;
}
