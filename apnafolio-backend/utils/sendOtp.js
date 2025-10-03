// // utils/sendOtp.js
// const nodemailer = require("nodemailer");

// const sendOtp = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS, // app password recommended
//       },
//     });

//     const mail = {
//       from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: "ApnaFolio Email OTP Verification",
//       html: `
//         <div style="font-family: Arial, sans-serif;">
//           <h3>ApnaFolio - Email Verification</h3>
//           <p>Your OTP is: <strong>${otp}</strong></p>
//           <p>This OTP is valid for 15 minutes.</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mail);
//     return true;
//   } catch (err) {
//     console.error("sendOtp error:", err);
//     throw new Error("Failed to send OTP email");
//   }
// };

// module.exports = sendOtp;

// // POST /api/auth/forgot-password
// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
//     await sendOtp(email, otp);
//     // DB मध्ये OTP save कर (expire time सह)
//     res.json({ message: "OTP sent to your email" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };


// const SibApiV3Sdk = require("sib-api-v3-sdk");
// const nodemailer = require("nodemailer");

// // 🔹 Brevo Sender
// const sendWithBrevo = async (email, otp) => {
//   let defaultClient = SibApiV3Sdk.ApiClient.instance;
//   let apiKey = defaultClient.authentications["api-key"];
//   apiKey.apiKey = process.env.BREVO_API_KEY;

//   let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//   const sender = {
//     email: process.env.MAIL_FROM,
//     name: "ApnaFolio",
//   };

//   const sendSmtpEmail = {
//     sender,
//     to: [{ email }],
//     subject: "ApnaFolio Email OTP Verification",
//     htmlContent: `
//       <div style="font-family: Arial, sans-serif; color:#333;">
//         <h3>🔑 ApnaFolio - Email Verification</h3>
//         <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
//         <p>This OTP is valid for <b>15 minutes</b>.</p>
//       </div>
//     `,
//   };

//   await apiInstance.sendTransacEmail(sendSmtpEmail);
//   console.log(`✅ OTP sent via Brevo to ${email}`);
// };

// // 🔹 Gmail Fallback
// const sendWithGmail = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS, // Gmail App Password
//     },
//   });

//   const mail = {
//     from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
//     to: email,
//     subject: "ApnaFolio Email OTP Verification",
//     html: `
//       <div style="font-family: Arial, sans-serif; color:#333;">
//         <h3>🔑 ApnaFolio - Email Verification</h3>
//         <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
//         <p>This OTP is valid for <b>15 minutes</b>.</p>
//       </div>
//     `,
//   };

//   await transporter.sendMail(mail);
//   console.log(`✅ OTP sent via Gmail to ${email}`);
// };

// // 🔹 Hybrid
// const sendOtp = async (email, otp) => {
//   try {
//     await sendWithBrevo(email, otp);
//     return true;
//   } catch (err) {
//     console.error("❌ Brevo failed:", err.response?.data || err.message);
//     try {
//       await sendWithGmail(email, otp);
//       return true;
//     } catch (gmailErr) {
//       console.error("❌ Gmail also failed:", gmailErr.message);
//       throw new Error("Failed to send OTP email");
//     }
//   }
// };

// module.exports = sendOtp;

// // const SibApiV3Sdk = require("sib-api-v3-sdk");
// // const nodemailer = require("nodemailer");

// // // 🔹 Brevo OTP Sender
// // const sendWithBrevo = async (email, otp) => {
// //   let defaultClient = SibApiV3Sdk.ApiClient.instance;
// //   let apiKey = defaultClient.authentications["api-key"];
// //   apiKey.apiKey = process.env.BREVO_API_KEY;

// //   let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// //   const sender = {
// //     email: process.env.MAIL_FROM,
// //     name: "ApnaFolio",
// //   };
// //   const receivers = [{ email }];

// //   const sendSmtpEmail = {
// //     sender,
// //     to: receivers,
// //     subject: "ApnaFolio Email OTP Verification",
// //     htmlContent: `
// //       <div style="font-family: Arial, sans-serif; color:#333;">
// //         <h3>🔑 ApnaFolio - Email Verification</h3>
// //         <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
// //         <p>This OTP is valid for <b>15 minutes</b>.</p>
// //         <br/>
// //         <p>If you didn’t request this, please ignore.</p>
// //       </div>
// //     `,
// //   };

// //   await apiInstance.sendTransacEmail(sendSmtpEmail);
// //   console.log(`✅ OTP sent via Brevo to ${email}`);
// // };

// // // 🔹 Gmail (Nodemailer) OTP Sender
// // const sendWithGmail = async (email, otp) => {
// //   const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.MAIL_USER, // Gmail ID
// //       pass: process.env.MAIL_PASS, // Gmail App Password
// //     },
// //   });

// //   const mail = {
// //     from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
// //     to: email,
// //     subject: "ApnaFolio Email OTP Verification",
// //     html: `
// //       <div style="font-family: Arial, sans-serif; color:#333;">
// //         <h3>🔑 ApnaFolio - Email Verification</h3>
// //         <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
// //         <p>This OTP is valid for <b>15 minutes</b>.</p>
// //       </div>
// //     `,
// //   };

// //   await transporter.sendMail(mail);
// //   console.log(`✅ OTP sent via Gmail to ${email}`);
// // };

// // // 🔹 Hybrid OTP Sender
// // const sendOtp = async (email, otp) => {
// //   try {
// //     // Try Brevo first
// //     await sendWithBrevo(email, otp);
// //     return true;
// //   } catch (err) {
// //     console.error("❌ Brevo failed:", err.response?.data || err.message);

// //     try {
// //       // Fallback to Gmail
// //       await sendWithGmail(email, otp);
// //       return true;
// //     } catch (gmailErr) {
// //       console.error("❌ Gmail also failed:", gmailErr.message);
// //       throw new Error("Failed to send OTP email via both Brevo and Gmail");
// //     }
// //   }
// // };

// // module.exports = sendOtp;


// // // // // utils/sendOtp.js
// // // // const nodemailer = require("nodemailer");

// // // // const sendOtp = async (email, otp) => {
// // // //   try {
// // // //     const transporter = nodemailer.createTransport({
// // // //       service: "gmail", // Gmail वापरणार
// // // //       auth: {
// // // //         user: process.env.MAIL_USER, // तुझं Gmail address
// // // //         pass: process.env.MAIL_PASS, // Gmail App Password (not normal pwd)
// // // //       },
// // // //     });
// // // // console.log("📧 Sending OTP to:", email);

// // // //     const mail = {
// // // //       from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
// // // //       to: email,
// // // //       subject: "ApnaFolio Email OTP Verification",
// // // //       html: `
// // // //         <div style="font-family: Arial, sans-serif;">
// // // //           <h3>🔑 ApnaFolio - Email Verification</h3>
// // // //           <p>Your OTP is: <strong>${otp}</strong></p>
// // // //           <p>This OTP is valid for <b>15 minutes</b>.</p>
// // // //         </div>
// // // //       `,
// // // //     };

// // // //     await transporter.sendMail(mail);
// // // //     console.log(`✅ OTP sent to ${email}`);
// // // //     return true;
// // // //   } catch (err) {
// // // //     console.error("❌ sendOtp error:", err.message);
// // // //     throw new Error("Failed to send OTP email");
// // // //   }
// // // // };

// // // // module.exports = sendOtp;


// // // // // const axios = require("axios");

// // // // // const sendOtp = async (email, otp) => {
// // // // //   try {
// // // // //     const response = await axios.post(
// // // // //       "https://api.brevo.com/v3/smtp/email",
// // // // //       {
// // // // //         sender: { email: process.env.MAIL_FROM, name: "ApnaFolio" },
// // // // //         to: [{ email }],
// // // // //         subject: "ApnaFolio Email OTP Verification",
// // // // //         htmlContent: `
// // // // //           <div style="font-family: Arial, sans-serif; color:#333;">
// // // // //             <h3>🔑 ApnaFolio - Email Verification</h3>
// // // // //             <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
// // // // //             <p>This OTP is valid for <b>15 minutes</b>.</p>
// // // // //             <br/>
// // // // //             <p>If you didn’t request this, please ignore.</p>
// // // // //           </div>
// // // // //         `,
// // // // //       },
// // // // //       {
// // // // //         headers: {
// // // // //           "api-key": process.env.BREVO_API_KEY,
// // // // //           "Content-Type": "application/json",
// // // // //           accept: "application/json",
// // // // //         },
// // // // //       }
// // // // //     );

// // // // //     console.log(`✅ OTP Email sent to ${email}`, response.data);
// // // // //     return true;
// // // // //   } catch (err) {
// // // // //     console.error("❌ sendOtp error:", err.response?.data || err.message);
// // // // //     throw new Error("Failed to send OTP email");
// // // // //   }
// // // // // };

// // // // // module.exports = sendOtp;


// // // // // // old
// // // const SibApiV3Sdk = require("sib-api-v3-sdk");

// // // const sendOtp = async (email, otp) => {
// // //   try {
// // //     // Brevo API config
// // //     let defaultClient = SibApiV3Sdk.ApiClient.instance;
// // //     let apiKey = defaultClient.authentications['api-key'];
// // //     apiKey.apiKey = process.env.BREVO_API_KEY;

// // //     let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// // //     const sender = { 
// // //       email: process.env.MAIL_FROM, 
// // //       name: "ApnaFolio" 
// // //     };
// // //     const receivers = [{ email }];

// // //     const sendSmtpEmail = {
// // //       sender,
// // //       to: receivers,
// // //       subject: "ApnaFolio Email OTP Verification",
// // //       htmlContent: `
// // //         <div style="font-family: Arial, sans-serif; color:#333;">
// // //           <h3>🔑 ApnaFolio - Email Verification</h3>
// // //           <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
// // //           <p>This OTP is valid for <b>15 minutes</b>.</p>
// // //           <br/>
// // //           <p>If you didn’t request this, please ignore.</p>
// // //         </div>
// // //       `
// // //     };

// // //     await apiInstance.sendTransacEmail(sendSmtpEmail);
// // //     console.log(`✅ OTP sent via Brevo to ${email}`);
// // //     return true;
// // //   } catch (err) {
// // //     console.error("❌ sendOtp error:", err.response?.text || err.message);
// // //     throw new Error("Failed to send OTP email");
// // //   }
// // // };

// // // module.exports = sendOtp;



// // // // // // // utils/sendOtp.js
// // // // // // const axios = require("axios");

// // // // // // const sendOtp = async (email, otp) => {
// // // // // //   try {
// // // // // //     const response = await axios.post(
// // // // // //       "https://api.brevo.com/v3/smtp/email",
// // // // // //       {
// // // // // //         sender: { email: process.env.MAIL_FROM, name: "ApnaFolio" },
// // // // // //         to: [{ email }],
// // // // // //         subject: "ApnaFolio Email OTP Verification",
// // // // // //         htmlContent: `
// // // // // //           <div style="font-family: Arial, sans-serif; color:#333;">
// // // // // //             <h3>🔑 ApnaFolio - Email Verification</h3>
// // // // // //             <p>Your OTP is: <strong style="font-size:18px">${otp}</strong></p>
// // // // // //             <p>This OTP is valid for <b>15 minutes</b>.</p>
// // // // // //             <br/>
// // // // // //             <p>If you didn’t request this, please ignore.</p>
// // // // // //           </div>
// // // // // //         `,
// // // // // //       },
// // // // // //       {
// // // // // //         headers: {
// // // // // //           "api-key": process.env.BREVO_API_KEY,
// // // // // //           "Content-Type": "application/json",
// // // // // //           accept: "application/json",
// // // // // //         },
// // // // // //       }
// // // // // //     );

// // // // // //     console.log(`✅ OTP Email sent to ${email}`, response.data);
// // // // // //     return true;
// // // // // //   } catch (err) {
// // // // // //     console.error("❌ sendOtp error:", err.response?.data || err.message);
// // // // // //     throw new Error("Failed to send OTP email");
// // // // // //   }
// // // // // // };

// // // // // // module.exports = sendOtp;




// // // // // // // // // utils/sendOtp.js
// // // // // // // // const nodemailer = require("nodemailer");

// // // // // // // // const sendOtp = async (email, otp) => {
// // // // // // // //   try {
// // // // // // // //     const transporter = nodemailer.createTransport({
// // // // // // // //       service: "gmail",
// // // // // // // //       auth: {
// // // // // // // //         user: process.env.MAIL_USER,
// // // // // // // //         pass: process.env.MAIL_PASS, // app password recommended
// // // // // // // //       },
// // // // // // // //     });

// // // // // // // //     const mail = {
// // // // // // // //       from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
// // // // // // // //       to: email,
// // // // // // // //       subject: "ApnaFolio Email OTP Verification",
// // // // // // // //       html: `
// // // // // // // //         <div style="font-family: Arial, sans-serif;">
// // // // // // // //           <h3>ApnaFolio - Email Verification</h3>
// // // // // // // //           <p>Your OTP is: <strong>${otp}</strong></p>
// // // // // // // //           <p>This OTP is valid for 15 minutes.</p>
// // // // // // // //         </div>
// // // // // // // //       `,
// // // // // // // //     };

// // // // // // // //     await transporter.sendMail(mail);
// // // // // // // //     return true;
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("sendOtp error:", err);
// // // // // // // //     throw new Error("Failed to send OTP email");
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // module.exports = sendOtp;

// // // // // // // // // POST /api/auth/forgot-password
// // // // // // // // exports.forgotPassword = async (req, res) => {
// // // // // // // //   const { email } = req.body;
// // // // // // // //   try {
// // // // // // // //     const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
// // // // // // // //     await sendOtp(email, otp);
// // // // // // // //     // DB मध्ये OTP save कर (expire time सह)
// // // // // // // //     res.json({ message: "OTP sent to your email" });
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: "Failed to send OTP" });
// // // // // // // //   }
// // // // // // // // };


// utils/sendOtp.js
const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: process.env.MAIL_PORT || 465,
      secure: true, // 465 → secure true
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Gmail App Password
      },
    });

    const mail = {
      from: `"ApnaFolio" <${process.env.MAIL_USER}>`,
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
