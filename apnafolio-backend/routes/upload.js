const express = require("express");
const router = express.Router();
const { generateUploadURL } = require("../controllers/uploadController");
const auth = require("../middleware/auth");

router.post("/generate-upload-url", auth, generateUploadURL);

module.exports = router;
