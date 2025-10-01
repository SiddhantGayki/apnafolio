const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/passwordController");

// 📌 Forgot Password → Send OTP
router.post("/forgot-password", forgotPassword);

// 📌 Reset Password → Verify OTP + Change Password
router.post("/reset-password", resetPassword);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { forgotPassword, resetPassword } = require("../controllers/passwordController");

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// module.exports = router;
