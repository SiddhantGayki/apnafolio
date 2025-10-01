// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ success: false, message: "Email required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const token = crypto.randomBytes(32).toString("hex");
//     const hashedToken = await bcrypt.hash(token, 10);

//     user.resetToken = hashedToken;
//     user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
//     await user.save();

//     // Send mail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

//     await transporter.sendMail({
//       from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: "Reset your password",
//       html: `<p>Click below to reset password</p><a href="${resetLink}">${resetLink}</a>`,
//     });

//     res.json({ success: true, message: "Password reset link sent to email" });
//   } catch (err) {
//     console.error("forgotPassword err:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, token, newPassword } = req.body;
//     if (!email || !token || !newPassword)
//       return res.status(400).json({ success: false, message: "Missing fields" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     if (!user.resetTokenExpires || user.resetTokenExpires < new Date())
//       return res.status(400).json({ success: false, message: "Token expired" });

//     const isMatch = await bcrypt.compare(token, user.resetToken);
//     if (!isMatch) return res.status(400).json({ success: false, message: "Invalid token" });

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetToken = null;
//     user.resetTokenExpires = null;
//     await user.save();

//     res.json({ success: true, message: "Password reset successful" });
//   } catch (err) {
//     console.error("resetPassword err:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


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
