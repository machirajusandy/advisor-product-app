// routes/productRoutes.ts
import express from "express";
import { createProduct, getMyProducts } from "@/controllers/productController";

import authMiddleware from "@/middleware/authMiddleware";

const router = express.Router();

router.post("/products", authMiddleware, createProduct);
router.get("/products", authMiddleware, getMyProducts);

export default router;
