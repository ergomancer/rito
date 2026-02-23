import type { Request, Response, NextFunction } from "express";
import { NotAuthenticated } from "../lib/definitions/errors";
import jwt from "jsonwebtoken";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    throw NotAuthenticated;
  } else {
    const token = authHead.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      process.env.AUTH_PRIVATE_KEY as string,
    );
    req = Object.assign(req, { user: decoded });
  }
  next();
}
