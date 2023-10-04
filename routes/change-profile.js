const {changeStudentPassword, changePublisherPassword, getMyStudentProfile} = require('../controllers/change-profile');
const express = require("express");


const router = express.Router();

router.route("/change-student-password").post(changeStudentPassword);
router.route("/change-publisher-password").post(changePublisherPassword);
router.route("/getMyStudentProfile").get(getMyStudentProfile);

module.exports = router;
