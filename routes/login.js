const express = require("express");

const {studentLogin, publisherlogin} = require('../controllers/login')

const router = express.Router();

router.route("/student").post(studentLogin)
router.route("/publisher").post(publisherlogin)

module.exports = router;
