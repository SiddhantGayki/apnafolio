const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const User = require("../models/User");
const adminController = require("../controllers/adminController"); // जोडायला विसरू नको

// Stats
router.get("/stats", adminAuth, adminController.getStats);

// GET /api/admin/users?search=&page=1&limit=20
router.get("/users", adminAuth, async (req, res) => {
  try {
    const { search = "", page = 1, limit = 20 } = req.query;
    const q = {};
    if (search) {
      const re = new RegExp(search.trim(), "i");
      q.$or = [{ name: re }, { email: re }, { username: re }, { usernameLower: re }];
    }
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.max(1, parseInt(limit, 10));
    const users = await User.find(q)
      .select("-password -otp -otpExpires -resetToken -resetTokenExpires")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));
    const total = await User.countDocuments(q);
    res.json({ success: true, users, total });
  } catch (err) {
    console.error("admin/users err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/admin/update-user
// body: { userId, paid, selectedTemplate, isAdmin }
router.post("/update-user", adminAuth, async (req, res) => {
  try {
    const { userId, paid, selectedTemplate, isAdmin } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "userId required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (paid !== undefined) user.paid = !!paid;
    if (selectedTemplate !== undefined) user.selectedTemplate = selectedTemplate || "";
    if (isAdmin !== undefined) user.isAdmin = !!isAdmin;

    await user.save();
    res.json({
      success: true,
      message: "User updated",
      user: {
        _id: user._id,
        email: user.email,
        paid: user.paid,
        selectedTemplate: user.selectedTemplate,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("admin/update-user err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/admin/user/:id
router.delete("/user/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("admin/delete-user err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
