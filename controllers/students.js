const Course = require("../models/Course");

/*  @desc -> Get all the courses
    @route -> GET /api/v1/course
    @access -> Private (students) 
*/
exports.getCourses = async (req, res, next) => {
  try {
    const courseData = await Course.find();
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

/*  @desc -> Get Single course by id
    @route -> GET /api/v1/course/:courseId
    @access -> Private (students & Publisher) 
*/

exports.getSingleCourse = async (req, res, next) => {
  try {
    const courseData = await Course.findOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      success: true,
      data: courseData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
