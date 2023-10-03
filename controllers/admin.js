const Admin = require('../models/Admin');
const Courses = require('../models/Course');
const Student = require('../models/Student');
const Publisher = require('../models/Publisher');
const { ObjectId } = require('mongodb');
const { updateApprovedCoursesList, updateRejectedCoursesList } = require('../middleware/update-courses-admin');




exports.approveCourse = async (req, res, next) => {
    const course_id = req.params.course_id.toString();

    try {
        const result = await Courses.findOne({ _id: new ObjectId(course_id) });

        if (!result) {
            res.json(`The course with course id ${course_id} does not exist`).status(200);
            return;
        } else {
            // Update the course_approval_status to 'approved'
            await Courses.updateOne(
                { _id: new ObjectId(course_id) },
                { $set: { courseApprovalStatus: 'approved' } }

                // update publisher's document with the above course said to approve.

            );
            updateApprovedCoursesList(result._id, result.courseTitle);
            // updatePublisherCourseStatus(result.publisher_id, result.course_title);
            res.json(`Course with course id ${course_id} has been approved`).status(200);
        }
    } catch (error) {
        // Handle any errors that may occur during the database operation

        res.status(500).json({ ErrorMessage: 'Internal server error -> ' + error });
    }
}







exports.rejectCourse = async (req, res, next) => {
    const course_id = req.params.course_id.toString();

    try {
        const result = await Courses.findOne({ _id: new ObjectId(course_id) });

        if (!result) {
            res.json(`The course with course id ${course_id} does not exist`).status(200);
            return;
        } else {
            // Update the course_approval_status to 'rejected'
            await Courses.updateOne(
                { _id: new ObjectId(course_id) },
                { $set: { courseApprovalStatus: 'rejected' } }

                // update publisher's document with the above course said to approve.

            );
            updateRejectedCoursesList(result._id, result.courseTitle);
            // updatePublisherCourseStatus(result.publisher_id, result.course_title);
            res.json(`Course with course id ${course_id} has been rejected`).status(200);
        }
    } catch (error) {
        // Handle any errors that may occur during the database operation

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