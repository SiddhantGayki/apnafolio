const User = require("../models/User");
const deleteFromS3 = require("../utils/s3Delete");

// ===============================
// ✅ GET RESUME (EDIT MODE)
// ===============================
exports.getResume = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    // Manual block only
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked",
      });
    }

    res.json(user.resumeData || {});
  } catch (err) {
    console.error("getResume error:", err);
    res.status(500).json({ success: false, message: "Error fetching resume" });
  }
};

// ===============================
// ✅ SAVE RESUME
// ===============================
exports.saveResume = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const now = new Date();

    // 1️⃣ Manual block check
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked",
      });
    }

    // 2️⃣ Plan expiry check (NO auto block)
    // if (user.planExpiry && now > user.planExpiry) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Your plan expired. Please renew.",
    //   });
    // }

    if (
  user.planExpiry !== null &&
  new Date() > new Date(user.planExpiry)
) {
  return res.status(403).json({
    success: false,
    message: "Your plan expired. Please renew.",
  });
}


    // 3️⃣ Expire free credits if needed
    if (user.freeEditExpiry && now > user.freeEditExpiry) {
      user.freeEditCredits = 0;
    }

    // 4️⃣ Deduct edit credit
    if (user.freeEditCredits > 0) {
      user.freeEditCredits -= 1;
    } else if (user.paidEditCredits > 0) {
      user.paidEditCredits -= 1;
    } else {
      return res.status(403).json({
        success: false,
        message: "No edit credits available. Please buy credits.",
      });
    }

    const oldResume = user.resumeData || {};
    const newResume = req.body || {};

    // 5️⃣ Delete replaced profile photo
    if (
      oldResume.contact?.photo &&
      newResume.contact?.photo &&
      oldResume.contact.photo !== newResume.contact.photo
    ) {
      await deleteFromS3(oldResume.contact.photo);
    }

    // 6️⃣ Delete replaced resume file
    if (
      oldResume.resumeFile &&
      newResume.resumeFile &&
      oldResume.resumeFile !== newResume.resumeFile
    ) {
      await deleteFromS3(oldResume.resumeFile);
    }

    // 7️⃣ Save new resume
    user.resumeData = newResume;
    await user.save();

    res.json({
      success: true,
      remainingFreeCredits: user.freeEditCredits,
      remainingPaidCredits: user.paidEditCredits,
    });

  } catch (err) {
    console.error("saveResume error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
  console.log("===== SAVE DEBUG =====");
console.log("Blocked:", user.isBlocked);
console.log("PlanExpiry:", user.planExpiry);
console.log("Free:", user.freeEditCredits);
console.log("Paid:", user.paidEditCredits);

};

// ===============================
// 🌍 PUBLIC PORTFOLIO
// ===============================
exports.getPublicPortfolio = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const user = await User.findOne({ usernameLower: username });

    // if (!user || !user.paid) 
    if (!user)
      {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // Manual block check
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked",
      });
    }

    // Plan expiry check (NO auto save)
    if (user.planExpiry && new Date() > user.planExpiry) {
      return res.status(403).json({
        success: false,
        message: "Portfolio expired",
      });
    }

    // Ensure analytics structure
    if (!user.analytics) {
      user.analytics = {
        totalViews: 0,
        dailyViews: [],
        lastViewedAt: null,
      };
    }

    const now = new Date();
    const fifteenMinutes = 15 * 60 * 1000;

    if (
      !user.analytics.lastViewedAt ||
      now - new Date(user.analytics.lastViewedAt) > fifteenMinutes
    ) {
      const today = now.toISOString().split("T")[0];

      const todayEntry = user.analytics.dailyViews.find(
        (d) => d.date === today
      );

      if (todayEntry) {
        todayEntry.count += 1;
      } else {
        user.analytics.dailyViews.push({ date: today, count: 1 });
      }

      user.analytics.totalViews += 1;
      user.analytics.lastViewedAt = now;

      await user.save();
    }

    res.json({
      success: true,
      resume: user.resumeData || {},
      templateId: user.selectedTemplate || "",
    });

  } catch (err) {
    console.error("getPublicPortfolio error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.switchTemplate = async (req, res) => {
  try {
    const { templateId } = req.body;

    const user = await User.findById(req.userId);

    user.selectedTemplate = templateId;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (!user.analytics) {
      user.analytics = { totalViews: 0, dailyViews: [] };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Last 7 days (including today)
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);

    // Last 30 days
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 29);

    // Previous week (for growth)
    const previousWeekStart = new Date(today);
    previousWeekStart.setDate(today.getDate() - 13);

    const previousWeekEnd = new Date(today);
    previousWeekEnd.setDate(today.getDate() - 7);

    let dailyCount = 0;
    let weeklyCount = 0;
    let monthlyCount = 0;
    let previousWeekCount = 0;

    user.analytics.dailyViews?.forEach((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      if (entryDate.getTime() === today.getTime()) {
        dailyCount += entry.count;
      }

      if (entryDate >= weekAgo) {
        weeklyCount += entry.count;
      }

      if (entryDate >= monthAgo) {
        monthlyCount += entry.count;
      }

      if (entryDate >= previousWeekStart && entryDate < previousWeekEnd) {
        previousWeekCount += entry.count;
      }
    });

    let growth = 0;

    if (previousWeekCount > 0) {
      growth = (
        ((weeklyCount - previousWeekCount) / previousWeekCount) * 100
      ).toFixed(1);
    }

    // Last 7 days chart
    const last7DaysData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const found = user.analytics.dailyViews?.find(
        (entry) => entry.date === dateStr
      );

      last7DaysData.push({
        date: dateStr,
        views: found ? found.count : 0,
      });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        username: user.username,
        selectedTemplate: user.selectedTemplate,
        planType: user.planType,
        planExpiry: user.planExpiry,
        freeEditCredits: user.freeEditCredits || 0,
        paidEditCredits: user.paidEditCredits || 0,
        freeEditExpiry: user.freeEditExpiry,
        isBlocked: user.isBlocked,
      },
      analytics: {
        totalViews: user.analytics.totalViews || 0,
        dailyViews: dailyCount,
        weeklyViews: weeklyCount,
        monthlyViews: monthlyCount,
        growth,
        last7Days: last7DaysData,
      },
      payments: user.payments || [],
    });

  } catch (err) {
    console.error("getDashboard error:", err);
    res.status(500).json({ success: false });
  }
};
