const express = require("express");
const { getCourses, getSingleCourse } = require("../controllers/students");
const router = express.Router();

router.route("/").get(getCourses);
//.post(createCourse);

router.route("/:id").get(getSingleCourse);

module.exports = router;
