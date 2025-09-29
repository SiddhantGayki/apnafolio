// models/User.js
const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({ degree: String, school: String, year: String });
const projectSchema = new mongoose.Schema({ title: String, description: String, link: String });
const experienceSchema = new mongoose.Schema({ title: String, company: String, duration: String });

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

const analyticsSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  lastViewedAt: Date,
});

const paymentSchema = new mongoose.Schema({
  amount: Number, // paise
  status: { type: String, default: "success" },
  date: { type: Date, default: Date.now },
  txnId: String,
  templateId: String,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: String,
    otp: String,
    otpExpires: Date,
    failedOtpAttempts: { type: Number, default: 0 },
    otpLockedUntil: Date,
    resetToken: String,
    resetTokenExpires: Date,
    isVerified: { type: Boolean, default: false },

    resumeData: { type: resumeSchema, default: {} },
    selectedTemplate: { type: String, default: "" },
    paid: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },

    username: { type: String, unique: true, required: true },
    usernameLower: { type: String, unique: true, required: true }, // lowercase copy

    isAdmin: { type: Boolean, default: false },

    analytics: { type: analyticsSchema, default: {} },
    payments: [paymentSchema],
  },
  { timestamps: true }
);

// keep lowercase username in sync
userSchema.pre("save", function (next) {
  if (this.username) this.usernameLower = this.username.toLowerCase();
  next();
});

module.exports = mongoose.model("User", userSchema);
