// controllers/authController.ts
import type { Request, Response, NextFunction } from "express";
import Advisor, { IAdvisor } from "../models/Advisor";
import passport from "passport";
import jwt from "jsonwebtoken";
import { advisorRegisterSchema } from "@/schemas/advisorSchema";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = advisorRegisterSchema.parse(req.body);
    const existing = await Advisor.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const advisor = new Advisor({ email, password, name });
    const savedAdvisor = await advisor.save();
    const payload = {
      id: savedAdvisor.id,
      email: savedAdvisor.email,
      name: savedAdvisor.name,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: unknown, advisor: IAdvisor) => {
      if (err || !advisor)
        return res.status(401).json({ message: "Auth failed" });

      const payload = {
        id: advisor._id,
        email: advisor.email,
        name: advisor.name,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ token });
    }
  )(req, res, next);
};
