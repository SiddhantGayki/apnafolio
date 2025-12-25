const User = require("../models/User");

console.log("User controller loaded");

exports.saveResume = async (req, res) => {
  console.log("saveResume called with userId:", req.userId);
  console.log("Resume data:", req.body);
  console.log("image files:", req.files);
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Saving resume data for user");
    user.resumeData = req.body;
    await user.save();

    console.log("Resume saved successfully");
    res.json({ success: true, message: "Resume saved" });
  } catch (err) {
    console.error("saveResume err:", err);
    res.status(500).json({ success: false, message: "Error saving resume" });
  }
};

exports.getPublicPortfolio = async (req, res) => {
  console.log("getPublicPortfolio called with username:", req.params.username);
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.paid) {
      console.log("User not found or unpaid");
      return res.status(404).json({ success: false, message: "Not found" });
    }

    console.log("Incrementing analytics for user");
    user.analytics.views = (user.analytics.views || 0) + 1;
    user.analytics.lastViewedAt = new Date();
    await user.save();

    console.log("Returning public portfolio");
    res.json({
      success: true,
      resume: user.resumeData || {},
      templateId: user.selectedTemplate || "",
    });
  } catch (err) {
    console.error("getPublicPortfolio err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.switchTemplate = async (req, res) => {
  console.log("switchTemplate called with body:", req.body);
  try {
    const { templateId } = req.body;
    if (!templateId) {
      console.log("Template ID missing in request body");
      return res.status(400).json({ success: false, message: "Template ID required" });
    }

    console.log("Fetching user with ID:", req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      console.log("User not found with ID:", req.userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Switching template for user:", req.userId, "to template:", templateId);
    user.selectedTemplate = templateId;
    await user.save();

    console.log("Template switched successfully for user:", req.userId);
    res.json({ success: true, message: "Template switched", selectedTemplate: templateId });
  } catch (err) {
    console.error("switchTemplate err:", err);
    res.status(500).json({ success: false, message: "Error switching template" });
  }
};
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -otp -otpExpires");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        paid: user.paid,
        selectedTemplate: user.selectedTemplate,
        resume: user.resumeData,
        payments: user.payments || [],
      },
      analytics: user.analytics || {},
    });
  } catch (err) {
    console.error("getDashboard err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
