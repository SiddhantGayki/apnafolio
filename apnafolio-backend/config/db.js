const mongoose = require("mongoose");

console.log("Initializing database connection module");
const connectDB = async (mongoUri) => {
  try {
    console.log("Attempting to connect to MongoDB");
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Mongo Error:", err);
    process.exit(1);
  }
};

console.log("Exporting database connection module");
module.exports = connectDB;
