const jwt = require("jsonwebtoken");

class JwtService {
  constructor({ logger }) {
    this.logger = logger;
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRES_IN || "24h";
  }

  generate(payload) {
    try {
      return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    } catch (error) {
      this.logger.error("JWT Generation Error:", error);
      throw error;
    }
  }

  verify(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      this.logger.error("JWT Verification Error:", error);
      throw error;
    }
  }
}

module.exports = JwtService;
