class LoginUseCase {
  constructor({ userRepository, passwordService, jwtService, logger }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.jwtService = jwtService;
    this.logger = logger;
  }

  async execute(email, password) {
    try {
      // Find user by email
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      // Verify password
      const isValidPassword = await this.passwordService.compare(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      // Generate token
      const token = this.jwtService.generate({
        userId: user.id,
        role: user.role,
      });

      this.logger.info(`User logged in successfully: ${user.id}`);

      return {
        token,
        user: user.toJSON(),
      };
    } catch (error) {
      this.logger.error("Login error:", error);
      throw error;
    }
  }
}

module.exports = LoginUseCase;
