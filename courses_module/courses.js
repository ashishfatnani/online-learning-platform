const express = require('express');
const mongoose = require('mongoose');
const coursesRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { requirePublisherOrAdminRole, requireStudentOrAdminRole } = require('../common/role-based-access');

const jwtSecret = process.env.JWT_TOKEN;

const database = process.env.ATLAS_DB
const database_uri = process.env.ATLAS_CONNECTION_URI
const courses_collection = process.env.ATLAS_COURSES_COLLECTION

const client = new MongoClient(database_uri, { useUnifiedTopology: true });
const db = client.db(database);


const bodyParser = require('body-parser');
coursesRouter.use(bodyParser.json());

coursesRouter.post("/publishCourse", requirePublisherOrAdminRole, async (req, res) => {

    try {

        const result = await db.collection(courses_collection).insertOne({
            course_title: req.body.course_title,
            course_description: req.body.course_description,
            course_price: req.body.course_price,
            course_approval_status: 'pending',
            publisher_id: req.publisher_id,
            course_content: req.body.course_content


        });



        res.status(201).send(`Course ${req.body.course_title} Created Successfully with course id ${result.insertedId}`);


    }
    catch (error) {
        console.log('Courses Can only be published by Instructors/ Publishers.');
        res.status(500);
        res.send(error);
    }

});


coursesRouter.get("/getAllCourses", requireStudentOrAdminRole, async (req, res) => {

    console.log(`Student id ${req.student_id}`);
    const result = await db.collection(courses_collection).find({course_approval_status: 'approved'}).toArray();
    res.json({ message: result });
    res.status(200);
});








module.exports = coursesRouter;