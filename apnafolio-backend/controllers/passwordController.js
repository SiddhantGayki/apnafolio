const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    user.resetToken = hashedToken;
    user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();

    // Send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    await transporter.sendMail({
      from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>Click below to reset password</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ success: true, message: "Password reset link sent to email" });
  } catch (err) {
    console.error("forgotPassword err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!user.resetTokenExpires || user.resetTokenExpires < new Date())
      return res.status(400).json({ success: false, message: "Token expired" });

    const isMatch = await bcrypt.compare(token, user.resetToken);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword err:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
