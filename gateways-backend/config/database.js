const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost:27017/gateway"; // Change this to your database URI

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

module.exports = db;
