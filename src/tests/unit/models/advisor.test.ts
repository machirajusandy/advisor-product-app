import Advisor from "@/models/Advisor";

describe("Advisor Model", () => {
  test("should hash password before saving", async () => {
    const advisorData = {
      name: "Test Advisor",
      email: "test@example.com",
      password: "password123",
    };

    const advisor = new Advisor(advisorData);
    await advisor.save();

    // Password should be hashed
    expect(advisor.password).not.toBe("password123");

    // Should be able to compare password
    const isMatch = await advisor.comparePassword("password123");
    expect(isMatch).toBe(true);
  });
});
