const express = require('express');
const mongoose = require('mongoose');
const publisherManagement = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const bcrypt = require('bcrypt'); // to encrypt password before storing
const saltRounds = 10; // for cryptographic salting the password

const database = process.env.ATLAS_DB
const database_uri = process.env.ATLAS_CONNECTION_URI
const publisher_collection = process.env.ATLAS_PUBLISHERS_COLLECTION

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_TOKEN
const client = new MongoClient(database_uri, { useUnifiedTopology: true });
const db = client.db(database);


const bodyParser = require('body-parser');
publisherManagement.use(bodyParser.json());

publisherManagement.post("/registerPublisher", async (req, res) => {

    try {

        if ((req.body.role != 'publisher')) {
            res.status(500);
            res.send('Please Enter a Valid Role');
            return;

        }


        const isAlreadyExisting = await db.collection(publisher_collection).findOne({ email: req.body.email });
        if (isAlreadyExisting) {
            res.send("Publisher Already Exists");
            res.status(200);
            return;

        }


        if (req.body.password != req.body.confirmPassword) {
            res.status(500).send('The Confirm password and Password do not match!');
            return;
        }


        else {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const result = await db.collection(publisher_collection).insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: encryptedPassword,
                role: req.body.role,
                balance: 0,
                amount_earned: 0,
                created_courses: [],
                amounts_earned_from_courses: 0

            });


            res.status(201).send(`Publisher Created Successfully with id ${result.insertedId}`);




        }
    } catch (error) {
        console.error('Internal Server Error with error - ' + error);
    }

});





publisherManagement.post("/loginPublisher", async (req, res) => {

    const checkForEmail = await db.collection(publisher_collection).findOne({ email: req.body.email });

    if (checkForEmail) {
        console.log('Email Exists in DB, checking for password');

        const encryptedPassword = checkForEmail.password;

        console.log('Now Comparing entered password with encrypted password');

        bcrypt.compare(req.body.password, encryptedPassword, (err, result) => {
            if (err) {
                console.error(error);
                res.send("Error while processing request, check for console logs").status(500);
            }

            if (result) {
                console.log('Authentication Successful');
                const token = jwt.sign({
                    user_id: checkForEmail._id,
                    role: checkForEmail.role
                }, jwtSecret, {
                    expiresIn: '5h'
                });

                res.json(token);

            }
            else{
                res.status(401).send('Authentication Failed');
            }
        })

    }
    else {
        res.send('Provided Email id does not exist in DB').status(401);
    }
    
});




module.exports = publisherManagement;