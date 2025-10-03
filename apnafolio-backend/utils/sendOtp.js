// utils/sendOtp.js
const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: process.env.MAIL_PORT || 587,
      secure: process.env.MAIL_PORT == 465, // true if 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mail = {
      from: process.env.MAIL_FROM || `"ApnaFolio" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "ApnaFolio Email OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; color:#333;">
          <h3>🔑 ApnaFolio - Email Verification</h3>
          <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
          <p>This OTP is valid for <b>15 minutes</b>.</p>
          <br/>
          <p>If you didn’t request this, please ignore.</p>
        </div>
      `,
    };

    await transporter.sendMail(mail);
    console.log(`✅ OTP sent to ${email}`);
    return true;
  } catch (err) {
    console.error("❌ sendOtp error:", err);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtp;
