// utils/sendOtp.js
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendOtp = async (email, otp) => {
  try {
    // If BREVO_API_KEY missing, print OTP to server logs (dev fallback)
    if (!process.env.BREVO_API_KEY) {
      console.warn("⚠️ BREVO_API_KEY not set — DEV FALLBACK. OTP printed to server logs.");
      console.log(`DEV OTP for ${email}: ${otp}`);
      return { ok: true, provider: "dev", message: "OTP printed to server logs (dev mode)" };
    }

    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const senderEmail = process.env.MAIL_USER;
    if (!senderEmail) {
      throw new Error("MAIL_USER env not set");
    }

    const sender = { email: senderEmail, name: "ApnaFolio" };

    const resp = await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "ApnaFolio Email OTP Verification",
      htmlContent: `
        <h3>🔑 ApnaFolio - Email Verification</h3>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP is valid for 15 minutes.</p>
      `,
    });

    console.log("✅ Brevo sendTransacEmail response:", JSON.stringify(resp, null, 2));
    return { ok: true, provider: "brevo", resp };
  } catch (err) {
    console.error("❌ Brevo sendOtp error:", err?.message || err);
    throw new Error(`Failed to send OTP email: ${err?.message || err}`);
  }
};

module.exports = sendOtp;

// 1
// // utils/sendOtp.js  — REPLACE with this
// const SibApiV3Sdk = require("sib-api-v3-sdk");

// const sendOtp = async (email, otp) => {
//   try {
//     // Dev-mode fallback: print OTP to console if no API key set
//     if (!process.env.BREVO_API_KEY) {
//       console.warn("⚠️ BREVO_API_KEY not set — running in dev fallback. OTP printed to server logs.");
//       console.log(`DEV OTP for ${email}: ${otp}`);
//       return { ok: true, provider: "dev", message: "OTP printed to server logs (dev mode)" };
//     }

//     let defaultClient = SibApiV3Sdk.ApiClient.instance;
//     let apiKey = defaultClient.authentications["api-key"];
//     apiKey.apiKey = process.env.BREVO_API_KEY;

//     let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

//     const senderEmail = process.env.MAIL_USER;
//     if (!senderEmail) {
//       throw new Error("MAIL_USER env not set");
//     }

//     const sender = { email: senderEmail, name: "ApnaFolio" };

//     const resp = await tranEmailApi.sendTransacEmail({
//       sender,
//       to: [{ email }],
//       subject: "ApnaFolio Email OTP Verification",
//       htmlContent: `
//         <h3>🔑 ApnaFolio - Email Verification</h3>
//         <p>Your OTP is: <b>${otp}</b></p>
//         <p>This OTP is valid for 15 minutes.</p>
//       `,
//     });

//     // Log provider response for debugging
//     console.log("✅ Brevo sendTransacEmail response:", JSON.stringify(resp, null, 2));

//     // Basic success check: Brevo returns an object; if it has failedRecipients or messageId verify it
//     return { ok: true, provider: "brevo", resp };
//   } catch (err) {
//     console.error("❌ Brevo sendOtp error:", err?.message || err);
//     // throw detailed error for dev; for prod you may return false and allow retry
//     throw new Error(`Failed to send OTP email: ${err?.message || err}`);
//   }
// };

// module.exports = sendOtp;

// // utils/sendOtp.js
// const SibApiV3Sdk = require("sib-api-v3-sdk");

// const sendOtp = async (email, otp) => {
//   try {
//     let defaultClient = SibApiV3Sdk.ApiClient.instance;
//     let apiKey = defaultClient.authentications["api-key"];
//     apiKey.apiKey = process.env.BREVO_API_KEY;

//     let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
//     const sender = { email: process.env.MAIL_USER, name: "ApnaFolio" };

//     await tranEmailApi.sendTransacEmail({
//       sender,
//       to: [{ email }],
//       subject: "ApnaFolio Email OTP Verification",
//       htmlContent: `
//         <h3>🔑 ApnaFolio - Email Verification</h3>
//         <p>Your OTP is: <b>${otp}</b></p>
//         <p>This OTP is valid for 15 minutes.</p>
//       `,
//     });

//     console.log(`✅ OTP sent to ${email}`);
//     return true;
//   } catch (err) {
//     console.error("❌ Brevo sendOtp error:", err);
//     throw new Error("Failed to send OTP email");
//   }
// };

// module.exports = sendOtp;
