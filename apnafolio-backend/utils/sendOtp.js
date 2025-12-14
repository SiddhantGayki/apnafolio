// utils/sendOtp.js
const brevo = require("@getbrevo/brevo");
require("dotenv").config();

/**
 * Sends OTP via Brevo Transactional Email API
 * @param {string} email - Recipient email address
 * @param {string} otp - OTP code
 * @returns {Promise<boolean>}
 */
const sendOtp = async (email, otp) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    // ✅ Directly assign API key using defaultApiClient
    const defaultClient = brevo.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    if (!process.env.BREVO_API_KEY) {
      console.error("❌ Missing BREVO_API_KEY in environment variables!");
      throw new Error("Missing Brevo API key");
    }

    // ✅ Prepare email
    const sendSmtpEmail = {
      sender: {
        name: "ApnaFolio",
        email: process.env.MAIL_FROM || "support@apnafolio.in",
      },
      to: [{ email }],
      subject: "ApnaFolio OTP Verification Code 🔐",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; border-radius: 10px; padding: 20px;">
          <h2 style="color: #5e17eb;">ApnaFolio Email Verification</h2>
          <p>Hi there 👋,</p>
          <p>Your One-Time Password (OTP) for verifying your email is:</p>
          <h1 style="color: #FF007F; letter-spacing: 6px;">${otp}</h1>
          <p>This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.</p>
          <br/>
          <p>Best regards,</p>
          <p><b>Team ApnaFolio</b><br/>Apni Pahchaan, ApnaFolio ke Saath 🚀</p>
        </div>
      `,
    };

    // ✅ Send mail
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ OTP email successfully sent to ${email}`);
    console.log("📩 Brevo Response:", response?.body || response);
    return true;
  } catch (error) {
    console.error("❌ sendOtp error (Brevo API):", error);
    throw new Error("Failed to send OTP email via Brevo");
  }
};

module.exports = sendOtp;