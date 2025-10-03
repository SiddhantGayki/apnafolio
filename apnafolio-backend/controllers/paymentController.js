const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});

// Template wise prices (INR)
const templatePrices = {
  template1: 299,
  template2: 399,
  template3: 499,
  template4: 599,
  template5: 699,
  template6: 799,
  template7: 899,
  template8: 999,
  template9: 1099,
  template10: 1199,
  template11: 1299,
};

// ✅ Create Order
exports.createOrder = async (req, res) => {
  try {
    const { templateId } = req.body;

    if (!templateId || !templatePrices[templateId]) {
      return res.status(400).json({ success: false, message: "Invalid template" });
    }

    const amount = templatePrices[templateId] * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json({ success: true, order, templateId, amount: templatePrices[templateId] });
  } catch (err) {
    console.error("createOrder err:", err);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// ✅ Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, amount } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    // Signature check
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Amount double-check
    const razorOrder = await razorpay.orders.fetch(razorpay_order_id);
    if (!razorOrder || razorOrder.amount !== parseInt(amount, 10) * 100) {
      return res.status(400).json({ success: false, message: "Amount mismatch" });
    }

    // Update User
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.paid = true;
    user.selectedTemplate = templateId;
    user.payments.push({
      amount: parseInt(amount, 10),
      status: "success",
      date: new Date(),
      txnId: razorpay_payment_id,
      templateId,
    });

    await user.save();

    await Transaction.create({
      userId: user._id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: parseInt(amount, 10),
      status: "success",
      meta: { templateId },
    });

    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error("verifyPayment err:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};


// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZOR_KEY_ID,      // Render .env
//   key_secret: process.env.RAZOR_SECRET,
// });

// // Template wise prices (INR)
// const templatePrices = {
//   template1: 299,
//   template2: 399,
//   template3: 499,
//   template4: 599,
//   template5: 699,
//   template6: 799,
//   template7: 899,
//   template8: 999,
//   template9: 1099,
//   template10: 1199,
//   template11: 1299,
// };

// // ✅ Create Razorpay Order
// exports.createOrder = async (req, res) => {
//   try {
//     const { templateId } = req.body;

//     if (!templateId || !templatePrices[templateId]) {
//       return res.status(400).json({ success: false, message: "Invalid template" });
//     }

//     const amount = templatePrices[templateId] * 100; // paise

//     const options = {
//       amount,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order, templateId, amount: templatePrices[templateId] });
//   } catch (err) {
//     console.error("createOrder err:", err);
//     res.status(500).json({ success: false, message: "Error creating order" });
//   }
// };

// // ✅ Verify Razorpay Payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       templateId,
//       amount,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Missing payment fields" });
//     }

//     // 🔒 Signature verification
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expected = crypto
//       .createHmac("sha256", process.env.RAZOR_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // 🔄 Update user payment info
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

//     // 🔄 Save transaction
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


// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZOR_KEY_ID,      // ✅ matches .env
//   key_secret: process.env.RAZOR_SECRET,
// });

// console.log("🔑 Razorpay Key:", process.env.RAZOR_KEY_ID ? "Present" : "Missing");
// console.log("🔑 Razorpay Secret:", process.env.RAZOR_SECRET ? "Present" : "Missing");

// exports.createOrder = async (req, res) => {
//   try {
//     let { amount } = req.body; // frontend sends INR
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ success: false, message: "Invalid amount" });
//     }

//     // convert INR → paise (mandatory for Razorpay)
//     amount = parseInt(amount, 10) * 100;

//     const options = {
//       amount,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });
//   } catch (err) {
//     console.error("createOrder err:", err);
//     res.status(500).json({ success: false, message: "Error creating order" });
//   }
// };

// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       templateId,
//       amount,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Missing payment fields" });
//     }

//     // signature verify
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expected = crypto
//       .createHmac("sha256", process.env.RAZOR_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // user update
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





// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const User = require("../models/User");
// const Transaction = require("../models/Transaction");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZOR_KEY_ID,
//   key_secret: process.env.RAZOR_SECRET,
// });

// exports.createOrder = async (req, res) => {
//   try {
//     let { amount } = req.body; // INR
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ success: false, message: "Invalid amount" });
//     }

//     amount = parseInt(amount, 10) * 100; // convert INR → paise

//     const options = { amount, currency: "INR", receipt: "receipt_" + Date.now() };
//     const order = await razorpay.orders.create(options);

//     res.json({ success: true, order });
//   } catch (err) {
//     console.error("createOrder err:", err);
//     res.status(500).json({ success: false, message: "Error creating order" });
//   }
// };

// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, amount } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Missing payment fields" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expected = crypto.createHmac("sha256", process.env.RAZOR_SECRET).update(body).digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     user.paid = true;
//     if (templateId) user.selectedTemplate = templateId;

//     const paidAmount = parseInt(amount || 0, 10);
//     user.payments.push({ amount: paidAmount, status: "success", date: new Date(), txnId: razorpay_payment_id, templateId });

//     await user.save();

//     await Transaction.create({ userId: user._id, orderId: razorpay_order_id, paymentId: razorpay_payment_id, amount: paidAmount, status: "success", meta: { templateId } });

//     res.json({ success: true, message: "Payment verified" });
//   } catch (err) {
//     console.error("verifyPayment err:", err);
//     res.status(500).json({ success: false, message: "Verification failed" });
//   }
// };







// // // controllers/paymentController.js
// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");
// // const User = require("../models/User");
// // const Transaction = require("../models/Transaction"); // ensure model exists
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZOR_KEY_ID,
// //   key_secret: process.env.RAZOR_SECRET,
// // });

// // exports.createOrder = async (req, res) => {
// //   try {
// //     let { amount } = req.body; // expect amount in paise (integer)
// //     if (!amount || isNaN(amount) || amount <= 0) {
// //       return res.status(400).json({ success: false, message: "Invalid amount" });
// //     }
// //     amount = parseInt(amount, 10);

// //     const options = { amount, currency: "INR", receipt: "receipt_" + Date.now() };
// //     const order = await razorpay.orders.create(options);
// //     res.json({ success: true, order });
// //   } catch (err) {
// //     console.error("createOrder err:", err);
// //     res.status(500).json({ success: false, message: "Error creating order" });
// //   }
// // };

// // exports.verifyPayment = async (req, res) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, amount } = req.body;
// //     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
// //       return res.status(400).json({ success: false, message: "Missing payment fields" });
// //     }

// //     const body = razorpay_order_id + "|" + razorpay_payment_id;
// //     const expected = crypto.createHmac("sha256", process.env.RAZOR_SECRET).update(body.toString()).digest("hex");

// //     if (expected !== razorpay_signature) {
// //       return res.status(400).json({ success: false, message: "Invalid signature" });
// //     }

// //     const user = await User.findById(req.userId);
// //     if (!user) return res.status(404).json({ success: false, message: "User not found" });

// //     user.paid = true;
// //     if (templateId) user.selectedTemplate = templateId;

// //     const paidAmount = parseInt(amount || 0, 10); // paise
// //     user.payments.push({
// //       amount: paidAmount,
// //       status: "success",
// //       date: new Date(),
// //       txnId: razorpay_payment_id,
// //       templateId,
// //     });

// //     await user.save();

// //     // save transaction separately
// //     await Transaction.create({
// //       userId: user._id,
// //       orderId: razorpay_order_id,
// //       paymentId: razorpay_payment_id,
// //       amount: paidAmount,
// //       status: "success",
// //       meta: { templateId },
// //     });

// //     return res.json({ success: true, message: "Payment verified" });
// //   } catch (err) {
// //     console.error("verifyPayment err:", err);
// //     res.status(500).json({ success: false, message: "Verification failed" });
// //   }
// // };


// // // const Razorpay = require("razorpay");
// // // const crypto = require("crypto");
// // // const User = require("../models/User");
// // // const Transaction = require("../models/Transaction"); // ensure this exists

// // // const razorpay = new Razorpay({
// // //   key_id: process.env.RAZOR_KEY_ID,
// // //   key_secret: process.env.RAZOR_SECRET,
// // // });

// // // exports.createOrder = async (req, res) => {
// // //   try {
// // //     let { amount } = req.body; // amount in paise
// // //     if (!amount || isNaN(amount) || amount <= 0) {
// // //       return res.status(400).json({ success: false, message: "Invalid amount" });
// // //     }

// // //     const options = {
// // //       amount: parseInt(amount, 10),
// // //       currency: "INR",
// // //       receipt: "receipt_" + Date.now(),
// // //     };

// // //     const order = await razorpay.orders.create(options);
// // //     return res.json(order); // ✅ return only order object (as Razorpay expects)
// // //   } catch (err) {
// // //     console.error("createOrder err:", err);
// // //     return res.status(500).json({ success: false, message: "Error creating order" });
// // //   }
// // // };

// // // exports.verifyPayment = async (req, res) => {
// // //   try {
// // //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, amount } = req.body;
// // //     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
// // //       return res.status(400).json({ success: false, message: "Missing payment fields" });
// // //     }

// // //     // Verify signature
// // //     const body = razorpay_order_id + "|" + razorpay_payment_id;
// // //     const expected = crypto.createHmac("sha256", process.env.RAZOR_SECRET)
// // //       .update(body.toString())
// // //       .digest("hex");

// // //     if (expected !== razorpay_signature) {
// // //       return res.status(400).json({ success: false, message: "Invalid signature" });
// // //     }

// // //     // Update user payment info
// // //     const user = await User.findById(req.userId);
// // //     if (!user) return res.status(404).json({ success: false, message: "User not found" });

// // //     user.paid = true;
// // //     if (templateId) user.selectedTemplate = templateId;

// // //     const paidAmount = parseInt(amount || 0, 10);
// // //     user.payments.push({
// // //       amount: paidAmount,
// // //       status: "success",
// // //       date: new Date(),
// // //       txnId: razorpay_payment_id,
// // //       templateId,
// // //     });

// // //     await user.save();

// // //     // Save transaction separately
// // //     if (Transaction) {
// // //       await Transaction.create({
// // //         userId: user._id,
// // //         orderId: razorpay_order_id,
// // //         paymentId: razorpay_payment_id,
// // //         amount: paidAmount,
// // //         status: "success",
// // //         meta: { templateId },
// // //       });
// // //     }

// // //     return res.json({ success: true, message: "Payment verified" });
// // //   } catch (err) {
// // //     console.error("verifyPayment err:", err);
// // //     return res.status(500).json({ success: false, message: "Verification failed" });
// // //   }
// // // };
