// const { PutObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const s3 = require("../config/s3");
// const { v4: uuidv4 } = require("uuid");

// exports.generateUploadURL = async (req, res) => {
//   try {
//     const { fileType } = req.body;

//     const fileExtension = fileType.split("/")[1];
//     const key = `users/${req.userId}/${uuidv4()}.${fileExtension}`;

//     const command = new PutObjectCommand({
//       Bucket: process.env.S3_BUCKET,
//       Key: key,
//       ContentType: fileType,
//     });

//     const uploadURL = await getSignedUrl(s3, command, {
//       expiresIn: 60,
//     });

//     const fileURL = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
//     console.log("ENV CHECK:", process.env.S3_BUCKET);


//     res.json({ uploadURL, fileURL });
//   } catch (err) {
    
//     console.error("S3 presign error:", err);

//     res.status(500).json({ message: "Failed to generate upload URL" });
//   }
// };

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

// 🔐 LIMITS
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_PDF_SIZE = 5 * 1024 * 1024;   // 5MB

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

exports.generateUploadURL = async (req, res) => {
  try {
    const { fileType, fileSize } = req.body;

    if (!fileType || !fileSize) {
      return res.status(400).json({ message: "Invalid file data" });
    }

    // ✅ Check allowed type
    if (!ALLOWED_TYPES.includes(fileType)) {
      return res.status(400).json({ message: "File type not allowed" });
    }

    // ✅ Size validation
    if (fileType.startsWith("image/") && fileSize > MAX_IMAGE_SIZE) {
      return res.status(400).json({ message: "Image must be under 2MB" });
    }

    if (fileType === "application/pdf" && fileSize > MAX_PDF_SIZE) {
      return res.status(400).json({ message: "PDF must be under 5MB" });
    }

    // ✅ Check user + plan
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.isBlocked)
      return res.status(403).json({ message: "Plan expired" });

    // ✅ Generate key
    const fileExtension = fileType.split("/")[1];
    const key = `users/${req.userId}/${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    const fileURL = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.json({ uploadURL, fileURL });

  } catch (err) {
    console.error("S3 presign error:", err);
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
};
