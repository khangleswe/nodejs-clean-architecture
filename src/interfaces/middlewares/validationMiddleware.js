const ValidationError = require("../../interfaces/errors/ValidationError");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false, // Include all errors
      allowUnknown: true, // Ignore unknown props
      stripUnknown: true, // Remove unknown props
    };

    try {
      if (schema.body) {
        const { error, value } = schema.body.validate(
          req.body,
          validationOptions
        );
        if (error) {
          throw new ValidationError(
            "Invalid request body",
            error.details.map((detail) => ({
              field: detail.path.join("."),
              message: detail.message,
            }))
          );
        }
        req.body = value;
      }

      if (schema.query) {
        const { error, value } = schema.query.validate(
          req.query,
          validationOptions
        );
        if (error) {
          throw new ValidationError(
            "Invalid query parameters",
            error.details.map((detail) => ({
              field: detail.path.join("."),
              message: detail.message,
            }))
          );
        }
        req.query = value;
      }

      if (schema.params) {
        const { error, value } = schema.params.validate(
          req.params,
          validationOptions
        );
        if (error) {
          throw new ValidationError(
            "Invalid path parameters",
            error.details.map((detail) => ({
              field: detail.path.join("."),
              message: detail.message,
            }))
          );
        }
        req.params = value;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validationMiddleware;
