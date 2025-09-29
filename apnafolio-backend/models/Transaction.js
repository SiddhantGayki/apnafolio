// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: String,
    paymentId: String,
    amount: Number,
    status: { type: String, enum: ["success", "failed"], default: "success" },
    meta: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
