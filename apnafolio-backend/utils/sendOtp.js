// utils/sendOtp.js
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendOtp = async (email, otp) => {
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = { email: process.env.MAIL_USER, name: "ApnaFolio" };

    const receivers = [{ email }];

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
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


// // utils/sendOtp.js
// const nodemailer = require("nodemailer");

// const sendOtp = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: parseInt(process.env.MAIL_PORT, 10) || 587,
//       secure: parseInt(process.env.MAIL_PORT, 10) === 465, // true only if port 465
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//       pool: true,
//       maxConnections: 5,
//       maxMessages: 100,
//     });

//     const mail = {
//       from: process.env.MAIL_FROM || `"ApnaFolio" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: "ApnaFolio Email OTP Verification",
//       html: `
//         <div style="font-family: Arial, sans-serif; color:#333;">
//           <h3>🔑 ApnaFolio - Email Verification</h3>
//           <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
//           <p>This OTP is valid for <b>15 minutes</b>.</p>
//           <br/>
//           <p>If you didn’t request this, please ignore.</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mail);
//     console.log(`✅ OTP sent to ${email}`);
//     return true;
//   } catch (err) {
//     console.error("❌ sendOtp error:", err);
//     throw new Error("Failed to send OTP email");
//   }
// };

// module.exports = sendOtp;

// // // utils/sendOtp.js
// // const nodemailer = require("nodemailer");

// // const sendOtp = async (email, otp) => {
// //   try {
// //     const transporter = nodemailer.createTransport({
// //   host: process.env.MAIL_HOST,
// //   port: process.env.MAIL_PORT,
// //   secure: process.env.MAIL_PORT == 465,
// //   auth: {
// //     user: process.env.MAIL_USER,
// //     pass: process.env.MAIL_PASS,
// //   },
// //   tls: {
// //     rejectUnauthorized: false, // avoid self-signed cert errors
// //   },
// //   pool: true, // ✅ connection pool for speed
// //   maxConnections: 5,
// //   maxMessages: 100,
// // });

// //     // const transporter = nodemailer.createTransport({
// //     //   host: process.env.MAIL_HOST || "smtp.gmail.com",
// //     //   port: process.env.MAIL_PORT || 587,
// //     //   secure: process.env.MAIL_PORT == 465, // true if 465
// //     //   auth: {
// //     //     user: process.env.MAIL_USER,
// //     //     pass: process.env.MAIL_PASS,
// //     //   },
// //     // });

// //     const mail = {
// //       from: process.env.MAIL_FROM || `"ApnaFolio" <${process.env.MAIL_USER}>`,
// //       to: email,
// //       subject: "ApnaFolio Email OTP Verification",
// //       html: `
// //         <div style="font-family: Arial, sans-serif; color:#333;">
// //           <h3>🔑 ApnaFolio - Email Verification</h3>
// //           <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
// //           <p>This OTP is valid for <b>15 minutes</b>.</p>
// //           <br/>
// //           <p>If you didn’t request this, please ignore.</p>
// //         </div>
// //       `,
// //     };

// //     await transporter.sendMail(mail);
// //     console.log(`✅ OTP sent to ${email}`);
// //     return true;
// //   } catch (err) {
// //     console.error("❌ sendOtp error:", err);
// //     throw new Error("Failed to send OTP email");
// //   }
// // };

// // module.exports = sendOtp;
