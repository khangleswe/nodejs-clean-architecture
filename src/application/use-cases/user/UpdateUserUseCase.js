class UpdateUserUseCase {
  constructor({ userRepository, passwordService, logger }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.logger = logger;
  }

  async execute(userId, userData) {
    try {
      // Check if user exists
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new Error("User not found");
      }

      // If updating password, hash it
      if (userData.password) {
        userData.password = await this.passwordService.hash(userData.password);
      }

      // Update user
      const updatedUser = await this.userRepository.update(userId, {
        ...userData,
        updatedAt: new Date(),
      });

      this.logger.info(`User updated successfully: ${userId}`);

      return updatedUser.toJSON();
    } catch (error) {
      this.logger.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  }
}

module.exports = UpdateUserUseCase;
