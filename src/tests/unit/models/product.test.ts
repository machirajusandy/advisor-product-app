import Product from "@/models/Product";
import mongoose from "mongoose";

describe("Product Model", () => {
  test("should create a new product with valid data", async () => {
    const advisorId = new mongoose.Types.ObjectId();
    const productData = {
      advisorId,
      name: "Test Product",
      description: "This is a test product",
      price: 99.99,
    };

    const product = new Product(productData);
    await product.save();

    expect(product.advisorId).toEqual(advisorId);
    expect(product.name).toBe("Test Product");
    expect(product.description).toBe("This is a test product");
    expect(product.price).toBe(99.99);
  });

  test("should fail when required fields are missing", async () => {
    const invalidProduct = new Product({
      description: "Missing required fields",
    });

    // Validate the document to check for required field errors
    const validationError = invalidProduct.validateSync();

    expect(validationError).toBeTruthy();
    expect(validationError?.errors.name).toBeDefined();
    expect(validationError?.errors.advisorId).toBeDefined();
    expect(validationError?.errors.price).toBeDefined();
  });

  test("should allow creating product without description", async () => {
    const advisorId = new mongoose.Types.ObjectId();
    const productData = {
      advisorId,
      name: "Minimal Product",
      price: 49.99,
    };

    const product = new Product(productData);
    const validationError = product.validateSync();

    expect(validationError).toBeUndefined();
  });

  test("should convert string price to number", async () => {
    const advisorId = new mongoose.Types.ObjectId();
    const productData = {
      advisorId,
      name: "Price Test Product",
      price: "29.99",
    };

    const product = new Product(productData);
    await product.save();

    expect(typeof product.price).toBe("number");
    expect(product.price).toBe(29.99);
  });
});
