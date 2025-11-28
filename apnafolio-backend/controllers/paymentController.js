// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});
// controllers/paymentController.js
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const options = {
      amount: parseInt(amount, 10),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay Order Created:", order);
    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("❌ createOrder err:", err);
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: err.message,
    });
  }
};

// ✅ Create Razorpay Order
// exports.createOrder = async (req, res) => {
//   try {
//     console.log("🟢 createOrder request body:", req.body);
//     let { amount } = req.body;

//     if (!amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ success: false, message: "Invalid amount" });
//     }

//     amount = parseInt(amount, 10);
//     const options = {
//       amount, // amount in paise
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     console.log("✅ Razorpay Order Created:", order.id);

//     return res.json({ success: true, order });
//   } catch (err) {
//     console.error("❌ createOrder err:", err);
//     res.status(500).json({ success: false, message: "Error creating order", error: err.message });
//   }
// };

// ✅ Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      templateId,
      amount,
    } = req.body;

    console.log("🟣 verifyPayment body:", req.body);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    // 🧩 Signature Verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Invalid Razorpay Signature");
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // 🧠 Optional: Update user if logged in
    let user = null;
    if (req.userId) {
      user = await User.findById(req.userId);
      if (user) {
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
      }
    }

    // 💾 Log Transaction in DB
    const savedTxn = await Transaction.create({
      userId: user?._id || null,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: parseInt(amount || 0, 10),
      status: "success",
      meta: { templateId },
    });

    console.log("💰 Payment verified & saved:", savedTxn._id);

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("verifyPayment err:", err);
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: err.message,
    });
  }
};



// // controllers/paymentController.js
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction"); // ensure model exists

// const razorpay = new Razorpay({
//   key_id: process.env.RAZOR_KEY_ID,
//   key_secret: process.env.RAZOR_SECRET,
// });

// // ✅ Create Razorpay Order
// // exports.createOrder = async (req, res) => {
// //   try {
// //     let { amount } = req.body; // amount in paise (integer)
// //     if (!amount || isNaN(amount) || amount <= 0) {
// //       return res.status(400).json({ success: false, message: "Invalid amount" });
// //     }

// //     amount = parseInt(amount, 10);
// //     const options = { amount, currency: "INR", receipt: "receipt_" + Date.now() };
// //     const order = await razorpay.orders.create(options);

// //     return res.json({ success: true, order });
// //   } catch (err) {
// //     console.error("createOrder err:", err);
// //     res.status(500).json({ success: false, message: "Error creating order" });
// //   }
// // };

// // exports.createOrder = async (req, res) => {
// //   try {
// //     console.log("🟢 Order body:", req.body); // <-- debug
// //     let { amount } = req.body;
// //     if (!amount || isNaN(amount)) {
// //       return res.status(400).json({ success: false, message: "Invalid amount" });
// //     }
// //     amount = parseInt(amount, 10);
// //     const order = await razorpay.orders.create({ amount, currency: "INR", receipt: "rcpt_" + Date.now() });
// //     console.log("✅ Order created:", order); // <-- debug
// //     return res.json({ success: true, order });
// //   } catch (err) {
// //     console.error("createOrder err:", err);
// //     res.status(500).json({ success: false, message: "Error creating order" });
// //   }
// // };

// // old
// exports.createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount" });

//     const options = {
//       amount: amount, // in paise
//       currency: "INR",
//       receipt: "receipt_order_" + Math.random().toString(36).substring(2, 9),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error("createOrder err:", err);
//     res.status(500).json({ message: "Error creating order", error: err.message });
//   }
// };
// // ✅ Verify Razorpay Payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, amount } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Missing payment fields" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expected = crypto.createHmac("sha256", process.env.RAZOR_SECRET).update(body.toString()).digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     user.paid = true;
//     if (templateId) user.selectedTemplate = templateId;

//     const paidAmount = parseInt(amount || 0, 10);
//     user.payments.push({
//       amount: paidAmount,
//       status: "success",
//       date: new Date(),
//       txnId: razorpay_payment_id,
//       templateId,
//     });

//     await user.save();

//     // ✅ Save transaction separately
//     await Transaction.create({
//       userId: user._id,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       amount: paidAmount,
//       status: "success",
//       meta: { templateId },
//     });

//     return res.json({ success: true, message: "Payment verified" });
//   } catch (err) {
//     console.error("verifyPayment err:", err);
//     res.status(500).json({ success: false, message: "Verification failed" });
//   }
// };
