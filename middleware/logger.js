// Logger middleware: Show the url being hit

const middleware = {
  loggerMiddleware(req, res, next) {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  },
};
module.exports = middleware;
