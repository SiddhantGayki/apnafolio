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
    // ✅ Initialize Brevo API instance directly from constructor
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


// // utils/sendOtp.js   final
// const Brevo = require("@getbrevo/brevo");
// require("dotenv").config();

// /**
//  * Sends a One-Time Password (OTP) email using Brevo API
//  * @param {string} email - Recipient email address
//  * @param {string} otp - The OTP code to send
//  * @returns {Promise<boolean>} - Returns true if sent successfully
//  */
// const sendOtp = async (email, otp) => {
//   try {
//     // ✅ Initialize Brevo API Client
//     const apiInstance = new Brevo.TransactionalEmailsApi();
//     const brevoConfig = Brevo.ApiClient.instance.authentications["api-key"];

//     // ✅ Use Brevo API Key (Render/.env)
//     brevoConfig.apiKey = process.env.BREVO_API_KEY;

//     if (!brevoConfig.apiKey) {
//       console.error("❌ BREVO_API_KEY not found! Check Render env variables.");
//       throw new Error("Missing Brevo API Key");
//     }

//     // ✅ Prepare email data
//     const sendSmtpEmail = {
//       sender: {
//         name: "ApnaFolio",
//         email: process.env.MAIL_FROM || "support@apnafolio.in",
//       },
//       to: [{ email }],
//       subject: "ApnaFolio OTP Verification Code 🔐",
//       htmlContent: `
//         <div style="font-family: Arial, sans-serif; background: #f9f9f9; border-radius: 10px; padding: 20px;">
//           <h2 style="color: #5e17eb;">ApnaFolio Email Verification</h2>
//           <p>Hi there 👋,</p>
//           <p>Your One-Time Password (OTP) for verifying your email is:</p>
//           <h1 style="color: #FF007F; letter-spacing: 6px;">${otp}</h1>
//           <p>This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.</p>
//           <br/>
//           <p>Best regards,</p>
//           <p><b>Team ApnaFolio</b><br/>Apni Pahchaan, ApnaFolio ke Saath 🚀</p>
//         </div>
//       `,
//     };

//     // ✅ Send the email
//     const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

//     console.log(`✅ OTP email sent to ${email}`);
//     console.log("Brevo Response:", response.body);
//     return true;
//   } catch (error) {
//     console.error("❌ sendOtp error (Brevo API):", error.message);
//     throw new Error("Failed to send OTP email");
//   }
// };

// module.exports = sendOtp;

// // // utils/sendOtp.js
// // const Brevo = require("@getbrevo/brevo");

// // /**
// //  * Sends a One-Time Password (OTP) email using Brevo API
// //  * @param {string} email - Recipient email address
// //  * @param {string} otp - The OTP code to send
// //  * @returns {Promise<boolean>} - Returns true if sent successfully
// //  */
// // const sendOtp = async (email, otp) => {
// //   try {
// //     // ✅ Initialize Brevo client
// //     const client = new Brevo.TransactionalEmailsApi();
// //     client.setApiKey(
// //       Brevo.TransactionalEmailsApiApiKeys.apiKey,
// //       process.env.MAIL_PASS // Your Brevo API Key
// //     );

// //     // ✅ Email content
// //     const sendSmtpEmail = {
// //       sender: {
// //         name: "ApnaFolio",
// //         email: process.env.MAIL_USER, // Example: no-reply@apnafolio.in
// //       },
// //       to: [{ email }],
// //       subject: "ApnaFolio OTP Verification",
// //       htmlContent: `
// //         <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 10px;">
// //           <h2 style="color: #4B0082;">ApnaFolio - Email Verification</h2>
// //           <p>Hi there 👋,</p>
// //           <p>Your One-Time Password (OTP) for email verification is:</p>
// //           <h1 style="color: #FF007F; letter-spacing: 5px;">${otp}</h1>
// //           <p>This OTP is valid for <b>15 minutes</b>. Please don’t share it with anyone.</p>
// //           <br />
// //           <p>With 💜,</p>
// //           <p><strong>Team ApnaFolio</strong><br>Apni Pahchaan, ApnaFolio ke saath 🚀</p>
// //         </div>
// //       `,
// //     };

// //     // ✅ Send email using Brevo API
// //     const response = await client.sendTransacEmail(sendSmtpEmail);
// //     console.log(`✅ OTP email sent to ${email} | Message ID: ${response.messageId || "N/A"}`);
// //     return true;
// //   } catch (error) {
// //     console.error("❌ sendOtp error (Brevo API):", error.message);
// //     throw new Error("Failed to send OTP email");
// //   }
// // };

// // module.exports = sendOtp;

// // // // 27/11/25
// // // // utils/sendOtp.js
// // // const nodemailer = require("nodemailer");

// // // const sendOtp = async (email, otp) => {
// // //   try {
// // //     const transporter = nodemailer.createTransport({
// // //       host: process.env.MAIL_HOST || "smtp-relay.brevo.com",
// // //       port: process.env.MAIL_PORT || 587,
// // //       secure: false,
// // //       auth: {
// // //         // Brevo वरचा verified email / SMTP key
// // //         user: process.env.MAIL_USER || process.env.BREVO_EMAIL,
// // //         pass: process.env.MAIL_PASS || process.env.BREVO_SMTP_KEY,
// // //       },
// // //     });

// // //     const fromAddress =
// // //       process.env.MAIL_FROM ||
// // //       `"ApnaFolio" <${process.env.MAIL_USER || "no-reply@apnafolio.in"}>`;

// // //     const mailOptions = {
// // //       from: fromAddress,
// // //       to: email,
// // //       subject: "ApnaFolio Email OTP Verification",
// // //       html: `
// // //         <div style="font-family: Arial, sans-serif; line-height:1.5;">
// // //           <h2>ApnaFolio - Email Verification</h2>
// // //           <p>Your OTP is:</p>
// // //           <h1 style="letter-spacing:4px;">${otp}</h1>
// // //           <p>This OTP is valid for <strong>15 minutes</strong>.</p>
// // //           <p>If this wasn't you, you can ignore this email.</p>
// // //         </div>
// // //       `,
// // //     };

// // //     await transporter.sendMail(mailOptions);
// // //     console.log("✅ OTP email sent to", email);
// // //     return true;
// // //   } catch (err) {
// // //     console.error("sendOtp error:", err);
// // //     throw new Error("Failed to send OTP email");
// // //   }
// // // };

// // // module.exports = sendOtp;

// // // // // 16/11/25
// // // // const nodemailer = require("nodemailer");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     const transporter = nodemailer.createTransport({
// // // //       host: process.env.MAIL_HOST,
// // // //       port: process.env.MAIL_PORT,
// // // //       secure: false,
// // // //       auth: {
// // // //         user: process.env.MAIL_USER,
// // // //         pass: process.env.MAIL_PASS, 
// // // //       },
// // // //     });

// // // //     const mailOptions = {
// // // //       from: process.env.MAIL_FROM,
// // // //       to: email,
// // // //       subject: "ApnaFolio Email OTP Verification",
// // // //       html: `
// // // //         <div style="font-family: Arial, sans-serif;">
// // // //           <h3>ApnaFolio - Email Verification</h3>
// // // //           <p>Your OTP is: <strong>${otp}</strong></p>
// // // //           <p>This OTP is valid for 15 minutes.</p>
// // // //         </div>
// // // //       `,
// // // //     };

// // // //     await transporter.sendMail(mailOptions);
// // // //     return true;

// // // //   } catch (err) {
// // // //     console.error("sendOtp error:", err);
// // // //     throw new Error("Failed to send OTP email");
// // // //   }
// // // // };

// // // // module.exports = sendOtp;


// // // // // utils/sendOtp.js old
// // // // const nodemailer = require("nodemailer");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     const transporter = nodemailer.createTransport({
// // // //       service: "gmail",
// // // //       auth: {
// // // //         user: process.env.MAIL_USER,
// // // //         pass: process.env.MAIL_PASS, // app password recommended
// // // //       },
// // // //     });

// // // //     const mail = {
// // // //       from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
// // // //       to: email,
// // // //       subject: "ApnaFolio Email OTP Verification",
// // // //       html: `
// // // //         <div style="font-family: Arial, sans-serif;">
// // // //           <h3>ApnaFolio - Email Verification</h3>
// // // //           <p>Your OTP is: <strong>${otp}</strong></p>
// // // //           <p>This OTP is valid for 15 minutes.</p>
// // // //         </div>
// // // //       `,
// // // //     };

// // // //     await transporter.sendMail(mail);
// // // //     return true;
// // // //   } catch (err) {
// // // //     console.error("sendOtp error:", err);
// // // //     throw new Error("Failed to send OTP email");
// // // //   }
// // // // };

// // // // module.exports = sendOtp;


// // // // // utils/sendOtp.js
// // // // const nodemailer = require("nodemailer");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     const transporter = nodemailer.createTransport({
// // // //       service: "gmail",
// // // //       auth: {
// // // //         user: process.env.MAIL_USER,
// // // //         pass: process.env.MAIL_PASS, // Gmail App Password
// // // //       },
// // // //     });

// // // //     const mailOptions = {
// // // //       from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
// // // //       to: email,
// // // //       subject: "ApnaFolio - Email OTP Verification",
// // // //       html: `
// // // //         <h3>🔑 ApnaFolio - Email Verification</h3>
// // // //         <p>Your OTP is: <b>${otp}</b></p>
// // // //         <p>This OTP is valid for 15 minutes.</p>
// // // //         <p>Apni Pahchaan, ApnaFolio ke saath 🚀</p>
// // // //       `,
// // // //     };

// // // //     const info = await transporter.sendMail(mailOptions);
// // // //     console.log(`✅ OTP sent to ${email} (MessageID: ${info.messageId})`);
// // // //     return true;
// // // //   } catch (err) {
// // // //     console.error("❌ Nodemailer sendOtp error:", err.message);
// // // //     throw new Error("Failed to send OTP email");
// // // //   }
// // // // };

// // // // module.exports = sendOtp;

// // // // 2
// // // // // utils/sendOtp.js with BREVO
// // // // const SibApiV3Sdk = require("sib-api-v3-sdk");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     // If BREVO_API_KEY missing, print OTP to server logs (dev fallback)
// // // //     if (!process.env.BREVO_API_KEY) {
// // // //       console.warn("⚠️ BREVO_API_KEY not set — DEV FALLBACK. OTP printed to server logs.");
// // // //       console.log(`DEV OTP for ${email}: ${otp}`);
// // // //       return { ok: true, provider: "dev", message: "OTP printed to server logs (dev mode)" };
// // // //     }

// // // //     let defaultClient = SibApiV3Sdk.ApiClient.instance;
// // // //     let apiKey = defaultClient.authentications["api-key"];
// // // //     apiKey.apiKey = process.env.BREVO_API_KEY;

// // // //     let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// // // //     const senderEmail = process.env.MAIL_USER;
// // // //     if (!senderEmail) {
// // // //       throw new Error("MAIL_USER env not set");
// // // //     }

// // // //     const sender = { email: senderEmail, name: "ApnaFolio" };

// // // //     const resp = await tranEmailApi.sendTransacEmail({
// // // //       sender,
// // // //       to: [{ email }],
// // // //       subject: "ApnaFolio Email OTP Verification",
// // // //       htmlContent: `
// // // //         <h3>🔑 ApnaFolio - Email Verification</h3>
// // // //         <p>Your OTP is: <b>${otp}</b></p>
// // // //         <p>This OTP is valid for 15 minutes.</p>
// // // //       `,
// // // //     });

// // // //     console.log("✅ Brevo sendTransacEmail response:", JSON.stringify(resp, null, 2));
// // // //     return { ok: true, provider: "brevo", resp };
// // // //   } catch (err) {
// // // //     console.error("❌ Brevo sendOtp error:", err?.message || err);
// // // //     throw new Error(`Failed to send OTP email: ${err?.message || err}`);
// // // //   }
// // // // };

// // // // module.exports = sendOtp;

// // // // 1
// // // // // utils/sendOtp.js  — REPLACE with this
// // // // const SibApiV3Sdk = require("sib-api-v3-sdk");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     // Dev-mode fallback: print OTP to console if no API key set
// // // //     if (!process.env.BREVO_API_KEY) {
// // // //       console.warn("⚠️ BREVO_API_KEY not set — running in dev fallback. OTP printed to server logs.");
// // // //       console.log(`DEV OTP for ${email}: ${otp}`);
// // // //       return { ok: true, provider: "dev", message: "OTP printed to server logs (dev mode)" };
// // // //     }

// // // //     let defaultClient = SibApiV3Sdk.ApiClient.instance;
// // // //     let apiKey = defaultClient.authentications["api-key"];
// // // //     apiKey.apiKey = process.env.BREVO_API_KEY;

// // // //     let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// // // //     const senderEmail = process.env.MAIL_USER;
// // // //     if (!senderEmail) {
// // // //       throw new Error("MAIL_USER env not set");
// // // //     }

// // // //     const sender = { email: senderEmail, name: "ApnaFolio" };

// // // //     const resp = await tranEmailApi.sendTransacEmail({
// // // //       sender,
// // // //       to: [{ email }],
// // // //       subject: "ApnaFolio Email OTP Verification",
// // // //       htmlContent: `
// // // //         <h3>🔑 ApnaFolio - Email Verification</h3>
// // // //         <p>Your OTP is: <b>${otp}</b></p>
// // // //         <p>This OTP is valid for 15 minutes.</p>
// // // //       `,
// // // //     });

// // // //     // Log provider response for debugging
// // // //     console.log("✅ Brevo sendTransacEmail response:", JSON.stringify(resp, null, 2));

// // // //     // Basic success check: Brevo returns an object; if it has failedRecipients or messageId verify it
// // // //     return { ok: true, provider: "brevo", resp };
// // // //   } catch (err) {
// // // //     console.error("❌ Brevo sendOtp error:", err?.message || err);
// // // //     // throw detailed error for dev; for prod you may return false and allow retry
// // // //     throw new Error(`Failed to send OTP email: ${err?.message || err}`);
// // // //   }
// // // // };

// // // // module.exports = sendOtp;

// // // // // utils/sendOtp.js
// // // // const SibApiV3Sdk = require("sib-api-v3-sdk");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     let defaultClient = SibApiV3Sdk.ApiClient.instance;
// // // //     let apiKey = defaultClient.authentications["api-key"];
// // // //     apiKey.apiKey = process.env.BREVO_API_KEY;

// // // //     let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
// // // //     const sender = { email: process.env.MAIL_USER, name: "ApnaFolio" };

// // // //     await tranEmailApi.sendTransacEmail({
// // // //       sender,
// // // //       to: [{ email }],
// // // //       subject: "ApnaFolio Email OTP Verification",
// // // //       htmlContent: `
// // // //         <h3>🔑 ApnaFolio - Email Verification</h3>
// // // //         <p>Your OTP is: <b>${otp}</b></p>
// // // //         <p>This OTP is valid for 15 minutes.</p>
// // // //       `,
// // // //     });

// // // //     console.log(`✅ OTP sent to ${email}`);
// // // //     return true;
// // // //   } catch (err) {
// // // //     console.error("❌ Brevo sendOtp error:", err);
// // // //     throw new Error("Failed to send OTP email");
// // // //   }
// // // // };

// // // // module.exports = sendOtp;
