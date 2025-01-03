const AuthenticationError = require("../../interfaces/errors/AuthenticationError");

const authMiddleware = ({ jwtService, logger }) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AuthenticationError("No token provided");
      }

      const decoded = await jwtService.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      logger.error("Authentication error:", error);
      next(new AuthenticationError("Invalid token"));
    }
  };
};

module.exports = authMiddleware;
