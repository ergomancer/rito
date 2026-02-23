import type { Request, Response } from "express";
import { createUser as create } from "../services/account-management";

export async function createUser(req: Request, res: Response) {
  await create(req.body);
  res.status(200).json({
    message: "User created",
  });
}
