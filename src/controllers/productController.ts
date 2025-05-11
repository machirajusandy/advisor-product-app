// controllers/productController.ts
import { NextFunction, Request, Response } from "express";
import Product from "@/models/Product";
import {
  createProductSchema,
  productListSchema,
  productSchema,
} from "@/schemas/productSchema";
import { advisorSchema } from "@/schemas/advisorSchema";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const advisor = advisorSchema.parse(req.user);
    const { name, description, price } = createProductSchema.parse(req.body);
    const product = await Product.create({
      name,
      description,
      price,
      advisorId: advisor.id,
    });
    res.status(201).json(productSchema.parse(product));
  } catch (error) {
    next(error);
  }
};

export const getMyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const advisor = advisorSchema.parse(req.user);
    const products = await Product.find({ advisorId: advisor.id });
    res.status(200).json(productListSchema.parse(products));
  } catch (error) {
    next(error);
  }
};
