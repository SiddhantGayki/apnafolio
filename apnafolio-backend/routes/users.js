const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.paid) return res.status(404).json({ message: "User not found or unpaid" });

    res.json({
      resume: user.resumeData,
      templateId: user.selectedTemplate,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/resume", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.resumeData = req.body;
    await user.save();
    res.status(200).json({ message: "Resume saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving resume", error: err.message });
  }
});

module.exports = router;
