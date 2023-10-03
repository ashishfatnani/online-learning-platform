const express = require("express");
const { getCourses, getSingleCourse, purchaseCourse } = require("../controllers/students");
const router = express.Router();

router.route("/").get(getCourses);
//.post(createCourse);

router.route("/:id").get(getSingleCourse);

router.route("/purchaseCourse/:courseId").post(purchaseCourse)


module.exports = router;
