const request = require("supertest");
const container = require("../../container");
const App = require("../../app");
const {
  connectDatabase,
  disconnectDatabase,
  clearDatabase,
} = require("./setup/mongodb");

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("Auth Integration Tests", () => {
  let app;

  beforeAll(() => {
    app = new App(container.cradle).getApp();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.email).toBe("test@example.com");
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "invalid-email",
        password: "123",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Create a test user
      await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });
    });

    it("should login successfully with valid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
    });
  });
});
