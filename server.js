const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

//ENV PROPERTIES
const databaseURI = process.env.ATLAS_CONNECTION_URI;
const port = process.env.PORT;

//ROUTES
const adminLoginRouter = require('./admin_api_module/admin');
const coursesRouter = require('./courses_module/courses');
const studentRouter = require('./student_api_module/student-portal-api');
const studentManagement = require('./student_api_module/student-management');
const publisherManagement = require('./publisher_api_module/publisher-management');

app.use("/api/courses", coursesRouter);
app.use("/api/admin", adminLoginRouter);
app.use("/api/student", studentRouter, studentManagement);
app.use("/api/publisher", publisherManagement);


// START THE SERVER
app.listen(port, (req, res)=>{
    try{
    console.log(`Nodejs Server started at port ${port}`);
    }catch(error){
        console.error('Trouble Starting the Server ' + error)
    }
})


//CONNECT TO MONGODB ATLAS CLOUD
async function connectToMongoDB(){
    try{
        await mongoose.connect(databaseURI);
        console.log("Successfully Connected to Online Learning Platform MongoDB Atlas Cloud");
    }
    catch(error){
        console.error(error);
    }
}

connectToMongoDB();



