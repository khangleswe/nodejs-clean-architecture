const LoginUseCase = require("../../../../../application/use-cases/auth/LoginUseCase");
const MockUserRepository = require("../../../../mocks/repositories/MockUserRepository");
const PasswordService = require("../../../../../infrastructure/security/PasswordService");
const JwtService = require("../../../../../infrastructure/security/JwtService");
const LoggerService = require("../../../../../infrastructure/logging/WinstonLogger");
const User = require("../../../../../domain/entities/User");

describe("LoginUseCase", () => {
  let loginUseCase;
  let mockUserRepository;
  let passwordService;
  let jwtService;
  let logger;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    logger = new LoggerService();
    jwtService = new JwtService({ logger });
    passwordService = new PasswordService({ logger });

    loginUseCase = new LoginUseCase({
      userRepository: mockUserRepository,
      passwordService,
      jwtService,
      logger,
    });
  });

  it("should successfully login with valid credentials", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = await passwordService.hash(password);

    mockUserRepository.users = [
      new User({
        id: "1",
        email,
        password: hashedPassword,
        name: "Test User",
      }),
    ];

    const result = await loginUseCase.execute(email, password);

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
    expect(result.user.email).toBe(email);
  });

  it("should throw error for invalid credentials", async () => {
    const email = "test@example.com";
    const password = "wrongpassword";

    mockUserRepository.users = [
      {
        id: "1",
        email,
        password: "hashedpassword",
        name: "Test User",
      },
    ];

    await expect(loginUseCase.execute(email, password)).rejects.toThrow(
      "Invalid password"
    );
  });
});
