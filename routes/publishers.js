const express = require("express");
const { createCourse, getApprovedCourses } = require("../controllers/publishers");
const router = express.Router();

router.route("/").post(createCourse);
router.route("/publishers/approvedcourses").get(getApprovedCourses);
// .post(createCourse);

// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
