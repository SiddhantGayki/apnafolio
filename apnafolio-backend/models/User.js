// models/User.js
const mongoose = require("mongoose");

console.log("Defining education schema");
const educationSchema = new mongoose.Schema({ degree: String, school: String, year: String });

console.log("Defining project schema");
const projectSchema = new mongoose.Schema({ title: String, description: String, link: String });

console.log("Defining experience schema");
const experienceSchema = new mongoose.Schema({ title: String, company: String, duration: String });

console.log("Defining resume schema");
const resumeSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  phone: String,
  location: String,
  summary: String,
  skills: [String],
  education: [educationSchema],
  projects: [projectSchema],
  experience: [experienceSchema],
  certifications: [String],
  extras: [String],
});

console.log("Defining analytics schema");
const analyticsSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  lastViewedAt: Date,
});

console.log("Defining payment schema");
const paymentSchema = new mongoose.Schema({
  amount: Number, // paise
  status: { type: String, default: "success" },
  date: { type: Date, default: Date.now },
  txnId: String,
  templateId: String,
});

console.log("Defining user schema");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: String,

    // OTP / Auth
    otp: String,
    otpExpires: Date,
    failedOtpAttempts: { type: Number, default: 0 },
    otpLockedUntil: Date,
    resetToken: String,
    resetTokenExpires: Date,
    isVerified: { type: Boolean, default: false },

    // Resume / payments
    resumeData: { type: resumeSchema, default: {} },
    selectedTemplate: { type: String, default: "" },
    paid: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },

    // Username / identity
    username: { type: String, unique: true, required: true },
    usernameLower: { type: String, unique: true }, // lowercase copy
    isAdmin: { type: Boolean, default: false },

    // Google / social auth
    authProvider: { type: String, default: "local" }, // "local" | "google"
    googleId: { type: String },
    avatar: { type: String },

    analytics: { type: analyticsSchema, default: {} },
    payments: [paymentSchema],
  },
  { timestamps: true }
);

// keep lowercase username in sync
userSchema.pre("validate", function (next) {
  if (this.username) {
    this.usernameLower = this.username.toLowerCase();
  }
  next();
});

module.exports = mongoose.model("User", userSchema);