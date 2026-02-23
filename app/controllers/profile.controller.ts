import type { Request, Response } from "express";
import { getProfile as fetch } from "../services/profile";

export async function getProfile(req: Request, res: Response) {
  const profile = await fetch(req.params.username as string);
  res.status(200).json({
    profile,
    message: profile ? "Profile found!" : "No profile found",
  });
}
