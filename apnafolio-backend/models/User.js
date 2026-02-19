// // // models/User.js
// // const mongoose = require("mongoose");

// // const resumeSchema = new mongoose.Schema({
// //   name: String,
// //   role: String,
// //   summary: String,

// //   contact: {
// //     email: String,
// //     phone: String,
// //     location: String,
// //     github: String,
// //     linkedin: String,
// //     website: String,
// //     photo: String, // ✅ Cloudinary URL
// //   },

// //   frontendSkills: [String],
// //   backendSkills: [String],
// //   tools: [String],
// //   programmingLanguages: [String],

// //   projects: [
// //     {
// //       title: String,
// //       description: String,
// //       link: String,
// //       tags: [String],
// //       document: String, // ✅ Cloudinary URL
// //     },
// //   ],

// //   education: [
// //     { degree: String, school: String, year: String },
// //   ],

// //   experience: [
// //     {
// //       title: String,
// //       company: String,
// //       duration: String,
// //       document: String, // ✅ Cloudinary URL
// //     },
// //   ],

// //   certifications: [
// //     {
// //       name: String,
// //       document: String, // ✅ Cloudinary URL
// //     },
// //   ],

// //   resumeFile: String, // ✅ Cloudinary URL
// // });

// // const analyticsSchema = new mongoose.Schema({
// //   views: { type: Number, default: 0 },
// //   lastViewedAt: Date,
// // });

// // const paymentSchema = new mongoose.Schema({
// //   amount: Number,
// //   status: { type: String, default: "success" },
// //   date: { type: Date, default: Date.now },
// //   txnId: String,
// //   templateId: String,
// // });

// // const userSchema = new mongoose.Schema(
// //   {
// //     name: String,
// //     email: { type: String, unique: true, required: true },
// //     password: String,

// //     isVerified: { type: Boolean, default: false },
// //     isAdmin: { type: Boolean, default: false },

// //     resumeData: { type: resumeSchema, default: {} },
// //     selectedTemplate: { type: String, default: "" },
// //     paid: { type: Boolean, default: false },

// //     username: { type: String, unique: true, required: true },
// //     usernameLower: { type: String, unique: true },

// //     analytics: { type: analyticsSchema, default: {} },
// //     payments: [paymentSchema],
// //     planType: { type: String, enum: ["template", "yearly"] },
// //     planExpiry: Date,
// //     editCredits: Number,
// //     freeEditExpiry: Date,
// //     isBlocked: Boolean

// //   },
// //   { timestamps: true }
// // );

// // userSchema.pre("validate", function (next) {
// //   if (this.username) this.usernameLower = this.username.toLowerCase();
// //   next();
// // });

// // module.exports = mongoose.model("User", userSchema);







// // models/User.js
// const mongoose = require("mongoose");

// const resumeSchema = new mongoose.Schema({
//   name: String,
//   role: String,
//   summary: String,

//   contact: {
//     email: String,
//     phone: String,
//     location: String,
//     github: String,
//     linkedin: String,
//     website: String,
//     photo: String,
//   },

//   frontendSkills: [String],
//   backendSkills: [String],
//   tools: [String],
//   programmingLanguages: [String],

//   projects: [
//     {
//       title: String,
//       description: String,
//       link: String,
//       tags: [String],
//       document: String,
//     },
//   ],

//   education: [{ degree: String, school: String, year: String }],

//   experience: [
//     {
//       title: String,
//       company: String,
//       duration: String,
//       document: String,
//     },
//   ],

//   certifications: [
//     {
//       name: String,
//       document: String,
//     },
//   ],

//   resumeFile: String,
// });

// const analyticsSchema = new mongoose.Schema({
//   views: { type: Number, default: 0 },
//   lastViewedAt: { type: Date, default: null },
// });

// const paymentSchema = new mongoose.Schema({
//   amount: Number,
//   status: { type: String, default: "success" },
//   date: { type: Date, default: Date.now },
//   txnId: String,
//   templateId: String,
// });

// const userSchema = new mongoose.Schema(
//   {
//     name: String,

//     email: { type: String, unique: true, required: true },
//     password: String,

//     isVerified: { type: Boolean, default: false },
//     isAdmin: { type: Boolean, default: false },

//     resumeData: { type: resumeSchema, default: {} },

//     selectedTemplate: { type: String, default: null },
//     paid: { type: Boolean, default: false },

//     username: { type: String, unique: true, required: true },
//     usernameLower: { type: String, unique: true },

//     analytics: { type: analyticsSchema, default: () => ({}) },
//     payments: { type: [paymentSchema], default: [] },

//     // 🔥 PLAN SYSTEM
//     planType: {
//       type: String,
//       enum: ["template", "yearly"],
//       default: null,
//     },

//     planExpiry: { type: Date, default: null },

//     editCredits: { type: Number, default: 0 },

//     freeEditExpiry: { type: Date, default: null },

//     isBlocked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// // 🔥 Username Lowercase Index
// userSchema.pre("validate", function (next) {
//   if (this.username) {
//     this.usernameLower = this.username.toLowerCase();
//   }
//   next();
// });

// // 🔥 Auto Expiry Index (Optional Optimization)
// userSchema.index({ planExpiry: 1 });

// module.exports = mongoose.model("User", userSchema);












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
    photo: String,
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
      document: String,
    },
  ],

  education: [{ degree: String, school: String, year: String }],

  experience: [
    {
      title: String,
      company: String,
      duration: String,
      document: String,
    },
  ],

  certifications: [
    {
      name: String,
      document: String,
    },
  ],

  resumeFile: String,
});

// const analyticsSchema = new mongoose.Schema({
//   views: { type: Number, default: 0 },
//   lastViewedAt: { type: Date, default: null },
// });

// const analyticsSchema = new mongoose.Schema({
//   totalViews: { type: Number, default: 0 },

//   dailyViews: [
//     {
//       date: String, // "2026-02-17"
//       count: Number,
//     },
//   ],

//   lastViewedAt: Date,
// });

const analyticsSchema = new mongoose.Schema({
  totalViews: { type: Number, default: 0 },
  lastViewedAt: { type: Date, default: null },
  dailyViews: [
    {
      date: String,
      count: { type: Number, default: 0 }
    }
  ]
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

    // selectedTemplate: { type: String, default: "" },
    selectedTemplate: { type: String, default: "" },
    paid: { type: Boolean, default: false },

    username: { type: String, unique: true, required: true },
    usernameLower: { type: String, unique: true },

    analytics: { type: analyticsSchema, default: () => ({}) },
    payments: { type: [paymentSchema], default: [] },
    graceUntil: { type: Date, default: null },

    // ===============================
    // 🔥 PLAN SYSTEM (UPDATED)
    // ===============================

    planType: {
      type: String,
      enum: ["template", "yearly"],
      default: null,
    },

    planExpiry: { type: Date, default: null },

    // // 🔹 FREE CREDITS (Valid 30 days only)
    // freeEditCredits: { type: Number, default: 0 },
    // freeEditExpiry: { type: Date, default: null },

    // // 🔹 PAID CREDITS (No expiry)
    // paidEditCredits: { type: Number, default: 0 },

    // isBlocked: { type: Boolean, default: false },
//     planExpiry: {
//   type: Date,
//   default: function () {
//     const d = new Date();
//     d.setDate(d.getDate() + 365); // 45 days validity
//     return d;
//   }
// },

freeEditCredits: {
  type: Number,
  default: 4 // ✅ STARTING FREE CREDITS
},

paidEditCredits: {
  type: Number,
  default: 0
},

freeEditExpiry: {
  type: Date,
  default: function () {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d;
  }
},

isBlocked: {
  type: Boolean,
  default: false
},

  },
  { timestamps: true }
);

// Username lowercase auto set
userSchema.pre("validate", function (next) {
  if (this.username) {
    this.usernameLower = this.username.toLowerCase();
  }
  next();
});

userSchema.index({ planExpiry: 1 });

module.exports = mongoose.model("User", userSchema);

