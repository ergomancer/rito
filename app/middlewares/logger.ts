import type { Request, Response, NextFunction } from "express";

export function log(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  next();
}
