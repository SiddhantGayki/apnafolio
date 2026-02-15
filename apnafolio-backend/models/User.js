
// models/User.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  role: String,
  summary: String,

  contact: {
    email: String,
    phone: String,
    location: String,
    github: String,
    linkedin: String,
    website: String,
    photo: String, // ✅ Cloudinary URL
  },

  frontendSkills: [String],
  backendSkills: [String],
  tools: [String],
  programmingLanguages: [String],

  projects: [
    {
      title: String,
      description: String,
      link: String,
      tags: [String],
      document: String, // ✅ Cloudinary URL
    },
  ],

  education: [
    { degree: String, school: String, year: String },
  ],

  experience: [
    {
      title: String,
      company: String,
      duration: String,
      document: String, // ✅ Cloudinary URL
    },
  ],

  certifications: [
    {
      name: String,
      document: String, // ✅ Cloudinary URL
    },
  ],

  resumeFile: String, // ✅ Cloudinary URL
});

const analyticsSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  lastViewedAt: Date,
});

const paymentSchema = new mongoose.Schema({
  amount: Number,
  status: { type: String, default: "success" },
  date: { type: Date, default: Date.now },
  txnId: String,
  templateId: String,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,

    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },

    resumeData: { type: resumeSchema, default: {} },
    selectedTemplate: { type: String, default: "" },
    paid: { type: Boolean, default: false },

    username: { type: String, unique: true, required: true },
    usernameLower: { type: String, unique: true },

    analytics: { type: analyticsSchema, default: {} },
    payments: [paymentSchema],
  },
  { timestamps: true }
);

userSchema.pre("validate", function (next) {
  if (this.username) this.usernameLower = this.username.toLowerCase();
  next();
});

module.exports = mongoose.model("User", userSchema);
