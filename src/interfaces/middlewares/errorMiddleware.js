const ApplicationError = require("../errors/ApplicationError");

const errorMiddleware = ({ logger }) => {
  return (err, req, res, next) => {
    // Log error
    logger.error("Error:", {
      error: err,
      stack: err.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Handle known application errors
    if (err instanceof ApplicationError) {
      return res.status(err.status).json(err.toJSON());
    }

    // Handle validation errors from express-validator
    if (err.array && typeof err.array === "function") {
      return res.status(400).json({
        error: {
          name: "ValidationError",
          message: "Invalid request parameters",
          status: 400,
          code: "VALIDATION_ERROR",
          details: err.array(),
        },
      });
    }

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
      return res.status(409).json({
        error: {
          name: "ConflictError",
          message: "Duplicate entry",
          status: 409,
          code: "DUPLICATE_ERROR",
        },
      });
    }

    // Handle unknown errors
    return res.status(500).json({
      error: {
        name: "InternalServerError",
        message:
          process.env.NODE_ENV === "production"
            ? "An unexpected error occurred"
            : err.message,
        status: 500,
        code: "INTERNAL_ERROR",
      },
    });
  };
};

module.exports = errorMiddleware;
