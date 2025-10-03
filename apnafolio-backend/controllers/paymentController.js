// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Transaction = require("../models/Transaction"); // ensure model exists

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});

// ✅ Create Razorpay Order
// exports.createOrder = async (req, res) => {
//   try {
//     let { amount } = req.body; // amount in paise (integer)
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ success: false, message: "Invalid amount" });
//     }

//     amount = parseInt(amount, 10);
//     const options = { amount, currency: "INR", receipt: "receipt_" + Date.now() };
//     const order = await razorpay.orders.create(options);

//     return res.json({ success: true, order });
//   } catch (err) {
//     console.error("createOrder err:", err);
//     res.status(500).json({ success: false, message: "Error creating order" });
//   }
// };

exports.createOrder = async (req, res) => {
  try {
    console.log("🟢 Order body:", req.body); // <-- debug
    let { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }
    amount = parseInt(amount, 10);
    const order = await razorpay.orders.create({ amount, currency: "INR", receipt: "rcpt_" + Date.now() });
    console.log("✅ Order created:", order); // <-- debug
    return res.json({ success: true, order });
  } catch (err) {
    console.error("createOrder err:", err);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};


// ✅ Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, amount } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto.createHmac("sha256", process.env.RAZOR_SECRET).update(body.toString()).digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.paid = true;
    if (templateId) user.selectedTemplate = templateId;

    const paidAmount = parseInt(amount || 0, 10);
    user.payments.push({
      amount: paidAmount,
      status: "success",
      date: new Date(),
      txnId: razorpay_payment_id,
      templateId,
    });

    await user.save();

    // ✅ Save transaction separately
    await Transaction.create({
      userId: user._id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: paidAmount,
      status: "success",
      meta: { templateId },
    });

    return res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error("verifyPayment err:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
