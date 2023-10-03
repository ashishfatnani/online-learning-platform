const {approveCourse, rejectCourse, getAllStudents, getAllPublishers} = require('../controllers/admin');
const express = require('express');

const router = express.Router();

router.route("/approveCourse/:course_id").patch(approveCourse);
router.route("/rejectCourse/:course_id").patch(rejectCourse);
router.route("/getAllStudents").get(getAllStudents);
router.route("/getAllPublishers").get(getAllPublishers);

module.exports = router;
