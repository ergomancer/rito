import type { Request, Response, NextFunction } from "express";
import type { ExtendedError } from "../lib/definitions/errors";

export default async function errorHandler(
  err: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(err.statusCode || 500).json({
    name: err.name,
    message: err.message,
  });
}
