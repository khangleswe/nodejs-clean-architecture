const ApplicationError = require("./ApplicationError");

class ValidationError extends ApplicationError {
  constructor(message, details = []) {
    super(message, 400, "VALIDATION_ERROR");
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

module.exports = ValidationError;
