/*  @desc -> Get all the courses
    @route -> GET /api/v1/course
    @access -> Private (students) 
*/
const Course = require("../models/Course");
const Publisher = require("../models/Publisher");


exports.createCourse = async (req, res, next) => {
  try {
    const createData = await Course.create(req.body);

    console.log(`publisher id - -- -- - - -- - ${req.publisher_id}`);


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
