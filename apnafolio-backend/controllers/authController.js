// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp"); // ensure exists and uses env MAIL_USER/MAIL_PASS

const sanitizeUser = (userDoc) => {
  if (!userDoc) return null;
  return {
    _id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    username: userDoc.username,
    isAdmin: userDoc.isAdmin,
    paid: userDoc.paid,
    selectedTemplate: userDoc.selectedTemplate,
    isVerified: userDoc.isVerified,
  };
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim();

    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) return res.status(400).json({ message: "Email already in use" });

    const existingUsername = await User.findOne({ usernameLower: normalizedUsername.toLowerCase() });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      otp: otpHash,
      otpExpires,
      username: normalizedUsername,
      usernameLower: username.toLowerCase(),
      failedOtpAttempts: 0,
      otpLockedUntil: null,
    });

    await newUser.save();
    await sendOtp(normalizedEmail, otp);

    res.status(201).json({ message: "Signup successful. OTP sent!" });
  } catch (err) {
    console.error("signup err:", err);
    res.status(500).json({ message: "Error in signup", error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Missing email or OTP" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "User not found" });

    // rate-limit lock check
    if (user.otpLockedUntil && user.otpLockedUntil > new Date()) {
      return res.status(429).json({ message: "Too many attempts. Try later." });
    }

    if (!user.otpExpires || user.otpExpires < new Date()) return res.status(400).json({ message: "OTP expired" });

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      user.failedOtpAttempts = (user.failedOtpAttempts || 0) + 1;
      if (user.failedOtpAttempts >= 5) {
        user.otpLockedUntil = new Date(Date.now() + 15 * 60 * 1000); // lock 15 minutes
        user.failedOtpAttempts = 0;
      }
      await user.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpires = null;
    user.failedOtpAttempts = 0;
    user.otpLockedUntil = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("verifyOtp err:", err);
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, user: sanitizeUser(user) });
  } catch (err) {
    console.error("login err:", err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// // controllers/authController.js
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const sendOtp = require("../utils/sendOtp"); // ensure exists and uses env MAIL_USER/MAIL_PASS

// const sanitizeUser = (userDoc) => {
//   if (!userDoc) return null;
//   return {
//     _id: userDoc._id,
//     name: userDoc.name,
//     email: userDoc.email,
//     username: userDoc.username,
//     isAdmin: userDoc.isAdmin,
//     paid: userDoc.paid,
//     selectedTemplate: userDoc.selectedTemplate,
//     isVerified: userDoc.isVerified,
//   };
// };

// // exports.signup = async (req, res) => {
// //       const { name, email, password, username } = req.body;
// //   if (!name || !email || !password || !username) {
// //     return res.status(400).json({ message: "All fields required" });
// //   }
// //     const normalizedEmail = email.toLowerCase().trim();
// //     const normalizedUsername = username.trim();

// //     const existingEmail = await User.findOne({ email: normalizedEmail });
// //     if (existingEmail) return res.status(400).json({ message: "Email already in use" });

// //     const existingUsername = await User.findOne({ usernameLower: normalizedUsername.toLowerCase() });
// //     if (existingUsername) return res.status(400).json({ message: "Username already taken" });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const otpHash = await bcrypt.hash(otp, 10);
// //     const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

// //     const newUser = new User({
// //       name,
// //       email: normalizedEmail,
// //       password: hashedPassword,
// //       otp: otpHash,
// //       otpExpires,
// //       username: normalizedUsername,
// //       usernameLower: username.toLowerCase(),
// //       failedOtpAttempts: 0,
// //       otpLockedUntil: null,
// //     });

// //     await newUser.save();
// //     await sendOtp(normalizedEmail, otp);

// //     res.status(201).json({ message: "Signup successful. OTP sent!" });
// //   } catch (err) {
// //     console.error("signup err:", err);
// //     res.status(500).json({ message: "Error in signup", error: err.message });
// //   }
// // };

// exports.signup = async (req, res) => {
//   try {
//     console.log("📩 Signup body:", req.body);
//     const { name, email, password, username } = req.body;
//     if (!name || !email || !password || !username) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const normalizedEmail = email.toLowerCase().trim();
//     const normalizedUsername = username.trim();

//     const existingEmail = await User.findOne({ email: normalizedEmail });
//     if (existingEmail) return res.status(400).json({ message: "Email already in use" });

//     const existingUsername = await User.findOne({ usernameLower: normalizedUsername.toLowerCase() });
//     if (existingUsername) return res.status(400).json({ message: "Username already taken" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpHash = await bcrypt.hash(otp, 10);
//     const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

//     const newUser = new User({
//       name,
//       email: normalizedEmail,
//       password: hashedPassword,
//       otp: otpHash,
//       otpExpires,
//       username: normalizedUsername,
//       usernameLower: normalizedUsername.toLowerCase(),
//       failedOtpAttempts: 0,
//       otpLockedUntil: null,
//     });

//     await newUser.save();
//     await sendOtp(normalizedEmail, otp);

//     res.status(201).json({ message: "Signup successful. OTP sent!" });
//   } catch (err) {
//     console.error("signup err:", err);
//     res.status(500).json({ message: "Error in signup", error: err.message });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) return res.status(400).json({ message: "Missing email or OTP" });

//     const user = await User.findOne({ email: email.toLowerCase().trim() });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     // rate-limit lock check
//     if (user.otpLockedUntil && user.otpLockedUntil > new Date()) {
//       return res.status(429).json({ message: "Too many attempts. Try later." });
//     }

//     if (!user.otpExpires || user.otpExpires < new Date()) return res.status(400).json({ message: "OTP expired" });

//     const isMatch = await bcrypt.compare(otp, user.otp);
//     if (!isMatch) {
//       user.failedOtpAttempts = (user.failedOtpAttempts || 0) + 1;
//       if (user.failedOtpAttempts >= 5) {
//         user.otpLockedUntil = new Date(Date.now() + 15 * 60 * 1000); // lock 15 minutes
//         user.failedOtpAttempts = 0;
//       }
//       await user.save();
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     user.isVerified = true;
//     user.otp = "";
//     user.otpExpires = null;
//     user.failedOtpAttempts = 0;
//     user.otpLockedUntil = null;
//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (err) {
//     console.error("verifyOtp err:", err);
//     res.status(500).json({ message: "Verification failed", error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

//     const user = await User.findOne({ email: email.toLowerCase().trim() });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.isVerified) return res.status(403).json({ message: "Please verify your email" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.status(200).json({ message: "Login successful", token, user: sanitizeUser(user) });
//   } catch (err) {
//     console.error("login err:", err);
//     res.status(500).json({ message: "Login error", error: err.message });
//   }
// };
