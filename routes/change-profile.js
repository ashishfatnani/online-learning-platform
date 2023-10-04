const {changeStudentPassword, changePublisherPassword, getMyStudentProfile, getPublisherProfile} = require('../controllers/change-profile');
const express = require("express");


const router = express.Router();

router.route("/change-student-password").post(changeStudentPassword);
router.route("/change-publisher-password").post(changePublisherPassword);
router.route("/getMyStudentProfile").get(getMyStudentProfile);
router.route("/getPublisherProfile").get(getPublisherProfile);


module.exports = router;
