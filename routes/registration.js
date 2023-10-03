const express = require("express");

const {
  registerStudent,
  registerPublisher,
  registerAdmin
} = require("../controllers/registration")

const router = express.Router();

router.route("/student").post(registerStudent);
router.route("/publisher").post(registerPublisher);
router.route("/admin").post(registerAdmin);

module.exports = router;
