const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const adminLoginRouter = require('./admin_api_module/admin');
const coursesRouter = require('./courses_module/courses');
const studentRouter = require('./student_api_module/student-portal-api');
const studentManagement = require('./student_api_module/student-management');
const publisherManagement = require('./publisher_api_module/publisher-management');

const databaseURI = process.env.ATLAS_CONNECTION_URI;

app.use("/api/courses", coursesRouter);
app.use("/api/admin", adminLoginRouter);
app.use("/api/student", studentRouter, studentManagement);
app.use("/api/publisher", publisherManagement);


//CONNECT TO MONGODB
async function connectToMongoDB(){
    try{
        await mongoose.connect(databaseURI);
        console.log("Successfully Connected to MongoDB Atlas Cloud");
    }
    catch(error){
        console.error(error);
    }
}

connectToMongoDB();



app.listen(8000, (req, res)=>{
    //res.send("Project is up !!");
    console.log("Project is up !!");
})