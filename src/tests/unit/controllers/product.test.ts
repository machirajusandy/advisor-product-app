import { createProduct, getMyProducts } from "@/controllers/productController";
import Product from "@/models/Product";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

describe("Product Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    req = {
      body: {
        name: "Test Product",
        description: "This is a test product",
        price: 99.99,
      },
      user: {
        id: "665b7f4974d51a2a3cfe5a88",
        email: "advisor@example.com",
        name: "Test Advisor",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    // Reset mocks
    jest.clearAllMocks();
  });
  afterEach(async () => {
    await Product.deleteMany({});
  });

  describe("createProduct", () => {
    test("should create a new product and return 201 status", async () => {
      await createProduct(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Product",
          description: "This is a test product",
          price: 99.99,
        })
      );
    });

    test("should call next with error if validation fails", async () => {
      // Invalid price to trigger validation error
      req.body.price = "invalid-price";

      await createProduct(
        req as Request,
        res as Response,
        next as NextFunction
      );

      // Assertions
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("getMyProducts", () => {
    test("should return products for the advisor", async () => {
      const mockProducts = [
        {
          name: "Test Product 1",
          description: "Description 1",
          price: 99.99,
          advisorId: new mongoose.Types.ObjectId("665b7f4974d51a2a3cfe5a88"),
        },
        {
          name: "Test Product 2",
          description: "Description 2",
          price: 149.99,
          advisorId: new mongoose.Types.ObjectId("665b7f4974d51a2a3cfe5a88"),
        },
      ];

      await new Product(mockProducts[0]).save();
      await new Product(mockProducts[1]).save();

      await getMyProducts(
        req as Request,
        res as Response,
        next as NextFunction
      );

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Test Product 1",
            price: 99.99,
          }),
          expect.objectContaining({
            name: "Test Product 2",
            price: 149.99,
          }),
        ])
      );
    });

    test("should handle error when fetching products fails", async () => {
      // Force an error by spying on Product.find and rejecting
      jest
        .spyOn(Product, "find")
        .mockRejectedValueOnce(new Error("Database error"));

      await getMyProducts(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
