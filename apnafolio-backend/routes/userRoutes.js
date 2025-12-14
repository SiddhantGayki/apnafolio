const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  saveResume,
  getPublicPortfolio,
  switchTemplate,
  getDashboard, // ✅ new
} = require("../controllers/userController");

router.post("/resume", auth, saveResume);

router.get("/portfolio/:username", getPublicPortfolio);

router.post("/switch-template", auth, switchTemplate);

router.get("/dashboard", auth, getDashboard); // ✅ new

module.exports = router;
