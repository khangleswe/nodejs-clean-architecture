class GetUserUseCase {
  constructor({ userRepository, logger }) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async execute(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      return user.toJSON();
    } catch (error) {
      this.logger.error(`Error getting user ${userId}:`, error);
      throw error;
    }
  }
}

module.exports = GetUserUseCase;
