const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendOtp = require("../utils/sendOtp");

// 📌 Forgot Password → send OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    user.otp = otpHash;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtp(user.email, otp);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("forgotPassword err:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// 📌 Reset Password → verify OTP + update password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = "";
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword err:", err);
    res.status(500).json({ message: "Reset failed" });
  }
};
