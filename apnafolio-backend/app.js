// new
// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();
app.set("trust proxy", 1)
const rawCors = process.env.CORS_ALLOW || "";
const extraOrigins = rawCors.split(",").map(s => s.trim()).filter(Boolean);

const allowedOrigins = [
  "http://localhost:5173",
  "https://apnafolio.vercel.app",
  "http://localhost:3000",
  "https://apnafolio.in",
  "https://www.apnafolio.in",
  /\.vercel\.app$/,     // allow all vercel subdomains
  /\.onrender\.com$/,   // allow all render subdomains
  ...extraOrigins       // plus any custom ones from env
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => (o instanceof RegExp ? o.test(origin) : o === origin))) {
      callback(null, true);
    } else {
      console.log("❌ Blocked CORS origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Connect MongoDB
connectDB(process.env.MONGO_URI);

// s3 upload route (for presigned URLs)
app.use("/api/upload", require("./routes/upload"));

// ✅ Mount routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ✅ Root route
app.get("/", (req, res) => res.send("ApnaFolio API Running 🚀"));

// ✅ Auto-create admin if not exists
const ensureAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "apnafolio9009@gmail.com";
    const adminPass = process.env.ADMIN_INITIAL_PASSWORD || "Siddhant@03";

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashed = await bcrypt.hash(adminPass, 10);
      admin = new User({
        name: "ApnaFolio Admin",
        email: adminEmail,
        password: hashed,
        username: "mr_raje",
        isAdmin: true,
        isVerified: true,
        paid: false,
        selectedTemplate: "2",
      });
      await admin.save();
      console.log("✅ Admin user created:", adminEmail);
    } else if (!admin.isAdmin) {
      admin.isAdmin = true;
      await admin.save();
      console.log("🔼 Existing user promoted to admin:", adminEmail);
    } else {
      console.log("✅ Admin user exists:", adminEmail);
    }
  } catch (err) {
    console.error("ensureAdmin err:", err);
  }
};

// delay slightly for DB connect
setTimeout(ensureAdmin, 2500);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
});

require("./cron/expiryCron");
