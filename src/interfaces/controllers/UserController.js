class UserController {
  constructor({ getUserUseCase, updateUserUseCase, logger }) {
    this.getUserUseCase = getUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.logger = logger;
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      const user = await this.getUserUseCase.execute(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      const updatedUser = await this.updateUserUseCase.execute(
        userId,
        req.body
      );
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
