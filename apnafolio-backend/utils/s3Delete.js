// const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
// const s3 = require("../config/s3");

// exports.deleteFromS3 = async (fileURL) => {
//   if (!fileURL) return;

//   try {
//     const key = fileURL.split(".amazonaws.com/")[1];

//     const command = new DeleteObjectCommand({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: key,
//     });

//     await s3.send(command);
//   } catch (err) {
//     console.error("S3 delete error:", err);
//   }
// };

const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");

const deleteFromS3 = async (fileURL) => {
  if (!fileURL) return;

  try {
    const bucket = process.env.S3_BUCKET;

    // Extract key from URL
    const key = fileURL.split(`.amazonaws.com/`)[1];

    if (!key) return;

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await s3.send(command);
    console.log("✅ Deleted from S3:", key);
  } catch (err) {
    console.error("❌ S3 Delete Error:", err);
  }
};

module.exports = deleteFromS3;
