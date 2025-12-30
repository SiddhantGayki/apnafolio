const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

router.post("/order", createOrder);

router.post("/verify", auth, verifyPayment);

module.exports = router;
