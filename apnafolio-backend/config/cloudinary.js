// middleware/upload.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configuration:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "[HIDDEN]" : "[NOT SET]",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "apnafolio",
    resource_type: "auto",
  },
});

console.log("Cloudinary storage initialized:", storage);

const upload = multer({ storage });

console.log("Multer upload middleware initialized:", upload);

module.exports = upload;