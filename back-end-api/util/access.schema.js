const mongoose = require("mongoose");

/**
 * A mongoose schema to keep track of API accessess for rate limiting. Stores
 * the ip address, the path it is requesting, and expiration date. MongoDB deletes
 * the record after the expiration time.
 */
var accessSchema = new mongoose.Schema({
  ip: String,
  requestPath: String,
  expiresAt: {
    type: Date,
    default: Date.now,
    expiresAfterSeconds: process.env.RATE_LIMIT,
    required: true,
    index: true
  },
});

module.exports = mongoose.model('access', accessSchema);
