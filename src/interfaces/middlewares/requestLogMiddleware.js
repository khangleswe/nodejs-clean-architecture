const requestLogMiddleware = ({ logger }) => {
  return function (req, res, next) {
    logger.info(`${req.method} ${req.url}`);
    next();
  };
};

module.exports = requestLogMiddleware;
