// models/Transaction.js
const mongoose = require("mongoose");

console.log("Defining transaction schema");
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true }, // paise
  status: { type: String, enum: ["success", "failed", "pending"], default: "success" },
  meta: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

console.log("Exporting transaction model");
module.exports = mongoose.model("Transaction", transactionSchema);
