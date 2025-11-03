const logger = (req, res, next) => {
  console.log(`[LOGGER] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;