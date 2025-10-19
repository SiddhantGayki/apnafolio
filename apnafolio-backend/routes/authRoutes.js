// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { signup, login, verifyOtp } = require("../controllers/authController");

// Limit signup/verify to reduce abuse
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 6, // max requests per IP
  message: "Too many requests, please try again later."
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: "Too many login attempts, try again later."
});

router.post("/login", loginLimiter, login);
// router.post("/signup", authLimiter, signup);
// router.post("/verify", authLimiter, verifyOtp);
router.post("/signup", signup);
router.post("/verify", verifyOtp);

module.exports = router;
