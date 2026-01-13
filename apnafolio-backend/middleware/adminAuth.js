// // middleware/adminAuth.js
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");const auth = require("../middleware/auth");
// const adminAuth = require("../middleware/adminAuth");

// router.get("/stats", auth, adminAuth, adminController.getStats);
// const adminAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
//     if (!user) return res.status(401).json({ message: "Unauthorized" });
//     if (!user.isAdmin) return res.status(403).json({ message: "Forbidden: admin only" });

//     req.admin = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = adminAuth;
// middleware/adminAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const parts = authHeader.split(" ").filter(Boolean);
    const token =
      parts.length === 2 && parts[0].toLowerCase() === "bearer"
        ? parts[1]
        : parts[0];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: admin only" });
    }

    req.admin = user; // optional, but useful
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
