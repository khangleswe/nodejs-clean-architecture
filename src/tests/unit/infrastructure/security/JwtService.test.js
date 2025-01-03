const JwtService = require("../../../../infrastructure/security/JwtService");
const LoggerService = require("../../../../infrastructure/logging/WinstonLogger");

describe("JwtService", () => {
  let jwtService;
  let logger;

  beforeEach(() => {
    logger = new LoggerService();
    jwtService = new JwtService({ logger });
  });

  it("should generate and verify token successfully", () => {
    const payload = { userId: "123", email: "test@example.com" };

    const token = jwtService.generate(payload);
    expect(token).toBeDefined();

    const decoded = jwtService.verify(token);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.email).toBe(payload.email);
  });

  it("should throw error for invalid token", () => {
    const invalidToken = "invalid.token.here";

    expect(() => jwtService.verify(invalidToken)).toThrow();
  });
});
