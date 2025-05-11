import { z } from "zod";

// Create product input
export const createProductSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  price: z.number().nonnegative().max(10000),
});

// Product response
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

// List of products
export const productListSchema = z.array(productSchema);
