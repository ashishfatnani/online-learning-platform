/*  @desc -> Create courses 
    @route -> GET /api/v1/courses
    @access -> Publishers
*/
const Course = require("../models/Course");
const Publisher = require("../models/Publisher");

exports.createCourse = async (req, res, next) => {
  try {
    const createData = await Course.create({
      ...req.body,
      publisher: req.publisher_id,
    });

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

/*  @desc -> Update courses 
    @route -> GET /api/v1/courses/updatecourse/:courseId
    @access -> Publishers
*/
exports.updateCourse = async (req, res, next) => {
  //const courseId = req.params.id;
  const updatedCourseData = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updatedCourseData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // // Update the course data
    // Object.assign(course, updatedCourseData);

    // // Save the updated course
    // await course.save();

    return res.status(200).json({
      success: true,
      message: `Course ${req.params.courseId} updated successfully.`,
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

/*  @desc -> Get all rejected courses
    @route -> GET /api/v1/courses/publishers/rejectedcourses
    @access -> Publishers
*/
exports.getRejectedCourses = async (req, res, next) => {
  try {
    const courseData = await Course.find({
      courseApprovalStatus: "rejected",
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
