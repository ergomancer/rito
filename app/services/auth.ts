import { NotAuthenticated } from "../lib/definitions/errors";
import { getUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function auth({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await getUserByEmail(email);

  let match;
  if (!user) {
    //protection against timing attacks
    await bcrypt.compare(email, password);
  } else {
    match = (await bcrypt.compare(password, user.password)) ? user : null;
  }

  if (!match) {
    throw NotAuthenticated;
  } else {
    const token = jwt.sign(
      {
        userId: match.userId,
        access: match.access,
        isVerified: match.isVerified,
        canQuib: match.canQuib,
      },
      process.env.AUTH_PRIVATE_KEY as string,
      {
        expiresIn: "7d",
        //TODO: Very insecure but since an account here is not sensitive, it works. Reduce to 10-15m when implementing a refresh token mechanism.
      },
    );
    return token;
  }
}
