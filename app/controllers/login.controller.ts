import type { Request, Response } from "express";
import { auth } from "../services/auth";

export async function login(req: Request, res: Response) {
  const token = await auth(req.body);
  res.status(200).json({
    token,
    message: "You have logged-in successfully!",
  });
}
