/*  @desc -> Create courses 
    @route -> GET /api/v1/courses
    @access -> Publishers
*/
const Course = require("../models/Course");
const Publisher = require("../models/Publisher");
exports.createCourse = async (req, res, next) => {
  try {
    const createData = await Course.create(req.body);
    return res.status(201).json({
      success: true,
      data: createData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*  @desc -> Get all the approved courses
    @route -> GET /api/v1/courses/publishers/approvedcourses
    @access -> Publishers
*/

exports.getApprovedCourses = async (req, res, next) => {
  try {
    const courseData = await Course.find({
      courseApprovalStatus: "approved",
    });
    return res.status(200).json({
      success: true,
      data: courseData,
      count: courseData.length,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*  @desc -> Get all the pending courses
    @route -> GET /api/v1/courses/publishers/pendingcourses
    @access -> Publishers
*/

exports.getPendingCourses = async (req, res, next) => {
  try {
    const courseData = await Course.find({
      courseApprovalStatus: "pending",
    });
    return res.status(200).json({
      success: true,
      data: courseData,
      count: courseData.length,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};