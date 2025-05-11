// routes/authRoutes.ts
import express from "express";
import { register, login } from "@/controllers/authController";

const router = express.Router();

router.post("/register", (req, res, next) => {
  void register(req, res, next);
});
router.post("/login", (req, res, next) => {
  void login(req, res, next);
});

export default router;
