const express = require("express");
const { createCourse, updateCourse, getApprovedCourses, getPendingCourses, getRejectedCourses } = require("../controllers/publishers");
const router = express.Router();





router.route("/").post(createCourse);
router.route("/publishers/approvedcourses").get(getApprovedCourses);
router.route("/publishers/pendingcourses").get(getPendingCourses);
router.route("/publishers/rejectedcourses").get(getRejectedCourses);
router.route("/updatecourse/:courseId").put(updateCourse);

// .post(createCourse);

// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
