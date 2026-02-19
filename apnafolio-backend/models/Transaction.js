// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true }, // paise
  status: { type: String, enum: ["success", "failed", "pending"], default: "success" },
  meta: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);






// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//   {
//     /* ================= USER ================= */

//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true
//     },

//     /* ================= RAZORPAY DATA ================= */

//     orderId: {
//       type: String,
//       required: true,
//       index: true
//     },

//     paymentId: {
//       type: String,
//       required: true,
//       index: true
//     },

//     /* ================= FINANCIAL DATA ================= */

//     amount: {
//       type: Number,
//       required: true
//       // in paise (Razorpay format)
//     },

//     netAmount: {
//       type: Number,
//       default: 0
//       // after 98% deduction (paise)
//     },

//     platformFee: {
//       type: Number,
//       default: 0
//       // optional future use
//     },

//     /* ================= STATUS ================= */

//     status: {
//       type: String,
//       enum: ["success", "failed", "pending"],
//       default: "success",
//       index: true
//     },

//     /* ================= TYPE ================= */

//     type: {
//       type: String,
//       enum: ["subscription", "template", "credits"],
//       default: "subscription",
//       index: true
//     },

//     /* ================= COUPON ================= */

//     couponCode: {
//       type: String,
//       default: null
//     },

//     discountAmount: {
//       type: Number,
//       default: 0
//       // in paise
//     },

//     /* ================= EXTRA ================= */

//     meta: {
//       type: Object,
//       default: {}
//     }

//   },
//   {
//     timestamps: true // automatically adds createdAt & updatedAt
//   }
// );

// module.exports = mongoose.model("Transaction", transactionSchema);
