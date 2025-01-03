const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({
  path: path.join(
    __dirname,
    `../../../.env${process.env.NODE_ENV ? "." + process.env.NODE_ENV : ""}`
  ),
});

const config = {
  env: process.env.NODE_ENV || "development",
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || "localhost",
  },
  database: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/app",
    options: {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
    rateLimiting: {
      windowMs:
        parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
    },
    cors: {
      origin: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    },
  },
  logging: {
    level: process.env.LOG_LEVEL || "info",
    directory: process.env.LOG_DIR || "logs",
  },
};

module.exports = config;
