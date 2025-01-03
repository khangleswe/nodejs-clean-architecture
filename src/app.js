const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

class App {
  constructor({
    authRoutes,
    userRoutes,
    errorMiddleware,
    rateLimitMiddleware,
    requestLogMiddleware,
    logger,
  }) {
    this.express = express();
    this.authRoutes = authRoutes;
    this.userRoutes = userRoutes;
    this.errorMiddleware = errorMiddleware;
    this.rateLimitMiddleware = rateLimitMiddleware;
    this.requestLogMiddleware = requestLogMiddleware;
    this.logger = logger;

    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(express.json());

    this.express.use(this.rateLimitMiddleware);
    this.express.use(this.requestLogMiddleware);
  }

  routes() {
    this.express.use("/api/auth", this.authRoutes);
    this.express.use("/api/users", this.userRoutes);

    // Health check
    this.express.get("/health", (req, res) => {
      res.status(200).json({ status: "OK" });
    });

    // Handle 404
    this.express.use((req, res) => {
      res.status(404).json({
        error: "NotFound",
        message: "Route not found",
      });
    });
  }

  handleErrors() {
    this.express.use(this.errorMiddleware);
  }

  getApp() {
    return this.express;
  }
}

module.exports = App;
