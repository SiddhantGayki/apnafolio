const User = require("../models/User");

// 📌 Get Stats (dynamic with aggregation)
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const paidUsers = await User.countDocuments({ paid: true });

    // Simple revenue calc → template base price 299
    const revenue = paidUsers * 299;
    const networth = revenue * 1.2;

    // 📊 Monthly user signups (aggregation)
    const userAgg = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const userChart = userAgg.map((item) => ({
      month: item._id,
      users: item.count,
    }));

    // 📊 Monthly earnings (based on paid users created in that month)
    const earningAgg = await User.aggregate([
      { $match: { paid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          revenue: { $sum: 299 }, // fixed template price, can replace with Transaction model
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const earningChart = earningAgg.map((item) => ({
      month: item._id,
      revenue: item.revenue,
    }));

    res.json({
      success: true,
      stats: { totalUsers, paidUsers, revenue, networth },
      userChart,
      earningChart,
    });
  } catch (err) {
    console.error("getStats err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Update User (grant template, toggle admin, etc.)
exports.updateUser = async (req, res) => {
  try {
    const { userId, paid, selectedTemplate, isAdmin } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId required" });
    }

    const updateData = {};
    if (paid !== undefined) updateData.paid = !!paid;
    if (selectedTemplate !== undefined) updateData.selectedTemplate = selectedTemplate || "";
    if (isAdmin !== undefined) updateData.isAdmin = !!isAdmin;

    const updated = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password -otp -otpExpires -resetToken -resetTokenExpires",
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User updated", user: updated });
  } catch (err) {
    console.error("updateUser err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "id required" });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("deleteUser err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
