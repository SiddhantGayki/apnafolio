const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  saveResume,
  getPublicPortfolio,
  switchTemplate,
  getDashboard, // ✅ new
} = require("../controllers/userController");

// ✍️ Save Resume
router.post("/resume", auth, saveResume);

// 🌍 Public Portfolio
router.get("/portfolio/:username", getPublicPortfolio);

// 🎨 Switch Template
router.post("/switch-template", auth, switchTemplate);

// 📊 Dashboard Data
router.get("/dashboard", auth, getDashboard); // ✅ new

module.exports = router;
