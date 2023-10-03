const Admin = require('../models/Admin');
const { ObjectId } = require('mongodb');
const Publisher = require('../models/Publisher');


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


exports.updatePublisherCourseStatus = async (publisher_id, course_name, course_status)=>{

    try{
        await Publisher.updateOne({
            _id: new ObjectId(publisher_id)

        }, {

            $push: {
                createdCourses: [{
                    course_name: course_name,
                    course_status: course_status,
                    approval_time: new Date()
                }]

            }

        })
    }catch(error){
        res.send(error).status(500);
    }
}
