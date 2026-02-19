// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// ✅ Razorpay init
const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    let { amount } = req.body; 

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const amountInPaise = Math.round(Number(amount) * 100); 

    const order = await razorpay.orders.create({
      amount: amountInPaise, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return res.json({ success: true, order });
  } catch (err) {
    console.error("❌ createOrder err:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      templateId,
      amount,
      purchaseType
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay fields",
      });
    }

    // ✅ Verify Signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    // const now = new Date();

    // // Helper: Add 1 Year safely
    // const addOneYear = (date) => {
    //   const d = new Date(date);
    //   d.setFullYear(d.getFullYear() + 1);
    //   return d;
    // };

    // // Helper: Add 1 Month safely
    // const addOneMonth = (date) => {
    //   const d = new Date(date);
    //   d.setMonth(d.getMonth() + 1);
    //   return d;
    // };

    // // =================================================
    // // 🎯 TEMPLATE PURCHASE
    // // =================================================
    // if (purchaseType === "template") {

    //   user.paid = true;
    //   user.selectedTemplate = templateId;
    //   user.planType = "template";

    //   // 🔥 Extend if active, else start fresh
    //   if (user.planExpiry && user.planExpiry > now) {
    //     user.planExpiry = addOneYear(user.planExpiry);
    //   } else {
    //     user.planExpiry = addOneYear(now);
    //   }

    //   // 🎁 Add 3 Free Credits (stacking allowed)
    //   user.freeEditCredits = (user.freeEditCredits || 0) + 3;
    //   user.freeEditExpiry = addOneMonth(now);
    // }

    // // =================================================
    // // 🎯 YEARLY SUBSCRIPTION
    // // =================================================
    // if (purchaseType === "yearly") {

    //   user.paid = true;
    //   user.planType = "yearly";

    //   if (user.planExpiry && user.planExpiry > now) {
    //     user.planExpiry = addOneYear(user.planExpiry);
    //   } else {
    //     user.planExpiry = addOneYear(now);
    //   }
    // }
const now = new Date();

const add45Days = (date) =>
  new Date(date.getTime() + 45 * 24 * 60 * 60 * 1000);

// ================= TEMPLATE =================
if (purchaseType === "template") {

  user.paid = true;
  user.selectedTemplate = templateId;
  user.planType = "yearly";

  // 🔥 RESET FROM TODAY (NO MERGE)
  user.planExpiry = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000
  );
// user.planExpiry = new Date("2030-01-01");

  user.isBlocked = false;

  // Free credits only first time
  if (!user.hasReceivedFreeCredits) {
    user.freeEditCredits = 3;
    user.freeEditExpiry = add45Days(now);
    user.hasReceivedFreeCredits = true;
  }
}

// ================= YEARLY =================
if (purchaseType === "yearly") {

  user.paid = true;
  user.planType = "yearly";

  // 🔥 RESET FROM TODAY
  user.planExpiry = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000
  );

  user.isBlocked = false;
}

    // =================================================
    // 🎯 BUY 1 CREDIT
    // =================================================
    if (purchaseType === "credit1") {
      user.paidEditCredits = (user.paidEditCredits || 0) + 1;
    }

    // =================================================
    // 🎯 BUY 3 CREDITS
    // =================================================
    if (purchaseType === "credit3") {
      user.paidEditCredits = (user.paidEditCredits || 0) + 3;
    }

    await user.save();

    // ✅ Save Transaction
    await Transaction.create({
      userId: user._id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: Number(amount),
      status: "success",
      meta: { purchaseType, templateId },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (err) {
    console.error("❌ VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       templateId,
//       amount,
//       purchaseType // "template" | "yearly" | "credit1" | "credit3"
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing Razorpay fields",
//       });
//     }

//     // ✅ Signature Verification
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZOR_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     const user = await User.findById(req.userId);
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const now = new Date();

//     // =========================================
//     // 🎯 TEMPLATE PURCHASE
//     // =========================================
//     if (purchaseType === "template") {
//       user.paid = true;
//       user.selectedTemplate = templateId;
//       user.planType = "template";

//       // ✅ 1 Year Validity
//       user.planExpiry = new Date(
//         now.setFullYear(now.getFullYear() + 1)
//       );

//       // ✅ 3 Free Credits (1 Month Valid)
//       user.freeEditCredits = 3;
//       user.freeEditExpiry = new Date(
//         new Date().setMonth(new Date().getMonth() + 1)
//       );
//     }

//     // =========================================
//     // 🎯 YEARLY SUBSCRIPTION
//     // =========================================
//     if (purchaseType === "yearly") {
//       user.paid = true;
//       user.planType = "yearly";

//       user.planExpiry = new Date(
//         now.setFullYear(now.getFullYear() + 1)
//       );
//     }

//     // =========================================
//     // 🎯 BUY 1 CREDIT (₹49)
//     // =========================================
//     if (purchaseType === "credit1") {
//       user.paidEditCredits =
//         (user.paidEditCredits || 0) + 1;
//     }

//     // =========================================
//     // 🎯 BUY 3 CREDITS (₹99)
//     // =========================================
//     if (purchaseType === "credit3") {
//       user.paidEditCredits =
//         (user.paidEditCredits || 0) + 3;
//     }

//     await user.save();

//     // ✅ Save Transaction
//     await Transaction.create({
//       userId: user._id,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       amount: Number(amount),
//       status: "success",
//       meta: { purchaseType, templateId },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });

//   } catch (err) {
//     console.error("❌ VERIFY PAYMENT ERROR:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };