// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { signup, login, verifyOtp, googleOneTap } = require("../controllers/authController");
const { googleOneTapLogin } = require("../controllers/googleController");



// Limit signup/verify to reduce abuse
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 6,
  message: "Too many requests, please try again later.",
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: "Too many login attempts, try again later.",
});

router.post("/login", loginLimiter, login);
router.post("/signup", signup); // authLimiter वापरायचा असेल तर add back
router.post("/verify", verifyOtp);

// 🔹 Google One Tap (no rate limit, Google handles abuse)
router.post("/google-one-tap", googleOneTap);
router.post("/google-one-tap", googleOneTapLogin);
module.exports = router;

