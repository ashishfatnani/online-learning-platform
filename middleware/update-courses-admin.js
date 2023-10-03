const Admin = require('../models/Admin');
const { ObjectId } = require('mongodb');


exports.updateApprovedCoursesList = async (course_id, course_name) =>{
    try {
        await Admin.updateOne({
            _id: new ObjectId(process.env.ATLAS_ADMIN_ID)
        }, {
            $push: {
                coursesApproved: [{
                    course_id: course_id,
                    courseTitle: course_name
                }]
            }

        })
    } catch (error) {
        console.error(error);
    }
}





exports.updateRejectedCoursesList = async (course_id, course_name) =>{
    try {
        await Admin.updateOne({
            _id: new ObjectId(process.env.ATLAS_ADMIN_ID)
        }, {
            $push: {
                coursesRejected: [{
                    course_id: course_id,
                    courseTitle: course_name
                }]
            }

        })
    } catch (error) {
        console.error(error);
    }
}


