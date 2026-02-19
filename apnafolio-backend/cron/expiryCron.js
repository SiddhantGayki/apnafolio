const cron = require("node-cron");
const User = require("../models/User");
const deleteFromS3 = require("../utils/s3Delete");

const GRACE_DAYS = 7;

cron.schedule("0 2 * * *", async () => {
  console.log("⏰ Running expiry cron...");

  const now = new Date();

  const users = await User.find({
    planExpiry: { $ne: null },
  });

  for (let user of users) {

    // 🔴 If expired but not blocked
    if (user.planExpiry && now > user.planExpiry && !user.isBlocked) {
      user.isBlocked = true;
      user.graceUntil = new Date(
        now.getTime() + GRACE_DAYS * 24 * 60 * 60 * 1000
      );
      await user.save();
      console.log("⚠ User blocked:", user.email);
    }

    // 🔥 If grace period over → FULL DELETE
    if (user.isBlocked && user.graceUntil && now > user.graceUntil) {

      const resume = user.resumeData;

      // Delete all S3 files
      if (resume?.contact?.photo)
        await deleteFromS3(resume.contact.photo);

      if (resume?.resumeFile)
        await deleteFromS3(resume.resumeFile);

      // TODO: Loop projects/experience/certifications documents if needed

      await User.findByIdAndDelete(user._id);
      console.log("🔥 User auto-deleted:", user.email);
    }
  }
});
