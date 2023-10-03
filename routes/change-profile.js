const {changeStudentPassword, changePublisherPassword} = require('../controllers/change-profile');
const express = require("express");


const router = express.Router();

router.route("/change-student-password").post(changeStudentPassword);
router.route("/change-publisher-password").post(changePublisherPassword);

module.exports = router;
