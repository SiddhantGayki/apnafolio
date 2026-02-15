const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");
const { v4: uuidv4 } = require("uuid");

exports.generateUploadURL = async (req, res) => {
  try {
    const { fileType } = req.body;

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
    console.log("ENV CHECK:", process.env.S3_BUCKET);


    res.json({ uploadURL, fileURL });
  } catch (err) {
    
    console.error("S3 presign error:", err);

    res.status(500).json({ message: "Failed to generate upload URL" });
  }
};
