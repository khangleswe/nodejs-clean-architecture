const User = require("../../../domain/entities/User");

class CreateUserUseCase {
  constructor({ userRepository, passwordService, logger }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.logger = logger;
  }

  async execute(userData) {
    try {
      // Check if user exists
      const existingUser = await this.userRepository.findByEmail(
        userData.email
      );
      if (existingUser) {
        throw new Error("Email already exists");
      }

      // Hash password
      const hashedPassword = await this.passwordService.hash(userData.password);

      // Create user instance
      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      // Validate user data
      user.validate();

      // Save user
      const createdUser = await this.userRepository.create(user);

      this.logger.info(`User created successfully: ${createdUser.id}`);

      return createdUser.toJSON();
    } catch (error) {
      this.logger.error("Create user error:", error);
      throw error;
    }
  }
}

module.exports = CreateUserUseCase;
