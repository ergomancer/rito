import type { Request, Response, NextFunction } from "express";
import { InvalidData } from "../lib/definitions/errors";
import type { ZodObject } from "zod";

export function validate(Schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const formData = req.body;
    const validatedFields = Schema.safeParse(formData);
    if (!validatedFields.success) throw InvalidData;
    else req.body = validatedFields.data;
    next();
  };
}
