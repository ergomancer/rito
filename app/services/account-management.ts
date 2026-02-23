import { UsernameTaken } from "../lib/definitions/errors";
import type { Prisma } from "../prisma/generated/client";
import { usernameExists } from "../repositories/profile.repository";
import { createUser as create } from "../repositories/user.repository";
import { hash } from "bcrypt";

//service to create user
export async function createUser(
  data: Prisma.UserCreateInput & { username: string },
) {
  const taken = await usernameExists(data.username);
  if (!taken) {
    data.password = await hash(data.password, 11);
    const { username, ...user } = data;
    Object.assign(user, {
      profile: { create: { username } },
    });
    await create({
      data: user,
      include: { profile: true },
    });
  } else throw UsernameTaken;
}
