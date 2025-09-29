// config/db.js
const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  try {
    // ⚠️ Deprecated options काढले
    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Mongo Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
