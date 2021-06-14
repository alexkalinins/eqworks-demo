const mongoose = require("mongoose");

let connected = false;

/**
 * A helper function that makes connection to MongoDB via Mongoose.
 * This function is run everytime mongoose is used. If mongoose is already
 * connected, this function does nothing.
 *
 * @returns void
 */
async function connectMongoose() {
  if (connected) {
    //mongoose already connected
    return;
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  connected = true;

  let db = mongoose.connection;
  db.once("open", () => {
    console.log("Connected to mongoose; good to go!");
  });

  db.on("error", () => {
    throw Error("Could not connect to mongoose");
  });
}

module.exports = connectMongoose;
