// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const {
//   saveResume,
//   getResume,
//   getPublicPortfolio,
//   switchTemplate,
//   getDashboard,
// } = require("../controllers/userController");

// router.get("/portfolio/:username", getPublicPortfolio);
// router.post("/switch-template", auth, switchTemplate);
// router.get("/dashboard", auth, getDashboard);
// router.get("/resume", auth, getResume);
// router.post("/resume", auth, saveResume);

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/portfolio/:username", userController.getPublicPortfolio);
router.post("/switch-template", auth, userController.switchTemplate);
router.get("/dashboard", auth, userController.getDashboard);
router.get("/resume", auth, userController.getResume);
router.post("/resume", auth, userController.saveResume);

module.exports = router;
