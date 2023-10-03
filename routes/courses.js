const express = require("express");
const {
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} = require("../controllers/courses");

const {
  registerStudent
} = require("../controllers/registration")
const router = express.Router();

router.route("/").get(getCourses).post(createCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

router.route("/").post(registerStudent)

module.exports = router;
