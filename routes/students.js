const express = require("express");
const {
  getCourses,
  getSingleCourse,
  purchaseCourse,
  getMyCourses,
} = require("../controllers/students");
const router = express.Router();

router.route("/").get(getCourses);
//.post(createCourse);
router.route("/mycourses").get(getMyCourses);
router.route("/:id").get(getSingleCourse);

router.route("/purchaseCourse/:courseId").post(purchaseCourse);

module.exports = router;
