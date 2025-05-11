import { register } from "@/controllers/authController";
import Advisor from "@/models/Advisor";
import { NextFunction, Request, Response } from "express";

describe("Auth Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(async () => {
    req = {
      body: {
        email: "test@example.com",
        password: "Password123@",
        name: "Test User",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    // Clean up the database before each test
    await Advisor.deleteMany({});
  });

  describe("register", () => {
    test("should register a new advisor and return a token", async () => {
      await register(req as Request, res as Response, next as NextFunction);

      // Verify the advisor was created in the database
      const createdAdvisor = await Advisor.findOne({
        email: "test@example.com",
      });
      expect(createdAdvisor).not.toBeNull();
      expect(createdAdvisor?.name).toBe("Test User");

      // Verify the response contains a token
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: expect.any(String),
        })
      );
    });

    test("should return 400 if email is already in use", async () => {
      // Create an advisor first
      await new Advisor({
        email: "test@example.com",
        password: "existingpass",
        name: "Existing User",
      }).save();

      // Try to register with the same email
      await register(req as Request, res as Response, next as NextFunction);
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already in use",
      });

      // Verify only one advisor exists with this email
      const advisors = await Advisor.find({ email: "test@example.com" });
      expect(advisors.length).toBe(1);
    });

    test("should return error if invlide email format", async () => {
      req.body.email = "invalid-email";

      await register(req as Request, res as Response, next as NextFunction);

      // Assertions
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    test("should return error if password is too short", async () => {
      req.body.password = "123";

      await register(req as Request, res as Response, next as NextFunction);

      // Assertions
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    test("should reject weak passwords that do not meet strength requirements", async () => {
      req.body.password = "weakpass";
      await register(req as Request, res as Response, next as NextFunction);
      // Assertions
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  // Clean up after all tests
  afterAll(async () => {
    await Advisor.deleteMany({});
  });
});
