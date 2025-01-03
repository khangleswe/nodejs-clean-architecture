const rateLimit = require("express-rate-limit");
const config = require("../../infrastructure/config/index");

const rateLimitMiddleware = rateLimit({
  windowMs: config.security.rateLimiting.windowMs,
  max: config.security.rateLimiting.max,
  message: {
    error: "TooManyRequests",
    message: "Too many requests, please try again later.",
  },
});

module.exports = rateLimitMiddleware;
