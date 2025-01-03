const PasswordService = require("../../../../infrastructure/security/PasswordService");
const LoggerService = require("../../../../infrastructure/logging/WinstonLogger");

describe("PasswordService", () => {
  let passwordService;
  let logger;

  beforeEach(() => {
    logger = new LoggerService();
    passwordService = new PasswordService({ logger });
  });

  it("should hash password correctly", async () => {
    const password = "testPassword123";

    const hashedPassword = await passwordService.hash(password);
    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword).toBeDefined();
  });

  it("should verify correct password", async () => {
    const password = "testPassword123";
    const hashedPassword = await passwordService.hash(password);

    const isValid = await passwordService.compare(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it("should reject incorrect password", async () => {
    const password = "testPassword123";
    const wrongPassword = "wrongPassword123";
    const hashedPassword = await passwordService.hash(password);

    const isValid = await passwordService.compare(
      wrongPassword,
      hashedPassword
    );
    expect(isValid).toBe(false);
  });
});
