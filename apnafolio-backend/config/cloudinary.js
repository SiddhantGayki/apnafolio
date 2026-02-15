// config/cloudinary.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "apnafolio",
    resource_type: "auto",
  },
});

console.log("this are the cloudinary objects--1", storage)

const upload = multer({ storage });

module.exports = upload;

console.log("this are the cloudinary objects--2", upload)