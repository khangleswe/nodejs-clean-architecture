class AuthController {
  constructor({ loginUseCase, registerUseCase, logger }) {
    this.loginUseCase = loginUseCase;
    this.registerUseCase = registerUseCase;
    this.logger = logger;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const result = await this.registerUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
