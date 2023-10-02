const express = require('express');
const mongoose = require('mongoose');
const database_uri = process.env.ATLAS_CONNECTION_URI
const database = process.env.ATLAS_DB
const courses_collection = process.env.ATLAS_COURSES_COLLECTION
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const client = new MongoClient(database_uri, { useUnifiedTopology: true });
const db = client.db(database);
const { requireAdminRoleOnly } = require('../common/role-based-access');
const adminRouter = express.Router();
const publisher_collection = process.env.ATLAS_PUBLISHERS_COLLECTION
const bodyParser = require('body-parser');
adminRouter.use(bodyParser.json());
const bcrypt = require('bcrypt')
const saltRounds = 10;


const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_TOKEN;

const admin_collection = process.env.ATLAS_ADMIN_COLLECTION;

adminRouter.post("/adminLogin", async (req, res) => {

    const checkForEmail = await db.collection(admin_collection).findOne({ email: req.body.email });

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


adminRouter.post("/createAdmin", async (req, res)=>{
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const result = await db.collection(admin_collection).insertOne({
        role: 'admin',
        courses_approved: [],
        courses_rejected: [],
        total_revenue: 0,
        email: req.body.email,
        password: encryptedPassword
    });

    res.status(201).send("Admin Successfully Created");
});

adminRouter.get("/viewPendingCourses", requireAdminRoleOnly, async (req, res) => {

    const result = await db.collection(courses_collection).find({ course_approval_status: 'pending' }).toArray();
    if (result.length > 0) {
        //console.log(result.map(item => item.course_title));
        // res.json(result).status(200);

        res.json(result.map(item => ({
            course_title: item.course_title,
            course_id: item._id,
            course_price: item.course_price,
            publisher_id: item.publisher_id,
            course_approval_status: item.course_approval_status
        })))
    }
    else
        res.json({ message: 'No Courses in Pending Approval state' });

});

adminRouter.patch("/approveCourse/:course_id", async (req, res) => {
    // Convert the course_id parameter to a string
    const course_id = req.params.course_id.toString();


    try {
        // Find the course by its _id
        const result = await db.collection(courses_collection).findOne({ _id: new ObjectId(course_id) });  // as in the mongodb document _id is stored by objectId.
        if (!result) {
            res.json(`The course with course id ${course_id} does not exist`).status(200);
        } else {
            // Update the course_approval_status to 'approved'
            await db.collection(courses_collection).updateOne(
                { _id: new ObjectId(course_id) },
                { $set: { course_approval_status: 'approved' } }

                // update publisher's document with the above course said to approve.

            );
            updatePublisherCourseStatus(result.publisher_id, result.course_title);
            res.json(`Course with course id ${course_id} has been approved`).status(200);
        }
    } catch (error) {
        // Handle any errors that may occur during the database operation
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update the course_created array in publisher document whenever a course is approved.
async function updatePublisherCourseStatus(publisher_id, course_name) {

    try {
        await db.collection(publisher_collection).updateOne({
            id: new ObjectId(publisher_id)

        }, {
            $push: {
                created_courses: [{
                    course_name: course_name,
                    approval_time: new Date()
                }
                ]
            }
        })
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = adminRouter;




