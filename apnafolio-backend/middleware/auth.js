// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    // Accept "Bearer <token>" or just "<token>"
    const parts = authHeader.split(" ").filter(Boolean);
    const token = parts.length === 2 && parts[0].toLowerCase() === "bearer" ? parts[1] : parts[0];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;

    next();
  } catch (err) {
    console.error("auth middleware err:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
