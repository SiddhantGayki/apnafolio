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


// const User = require("../models/User");
// // const Payment = require("../models/Payment");
// const Transaction = require("../models/Transaction");


// /* =====================================================
//    GET STATS (REAL DATA ONLY - NO FAKE CALCULATION)
// ===================================================== */

// exports.getStats = async (req, res) => {
//   try {

//     /* ================= USERS ================= */

//     const totalUsers = await User.countDocuments();
//     const paidUsers = await User.countDocuments({ paid: true });

//     /* ================= PAYMENTS ================= */

//     // const payments = await Payment.find({ status: "success" });

//     // // Total gross revenue (paise)
//     // const grossPaise = payments.reduce((sum, p) => sum + p.amount, 0);
//     const transactions = await Transaction.find({ status: "success" });

// const grossPaise = transactions.reduce((sum, t) => sum + t.amount, 0);
// const netPaise = transactions.reduce((sum, t) => sum + t.netAmount, 0);

//     // Convert to rupees
//     const grossRevenue = grossPaise / 100;

//     // Net revenue (98%)
//     const netRevenue = grossRevenue * 0.98;

//     /* ================= MONTHLY USER SIGNUPS ================= */

//     const userAgg = await User.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
//           users: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const userChart = userAgg.map(item => ({
//       month: item._id,
//       users: item.users
//     }));

//     /* ================= MONTHLY REVENUE ================= */

//     const earningAgg = await Payment.aggregate([
//       { $match: { status: "success" } },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
//           total: { $sum: "$amount" }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const earningChart = earningAgg.map(item => ({
//       month: item._id,
//       revenue: (item.total / 100) * 0.98
//     }));

//     return res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         paidUsers,
//         revenue: grossRevenue.toFixed(2),
//         networth: netRevenue.toFixed(2)
//       },
//       userChart,
//       earningChart
//     });

//   } catch (err) {
//     console.error("getStats error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };

// const User = require("../models/User");
// const Transaction = require("../models/Transaction");
// const AWS = require("aws-sdk");

// exports.getStats = async (req, res) => {
//   try {

//     /* ================= USERS ================= */

//     const totalUsers = await User.countDocuments();
//     const paidUsers = await User.countDocuments({ paid: true });

//     const users = await User.find({}, "editCredits");

//     const totalCredits = users.reduce((sum, u) => sum + (u.editCredits || 0), 0);

//     /* ================= TRANSACTIONS ================= */

//     const transactions = await Transaction.find({ status: "success" });

//     const grossPaise = transactions.reduce((sum, t) => sum + t.amount, 0);
//     const netPaise = transactions.reduce((sum, t) => sum + (t.netAmount || 0), 0);

//     const grossRevenue = grossPaise / 100;
//     const netRevenue = netPaise / 100;

//     /* ================= MONTHLY USER SIGNUPS ================= */

//     const userAgg = await User.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
//           users: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const userChart = userAgg.map(item => ({
//       month: item._id,
//       users: item.users
//     }));

//     /* ================= MONTHLY NET REVENUE ================= */

//     const earningAgg = await Transaction.aggregate([
//       { $match: { status: "success" } },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
//           revenue: { $sum: "$netAmount" }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const earningChart = earningAgg.map(item => ({
//       month: item._id,
//       revenue: item.revenue / 100
//     }));



    
//     /* ================= S3 TOTAL STORAGE ================= */

//     const s3 = new AWS.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_KEY,
//       region: process.env.AWS_REGION
//     });

//     const objects = await s3.listObjectsV2({
//       Bucket: process.env.AWS_BUCKET_NAME
//     }).promise();

//     const totalBytes = objects.Contents.reduce((sum, obj) => sum + obj.Size, 0);

//     const totalStorageMB = (totalBytes / (1024 * 1024)).toFixed(2);

//     /* ================= RESPONSE ================= */

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         paidUsers,
//         revenue: grossRevenue.toFixed(2),
//         networth: netRevenue.toFixed(2),
//         totalCredits,
//         totalStorageMB
//       },
//       userChart,
//       earningChart
//     });

//   } catch (err) {
//     console.error("getStats error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =====================================================
//    UPDATE USER (FULL CONTROL)
// ===================================================== */

// exports.updateUser = async (req, res) => {
//   try {

//     const {
//       userId,
//       paid,
//       selectedTemplate,
//       isAdmin,
//       suspended,
//       extendYear,
//       addCredits
//     } = req.body;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "userId required"
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     /* ===== Basic Updates ===== */

//     if (paid !== undefined) user.paid = !!paid;
//     if (selectedTemplate !== undefined)
//       user.selectedTemplate = selectedTemplate || "";
//     if (isAdmin !== undefined) user.isAdmin = !!isAdmin;
//     if (suspended !== undefined) user.suspended = !!suspended;

//     /* ===== Extend Plan ===== */

//     if (extendYear) {
//       const now = new Date();
//       const baseDate = user.planExpiry && user.planExpiry > now
//         ? user.planExpiry
//         : now;

//       const newExpiry = new Date(baseDate);
//       newExpiry.setFullYear(newExpiry.getFullYear() + 1);

//       user.planExpiry = newExpiry;
//       user.paid = true;
//     }

//     /* ===== Add Credits ===== */

//     if (addCredits) {
//       user.editCredits = (user.editCredits || 0) + Number(addCredits);
//     }

//     await user.save();

//     return res.json({
//       success: true,
//       message: "User updated successfully",
//       user
//     });

//   } catch (err) {
//     console.error("updateUser error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };

// /* =====================================================
//    DELETE USER
// ===================================================== */

// exports.deleteUser = async (req, res) => {
//   try {

//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "User id required"
//       });
//     }

//     const deleted = await User.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     return res.json({
//       success: true,
//       message: "User deleted successfully"
//     });

//   } catch (err) {
//     console.error("deleteUser error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const { page = 1, limit = 12, search = "", filter = "all" } = req.query;

//     const query = {};

//     if (search) {
//       query.$or = [
//         { name: new RegExp(search, "i") },
//         { email: new RegExp(search, "i") },
//         { username: new RegExp(search, "i") }
//       ];
//     }

//     if (filter === "paid") query.paid = true;
//     if (filter === "unpaid") query.paid = false;

//     const users = await User.find(query)
//       .select("-password -otp -resetToken")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total = await User.countDocuments(query);

//     res.json({
//       success: true,
//       users,
//       total
//     });

//   } catch (err) {
//     console.error("getAllUsers error:", err);
//     res.status(500).json({ success: false });
//   }
// };




// const User = require("../models/User");
// const Transaction = require("../models/Transaction");
// const AWS = require("aws-sdk");

// /* =====================================================
//    GET ADMIN STATS (100% REAL DATA)
// ===================================================== */

// exports.getStats = async (req, res) => {
//   try {

//     /* ================= USERS ================= */

//     const totalUsers = await User.countDocuments();
//     const paidUsers = await User.countDocuments({ paid: true });

//     const users = await User.find({}, "editCredits freeEditCredits paidEditCredits");

//     const totalCredits = users.reduce((sum, u) => {
//       return sum +
//         (u.editCredits || 0) +
//         (u.freeEditCredits || 0) +
//         (u.paidEditCredits || 0);
//     }, 0);

//     /* ================= TRANSACTIONS ================= */

//     const transactions = await Transaction.find({ status: "success" });

//     const grossPaise = transactions.reduce((sum, t) => {
//       return sum + (t.amount || 0);
//     }, 0);

//     const netPaise = transactions.reduce((sum, t) => {
//       // If netAmount exists use it else auto 98%
//       const net = t.netAmount !== undefined
//         ? t.netAmount
//         : Math.floor((t.amount || 0) * 0.98);

//       return sum + net;
//     }, 0);

//     const grossRevenue = grossPaise / 100;
//     const netRevenue = netPaise / 100;

//     /* ================= MONTHLY USER SIGNUPS ================= */

//     const userAgg = await User.aggregate([
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m", date: "$createdAt" }
//           },
//           users: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const userChart = userAgg.map(item => ({
//       month: item._id,
//       users: item.users
//     }));

//     /* ================= MONTHLY NET REVENUE ================= */

//     const earningAgg = await Transaction.aggregate([
//       { $match: { status: "success" } },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m", date: "$createdAt" }
//           },
//           revenue: {
//             $sum: {
//               $cond: [
//                 { $ifNull: ["$netAmount", false] },
//                 "$netAmount",
//                 { $multiply: ["$amount", 0.98] }
//               ]
//             }
//           }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const earningChart = earningAgg.map(item => ({
//       month: item._id,
//       revenue: (item.revenue || 0) / 100
//     }));

//     /* ================= S3 TOTAL STORAGE ================= */

//     const s3 = new AWS.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_KEY,
//       region: process.env.AWS_REGION
//     });

//     let totalBytes = 0;
//     let continuationToken = null;

//     do {
//       const response = await s3.listObjectsV2({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         ContinuationToken: continuationToken
//       }).promise();

//       response.Contents.forEach(obj => {
//         totalBytes += obj.Size;
//       });

//       continuationToken = response.IsTruncated
//         ? response.NextContinuationToken
//         : null;

//     } while (continuationToken);

//     const totalStorageMB = (totalBytes / (1024 * 1024)).toFixed(2);

//     /* ================= FINAL RESPONSE ================= */

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         paidUsers,
//         revenue: grossRevenue.toFixed(2),
//         networth: netRevenue.toFixed(2),
//         totalCredits,
//         totalStorageMB
//       },
//       userChart,
//       earningChart
//     });

//   } catch (err) {
//     console.error("getStats error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };


// /* =====================================================
//    UPDATE USER (FULL CONTROL)
// ===================================================== */

// exports.updateUser = async (req, res) => {
//   try {

//     const {
//       userId,
//       paid,
//       selectedTemplate,
//       isAdmin,
//       suspended,
//       extendYear,
//       addCredits
//     } = req.body;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "userId required"
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     if (paid !== undefined) user.paid = !!paid;
//     if (selectedTemplate !== undefined)
//       user.selectedTemplate = selectedTemplate || "";
//     if (isAdmin !== undefined) user.isAdmin = !!isAdmin;
//     if (suspended !== undefined) user.suspended = !!suspended;

//     /* ===== Extend Plan ===== */

//     if (extendYear) {
//       const now = new Date();
//       const baseDate =
//         user.planExpiry && user.planExpiry > now
//           ? user.planExpiry
//           : now;

//       const newExpiry = new Date(baseDate);
//       newExpiry.setFullYear(newExpiry.getFullYear() + 1);

//       user.planExpiry = newExpiry;
//       user.paid = true;
//     }

//     /* ===== Add Credits ===== */

//     if (addCredits) {
//       user.editCredits = (user.editCredits || 0) + Number(addCredits);
//     }

//     await user.save();

//     return res.json({
//       success: true,
//       message: "User updated successfully",
//       user
//     });

//   } catch (err) {
//     console.error("updateUser error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };


// /* =====================================================
//    DELETE USER
// ===================================================== */

// exports.deleteUser = async (req, res) => {
//   try {

//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "User id required"
//       });
//     }

//     const deleted = await User.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     return res.json({
//       success: true,
//       message: "User deleted successfully"
//     });

//   } catch (err) {
//     console.error("deleteUser error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };


// /* =====================================================
//    GET ALL USERS (SEARCH + FILTER + PAGINATION)
// ===================================================== */

// exports.getAllUsers = async (req, res) => {
//   try {

//     const {
//       page = 1,
//       limit = 12,
//       search = "",
//       filter = "all"
//     } = req.query;

//     const query = {};

//     if (search) {
//       query.$or = [
//         { name: new RegExp(search, "i") },
//         { email: new RegExp(search, "i") },
//         { username: new RegExp(search, "i") }
//       ];
//     }

//     if (filter === "paid") query.paid = true;
//     if (filter === "unpaid") query.paid = false;

//     const users = await User.find(query)
//       .select("-password -otp -resetToken")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total = await User.countDocuments(query);

//     res.json({
//       success: true,
//       users,
//       total
//     });

//   } catch (err) {
//     console.error("getAllUsers error:", err);
//     res.status(500).json({
//       success: false
//     });
//   }
// };
