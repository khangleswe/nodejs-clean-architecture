const ApplicationError = require("./ApplicationError");

class AuthenticationError extends ApplicationError {
  constructor(message) {
    super(message, 401, "AUTHENTICATION_ERROR");
  }
}

module.exports = AuthenticationError;
