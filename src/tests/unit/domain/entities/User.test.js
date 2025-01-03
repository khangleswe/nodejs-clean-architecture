const User = require("../../../../domain/entities/User");

describe("User Entity", () => {
  it("should create a valid user", () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    const user = new User(userData);

    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    expect(user.role).toBe("user"); // default role
  });

  it("should validate required fields", () => {
    const user = new User({});

    expect(() => user.validate()).toThrow("Email is required");
  });

  it("should convert to JSON correctly", () => {
    const user = new User({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    const json = user.toJSON();

    expect(json).not.toHaveProperty("password");
    expect(json).toHaveProperty("email");
    expect(json).toHaveProperty("name");
  });
});
