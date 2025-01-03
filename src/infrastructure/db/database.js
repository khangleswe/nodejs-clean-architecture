const mongoose = require("mongoose");
const config = require("../config");

// Skip mongoose warning
mongoose.set("strictQuery", true);

class Database {
  constructor({ logger }) {
    this.logger = logger;
    this.url = config.database.uri;
    this.options = config.database.options;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, this.options);
      this.logger.info("Database connected successfully");
    } catch (error) {
      console.log(error);
      this.logger.error("Database connection error:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      this.logger.info("Database disconnected successfully");
    } catch (error) {
      this.logger.error("Database disconnection error:", error);
      throw error;
    }
  }
}

module.exports = Database;
