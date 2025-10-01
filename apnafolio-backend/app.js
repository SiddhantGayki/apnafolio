const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();

// ✅ CORS config (Direct array of origins)
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
      "https://apnafolio-919e652t3-siddhant-gaykis-projects.vercel.app",
      "https://apnafolio.in",
      "https://www.apnafolio.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors()); // ✅ Preflight OPTIONS handle



// app.use(cors({
//   origin: ["https://apnafolio.in", "https://www.apnafolio.in","https://apnafolio-amttynbd1-siddhant-gaykis-projects.vercel.app"], // ✅ Allowed origins
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));
app.use(express.json());
app.use(helmet());   // 🔒 security headers
app.use(morgan("dev")); // 📜 request logging

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.set("trust proxy", 1);

// Mount routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/password", require("./routes/passwordRoutes"));

// Simple root
app.get("/", (req, res) => res.send("ApnaFolio API Running 🚀"));

// Auto-create admin user (if not exists)
const ensureAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "apnafolio9009@gmail.com";
    const adminPass = process.env.ADMIN_INITIAL_PASSWORD || "Siddhant@03"; // change later
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      const hashed = await bcrypt.hash(adminPass, 10);
      admin = new User({
        name: "ApnaFolio Admin",
        email: adminEmail,
        password: hashed,
        username: "tayyari_admin",
        usernameLower: "tayyari_admin",
        isAdmin: true,
        isVerified: true,
        paid: true,
        selectedTemplate: "template1",
      });
      await admin.save();
      console.log(`✅ Admin user created: ${adminEmail} (⚠️ Change password immediately)`);
    } else if (!admin.isAdmin) {
      admin.isAdmin = true;
      await admin.save();
      console.log(`✅ Existing user promoted to admin: ${adminEmail}`);
    } else {
      console.log(`✅ Admin user exists: ${adminEmail}`);
    }
  } catch (err) {
    console.error("❌ ensureAdmin err:", err);
  }
};

// Start server only after DB connect
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(async () => {
    await ensureAdmin(); // run after DB connect
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  });
