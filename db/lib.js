require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const db = mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("mongoose connect with Mongodb");
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.connection.on("connected", () => {
  console.log("still connected!");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = db;
