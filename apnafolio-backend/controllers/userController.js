const User = require("../models/User");

exports.saveResume = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.resumeData = req.body;
    await user.save();

    res.json({ success: true, message: "Resume saved" });
  } catch (err) {
    console.error("saveResume err:", err);
    res.status(500).json({ success: false, message: "Error saving resume" });
  }
};

exports.getPublicPortfolio = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.paid) return res.status(404).json({ success: false, message: "Not found" });

    // increment analytics
    user.analytics.views = (user.analytics.views || 0) + 1;
    user.analytics.lastViewedAt = new Date();
    await user.save();

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
  try {
    const { templateId } = req.body;
    if (!templateId) return res.status(400).json({ success: false, message: "Template ID required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // For now allow free switch; integrate payment if needed
    user.selectedTemplate = templateId;
    await user.save();

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
