const mongooseConnect = require("../util/mongoose.js");
const AccessModel = require("../util/access.schema.js");

/**
 * Middleware for express API that uses mongoose to store request 
 * IP addresses and their URLs. If an address is making the 
 * same request withing a fixed period (as specified in RATE_LIMIT variable of
 * the local environment), it will be prohibited with code 429.
 * 
 * If the ip address is new, or a previous ip address is making a different request,
 * then it will be allowed. The records of requests are kept for ~RATE_LIMIT seconds
 * (as in the local environment variable).
 * 
 * @param req request object
 * @param res response object
 * @param next next object
 */
async function middleware(req, res, next) {
  await mongooseConnect(); // this makes sure that mongodb is connected

  const doc = await AccessModel.findOne({ ip: req.ip }).exec();

  if (!doc || doc.requestPath != req.originalUrl) {
    // ip address not in DB OR making a different request

    const access = new AccessModel({ ip: req.ip, requestPath: req.path });
    access.save();

    next();
  } else {
    // existing ip address making the same request.

    res.status(429).json({
      error: `Limit of one request per ~${process.env.RATE_LIMIT} seconds.`,
    });
  }
}

module.exports = middleware;
