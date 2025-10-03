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

// // models/Transaction.js
// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     orderId: String,
//     paymentId: String,
//     amount: Number,
//     status: { type: String, enum: ["success", "failed"], default: "success" },
//     meta: Object,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Transaction", transactionSchema);
