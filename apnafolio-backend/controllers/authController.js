// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// 🟣 SIGNUP (with OTP via Brevo)
exports.signup = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username)
      return res.status(400).json({ message: "Missing required fields" });

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim().toLowerCase();

    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail)
      return res.status(400).json({ message: "Email already in use" });

    const existingUsername = await User.findOne({
      usernameLower: normalizedUsername,
    });
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      otp: otpHash,
      otpExpires,
      username,
      usernameLower: normalizedUsername,
      failedOtpAttempts: 0,
      otpLockedUntil: null,
      isVerified: false,
      authProvider: "local",
    });

    // ✅ Send OTP via Brevo
    try {
      console.log(`📨 Sending OTP to ${normalizedEmail}...`);
      await sendOtp(normalizedEmail, otp);
      console.log(`✅ OTP sent successfully to ${normalizedEmail}`);
    } catch (err) {
      console.error("❌ sendOtp error (Brevo):", err.message);
      await User.deleteOne({ _id: newUser._id });
      return res
        .status(500)
        .json({ message: "Signup failed: Unable to send OTP." });
    }

    res.status(201).json({
      message: "Signup successful! OTP sent to your email for verification.",
    });
  } catch (err) {
    console.error("❌ signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// 🟣 VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Missing email or OTP" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otpExpires || user.otpExpires < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid OTP entered" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("❌ verifyOtp error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
};

// 🟣 LOGIN (Email + Password)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("❌ login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// 🟣 GOOGLE ONE TAP LOGIN/SIGNUP
exports.googleOneTap = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential)
      return res.status(400).json({ message: "Missing Google credential" });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email_verified)
      return res
        .status(400)
        .json({ message: "Google account email not verified" });

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const baseUsername = normalizedEmail.split("@")[0];
      const username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
      const hashedPassword = await bcrypt.hash("GOOGLE_" + googleId, 10);

      user = await User.create({
        name: name || baseUsername,
        email: normalizedEmail,
        password: hashedPassword,
        username,
        usernameLower: username.toLowerCase(),
        isVerified: true,
        authProvider: "google",
        googleId,
        avatar: picture,
        paid: false,
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Google login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("❌ Google One Tap error:", err);
    res.status(500).json({
      message: "Google login failed",
      error: err.message,
    });
  }
};
