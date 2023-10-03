const Student = require("../models/Student");
const Publisher = require('../models/Publisher');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.studentLogin = async (req, res, next) => {
    const checkForEmail = await Student.findOne({ email: req.body.email });

    if (checkForEmail) {

        const encryptedPassword = checkForEmail.password;

        bcrypt.compare(req.body.password, encryptedPassword, (err, result) => {
            if (err) {
                res.send(`Error while processing request ${err}`).status(500);
                return;
            }

            if (result) {
                const token = jwt.sign({
                    user_id: checkForEmail._id,
                    role: checkForEmail.role
                }, process.env.JWT_TOKEN, {
                    expiresIn: '5h'
                });

                res.json(token);
            }
            else {
                res.status(401).send('Authentication Failed');
            }
        })
    }
    else {
        res.send('Provided Email id does not exist in DB').status(401);
    }
}




exports.publisherlogin = async (req, res, next) => {
    const checkForEmail = await Publisher.findOne({ email: req.body.email });
    
    if (checkForEmail) {

        const encryptedPassword = checkForEmail.password;
        bcrypt.compare(req.body.password, encryptedPassword, (err, result) => {
            if (err) {
                res.send(`Error while processing request ${err}`).status(500);
                return;
            }

            if (result) {
                
                const token = jwt.sign({
                    user_id: checkForEmail._id,
                    role: checkForEmail.role
                }, process.env.JWT_TOKEN, {
                    expiresIn: '5h'
                });

                res.json(token);
            }
            else {
                res.status(401).send('Authentication Failed');
            }
        })
    }
    else {
        res.send('Provided Email id does not exist in DB').status(401);
    }
}



exports.adminLogin = async (req, res, next) => {
    const checkForEmail = await Admin.findOne({ email: req.body.email });

    if (checkForEmail) {

        const encryptedPassword = checkForEmail.password;

        bcrypt.compare(req.body.password, encryptedPassword, (err, result) => {
            if (err) {
                res.send(`Error while processing request ${err}`).status(500);
                return;
            }

            console.log(result);
            if (result) {
                const token = jwt.sign({
                    user_id: checkForEmail._id,
                    role: checkForEmail.role
                }, process.env.JWT_TOKEN, {
                    expiresIn: '5h'
                });

                res.json(token);
            }
            else {
                res.status(401).send('Authentication Failed');
            }
        })
    }
    else {
        res.send('Provided Email id does not exist in DB').status(401);
    }
}