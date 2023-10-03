const Admin = require('../models/Admin');
const Courses = require('../models/Course');
const Student = require('../models/Student');
const Publisher = require('../models/Publisher');
const { ObjectId } = require('mongodb');
const { updateApprovedCoursesList, updateRejectedCoursesList, updatePublisherCourseStatus } = require('../middleware/update-courses-admin');




exports.approveCourse = async (req, res, next) => {
    const course_id = req.params.course_id.toString();

    try {
        const result = await Courses.findOne({ _id: new ObjectId(course_id) });
        const approve_status = 'approved'
        if (!result) {
            res.json(`The course with course id ${course_id} does not exist`).status(200);
            return;
        } else {

            await Courses.updateOne(
                { _id: new ObjectId(course_id) },
                { $set: { courseApprovalStatus: approve_status } }



            );
            updateApprovedCoursesList(result._id, result.courseTitle);
            updatePublisherCourseStatus(result.publisher, result.courseTitle, approve_status);
            res.json(`Course with course id ${course_id} has been approved`).status(200);
        }
    } catch (error) {


        res.status(500).json({ ErrorMessage: 'Internal server error -> ' + error });
    }
}







exports.rejectCourse = async (req, res, next) => {
    const course_id = req.params.course_id.toString();

    try {
        const result = await Courses.findOne({ _id: new ObjectId(course_id) });
        const rejected_status = 'rejected'
        if (!result) {
            res.json(`The course with course id ${course_id} does not exist`).status(200);
            return;
        } else {

            await Courses.updateOne(
                { _id: new ObjectId(course_id) },
                { $set: { courseApprovalStatus: 'rejected' } }


            );
            updateRejectedCoursesList(result._id, result.courseTitle);
            updatePublisherCourseStatus(result.publisher, result.courseTitle, rejected_status);
            res.json(`Course with course id ${course_id} has been rejected`).status(200);
        }
    } catch (error) {


        res.status(500).json({ ErrorMessage: 'Internal server error -> ' + error });
    }
}




exports.getAllStudents = async (req, res, next) => {

    try {
        const studentsList = await Student.find({});

        res.send({
            data: studentsList
        }).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
}


exports.getAllPublishers = async (req, res, next) => {

    try {
        const publishersList = await Publisher.find({});

        res.send({
            data: publishersList
        }).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
}