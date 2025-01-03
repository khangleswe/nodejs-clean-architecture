const WinstonLogger = require("../../../../infrastructure/logging/WinstonLogger");

describe("WinstonLogger", () => {
  let logger;

  beforeEach(() => {
    logger = new WinstonLogger();
  });

  it("should have all logging methods", () => {
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.debug).toBe("function");
  });

  it("should log messages without throwing errors", () => {
    expect(() => {
      logger.info("Test info message");
      logger.error("Test error message");
      logger.warn("Test warning message");
      logger.debug("Test debug message");
    }).not.toThrow();
  });
});
