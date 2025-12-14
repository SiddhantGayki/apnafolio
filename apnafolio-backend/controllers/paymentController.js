// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

// ------------------------------------------------
// CREATE ORDER
// ------------------------------------------------
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const options = {
      amount: Number(amount) * 100,   // 👈 FIXED
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("❌ createOrder error:", err);
    return res.status(500).json({ success: false, message: "Order create failed" });
  }
};

// ------------------------------------------------
// VERIFY PAYMENT
// ------------------------------------------------
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      templateId,
      amount,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ success: false, message: "Missing fields" });

    // CHECK SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET) // 👈 FIXED
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature)
      return res.status(400).json({ success: false, message: "Invalid signature" });

    // UPDATE USER
    let user = null;
    if (req.userId) {
      user = await User.findById(req.userId);

      if (user) {
        user.paid = true;
        user.selectedTemplate = templateId;

        user.payments.push({
          amount: Number(amount),
          status: "success",
          txnId: razorpay_payment_id,
          templateId,
          date: new Date(),
        });

        await user.save();
      }
    }

    // SAVE TRANSACTION
    await Transaction.create({
      userId: user?._id || null,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: Number(amount),
      status: "success",
      meta: { templateId },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
