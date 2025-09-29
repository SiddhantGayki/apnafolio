// utils/sendOtp.js
const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // app password recommended
      },
    });

    const mail = {
      from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "ApnaFolio Email OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>ApnaFolio - Email Verification</h3>
          <p>Your OTP is: <strong>${otp}</strong></p>
          <p>This OTP is valid for 15 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mail);
    return true;
  } catch (err) {
    console.error("sendOtp error:", err);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtp;

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
    await sendOtp(email, otp);
    // DB मध्ये OTP save कर (expire time सह)
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
