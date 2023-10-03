const express = require("express");

const {studentLogin, publisherlogin, adminLogin} = require('../controllers/login')

const router = express.Router();

router.route("/student").post(studentLogin)
router.route("/publisher").post(publisherlogin)
router.route("/admin").post(adminLogin);

module.exports = router;
