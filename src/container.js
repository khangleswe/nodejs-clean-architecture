const { createContainer, asClass, asFunction, asValue } = require("awilix");

// App
const App = require("./app");

// Infrastructure Layer
const Database = require("./infrastructure/db/database");
const WinstonLogger = require("./infrastructure/logging/WinstonLogger");
const JwtService = require("./infrastructure/security/JwtService");
const PasswordService = require("./infrastructure/security/PasswordService");
const MongoUserRepository = require("./infrastructure/repositories/mongodb/MongoUserRepository");

// Application Layer
const LoginUseCase = require("./application/use-cases/auth/LoginUseCase");
const RegisterUseCase = require("./application/use-cases/auth/RegisterUseCase");
const GetUserUseCase = require("./application/use-cases/user/GetUserUseCase");
const UpdateUserUseCase = require("./application/use-cases/user/UpdateUserUseCase");

// Interface Layer
const AuthController = require("./interfaces/controllers/AuthController");
const UserController = require("./interfaces/controllers/UserController");

const AuthRoutes = require("./interfaces/routes/auth.routes");
const UserRoutes = require("./interfaces/routes/user.routes");

// Middlewares
const authMiddleware = require("./interfaces/middlewares/authMiddleware");
const errorMiddleware = require("./interfaces/middlewares/errorMiddleware");
const rateLimitMiddleware = require("./interfaces/middlewares/rateLimitMiddleware");
const requestLogMiddleware = require("./interfaces/middlewares/requestLogMiddleware");
const validationMiddleware = require("./interfaces/middlewares/validationMiddleware");

const container = createContainer();

// Register dependencies
container.register({
  // App
  app: asClass(App).singleton(),

  // Infrastructure
  logger: asClass(WinstonLogger).singleton(),
  database: asClass(Database).singleton(),
  jwtService: asClass(JwtService).singleton(),
  passwordService: asClass(PasswordService).singleton(),
  userRepository: asClass(MongoUserRepository).singleton(),

  // Use Cases
  loginUseCase: asClass(LoginUseCase),
  registerUseCase: asClass(RegisterUseCase),
  getUserUseCase: asClass(GetUserUseCase),
  updateUserUseCase: asClass(UpdateUserUseCase),

  // Controllers
  authController: asClass(AuthController),
  userController: asClass(UserController),

  // Routes
  authRoutes: asFunction(AuthRoutes),
  userRoutes: asFunction(UserRoutes),

  // Middlewares
  authMiddleware: asFunction(authMiddleware),
  errorMiddleware: asFunction(errorMiddleware),
  requestLogMiddleware: asFunction(requestLogMiddleware),
  rateLimitMiddleware: asValue(rateLimitMiddleware),
  validationMiddleware: asValue(validationMiddleware),

  // Configuration
  jwtSecret: asValue(process.env.JWT_SECRET),
  mongoUri: asValue(process.env.MONGO_URI),
});

module.exports = container;
