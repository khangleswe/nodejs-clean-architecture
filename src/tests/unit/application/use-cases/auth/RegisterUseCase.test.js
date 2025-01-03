const RegisterUseCase = require("../../../../../application/use-cases/auth/RegisterUseCase");
const MockUserRepository = require("../../../../mocks/repositories/MockUserRepository");
const PasswordService = require("../../../../../infrastructure/security/PasswordService");
const LoggerService = require("../../../../../infrastructure/logging/WinstonLogger");

describe("RegisterUseCase", () => {
  let registerUseCase;
  let mockUserRepository;
  let passwordService;
  let logger;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    logger = new LoggerService();
    passwordService = new PasswordService({ logger });

    registerUseCase = new RegisterUseCase({
      userRepository: mockUserRepository,
      passwordService,
      logger,
    });
  });

  it("should register a new user successfully", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    const result = await registerUseCase.execute(userData);

    expect(result).toHaveProperty("id");
    expect(result.email).toBe(userData.email);
    expect(result.name).toBe(userData.name);
    expect(result).not.toHaveProperty("password");
  });

  it("should throw error for duplicate email", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    mockUserRepository.users = [{ ...userData, id: "existing-user" }];

    await expect(registerUseCase.execute(userData)).rejects.toThrow(
      "Email already exists"
    );
  });
});
