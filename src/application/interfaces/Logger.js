class Logger {
  info(message, meta = {}) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  error(message, meta = {}) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  warn(message, meta = {}) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  debug(message, meta = {}) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = Logger;
