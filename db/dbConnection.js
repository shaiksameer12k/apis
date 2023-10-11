// Import required modules
const mongoose = require("mongoose");

const dbConnectionFun = () => {
  // MongoDB connection URI (replace with your own connection string)
  const mongoURI =
    "mongodb+srv://shaiksameer6061:sameer6061@cluster0.xhq9rtq.mongodb.net/vector";

  // Connect to MongoDB
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Event listener for successful connection
  db.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  // Event listener for connection errors
  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  // Event listener for disconnection
  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  // Gracefully handle process termination
  process.on("SIGINT", () => {
    db.close(() => {
      console.log("MongoDB connection closed due to application termination");
      process.exit(0);
    });
  });
};

module.exports = dbConnectionFun;
