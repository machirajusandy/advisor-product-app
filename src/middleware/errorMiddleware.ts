/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if it's a ZodError and if the request has body, query, or params (indicating user input)
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation error",
      errors: err.flatten().fieldErrors,
    });
  } else {
    res.sendStatus(500);
  }
};

export default errorMiddleware;
