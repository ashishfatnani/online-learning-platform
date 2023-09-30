const express = require("express");
const {
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} = require("../controllers/courses");
const router = express.Router();

router.route("/").get(getCourses).post(createCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
