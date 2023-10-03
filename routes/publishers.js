const express = require("express");
const { createCourse } = require("../controllers/publishers");
const router = express.Router();





router.route("/").post(createCourse);
// .post(createCourse);

// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
