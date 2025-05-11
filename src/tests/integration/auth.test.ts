import Advisor from "@/models/Advisor";
import request from "supertest";

import { app } from "@/app";

describe("Authentication Routes", () => {
  test("should register a new advisor", async () => {
    const response = await request(app).post("/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "Password123@",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    // Verify advisor was created in DB
    const advisor = await Advisor.findOne({ email: "test@example.com" });
    expect(advisor).not.toBeNull();
  });

  test("should login existing advisor", async () => {
    // First create an advisor
    await Advisor.create({
      name: "Login Test",
      email: "login@example.com",
      password: "Password123@",
    });

    // Now try to login
    const response = await request(app).post("/login").send({
      email: "login@example.com",
      password: "Password123@",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
