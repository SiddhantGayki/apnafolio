// utils/sendOtp.js
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendOtp = async (email, otp) => {
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = { email: process.env.MAIL_USER, name: "ApnaFolio" };

    await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "ApnaFolio Email OTP Verification",
      htmlContent: `
        <h3>🔑 ApnaFolio - Email Verification</h3>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP is valid for 15 minutes.</p>
      `,
    });

    console.log(`✅ OTP sent to ${email}`);
    return true;
  } catch (err) {
    console.error("❌ Brevo sendOtp error:", err);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtp;
