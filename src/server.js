const config = require("./infrastructure/config");
const container = require("./container");

class Server {
  constructor() {
    this.app = null;
    this.logger = container.resolve("logger");
    this.database = container.resolve("database");
    this.isShuttingDown = false;
  }

  async start() {
    await this.database.connect();

    this.app = container.resolve("app").getApp();

    this.server = this.app.listen(
      config.server.port,
      config.server.host,
      () => {
        this.logger.info(
          `Server running on ${config.server.host}:${config.server.port} in ${config.env} mode`
        );
      }
    );

    this.handleShutdown();
  }

  handleShutdown() {
    const shutdown = async (signal) => {
      try {
        if (this.isShuttingDown) {
          return;
        }

        this.isShuttingDown = true;
        this.logger.info(`Received ${signal}. Starting graceful shutdown...`);

        // Set timeout for graceful shutdown
        const shutdownTimeout = setTimeout(() => {
          this.logger.error("Shutdown timed out, forcing exit");
          process.exit(1);
        }, 10000);

        // Stop accepting new connections
        if (this.server) {
          this.server.close(() => {
            this.logger.info("HTTP server closed");
          });
        }

        // Close database connection
        await this.database.disconnect();
        this.logger.info("Database connection closed");

        // Clear timeout and exit normally
        clearTimeout(shutdownTimeout);
        process.exit(0);
      } catch (error) {
        this.logger.error("Error during shutdown:", error);
        process.exit(1);
      }
    };

    // Handle different signals
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    // Handle uncaught errors
    process.on("uncaughtException", (error) => {
      this.logger.error("Uncaught Exception:", error);
      shutdown("uncaughtException");
    });

    process.on("unhandledRejection", (error) => {
      this.logger.error("Unhandled Rejection:", error);
      shutdown("unhandledRejection");
    });
  }
}

const server = new Server();
server.start();

module.exports = Server;
