const bcrypt = require("bcryptjs");

class PasswordService {
  constructor({ logger }) {
    this.logger = logger;
    this.saltRounds = 10;
  }

  async hash(password) {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      this.logger.error("Password Hash Error:", error);
      throw error;
    }
  }

  async compare(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      this.logger.error("Password Compare Error:", error);
      throw error;
    }
  }
}

module.exports = PasswordService;
