const express = require("express");

const {
  registerStudent,
  registerPublisher
} = require("../controllers/registration")

const router = express.Router();

router.route("/student").post(registerStudent);
router.route("/publisher").post(registerPublisher);

module.exports = router;
