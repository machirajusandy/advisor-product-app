import Advisor from "@/models/Advisor";
import Product from "@/models/Product";
import request from "supertest";

import { app } from "@/app";

describe("Product Routes", () => {
  let token: string;
  let advisorId: string;

  // Setup - create an advisor and get authentication token before tests
  beforeAll(async () => {
    // Create a test advisor
    const advisor = await Advisor.create({
      name: "Product Test Advisor",
      email: "product-test@example.com",
      password: "password123",
    });
    advisorId = advisor.id.toString();

    // Login to get token
    const loginResponse = await request(app).post("/login").send({
      email: "product-test@example.com",
      password: "password123",
    });

    token = loginResponse.body.token;
  });

  // Clean up after tests
  afterAll(async () => {
    await Advisor.deleteMany({ email: "product-test@example.com" });
    await Product.deleteMany({ advisorId });
  });

  test("should create a new product", async () => {
    const productData = {
      name: "Test Product",
      description: "This is a test product",
      price: 99.99,
    };

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", productData.name);
    expect(response.body).toHaveProperty(
      "description",
      productData.description
    );
    expect(response.body).toHaveProperty("price", productData.price);

    // Verify product was created in DB
    const product = await Product.findOne({ name: "Test Product" });
    expect(product).not.toBeNull();
    expect(product?.advisorId.toString()).toBe(advisorId);
  });

  test("should get advisor's products", async () => {
    // Create a few test products for this advisor
    const testProducts = [
      {
        name: "Product 1",
        description: "Description 1",
        price: 10.99,
        advisorId,
      },
      {
        name: "Product 2",
        description: "Description 2",
        price: 20.99,
        advisorId,
      },
    ];

    await Product.insertMany(testProducts);

    // Get products
    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(3); // 3 = 2 products created here + 1 from previous test

    // Check if our new products are in the response
    const productNames = response.body.map(
      (p: (typeof testProducts)[0]) => p.name
    );
    expect(productNames).toContain("Product 1");
    expect(productNames).toContain("Product 2");
  });

  test("should not create product without authentication", async () => {
    const response = await request(app).post("/products").send({
      name: "Unauthorized Product",
      description: "This should not be created",
      price: 50.0,
    });

    expect(response.status).toBe(401);
  });
});
