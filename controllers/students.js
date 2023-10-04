const Course = require("../models/Course");
const Student = require("../models/Student");
const { ObjectId } = require("mongodb");
const {
  deductMoneyFromStudentAccount,
  creditMoneyToPublisherAccount,
  creditMoneyToPortal,
} = require("../middleware/process-transactions");

/*  @desc -> Get all the courses
    @route -> GET /api/v1/course
    @access -> Private (students) 
*/
exports.getCourses = async (req, res, next) => {
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

/*  @desc -> Get Single course by id
    @route -> GET /api/v1/course/:courseId
    @access -> Private (students & Publisher) 
*/
exports.getSingleCourse = async (req, res, next) => {
  try {
    const courseData = await Course.findOne({
      _id: req.params.id,
    });
    if (!courseData) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }
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

exports.purchaseCourse = async (req, res, next) => {
  // Student authorised
  try {
    const courseId = req.params.courseId;

    // check student's account balance

    const checkStudent = await Student.findOne({
      _id: new ObjectId(req.student_id),
    });

    const checkCourse = await Course.findOne({
      _id: new ObjectId(courseId),
    });

    const courseName = checkCourse.courseTitle;
    const courseFee = checkCourse.coursePrice;
    const studentAccountBalance = checkStudent.balance;
    const publisher_id = checkCourse.publisher;
    if (
      checkStudent.coursesEnrolled.map((item) => item.courseId === courseId)
    ) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course !",
      });
    } else {
      if (studentAccountBalance > courseFee) {
        deductMoneyFromStudentAccount(
          req.student_id,
          courseFee,
          studentAccountBalance,
          courseName,
          courseId
        );

        const publisherMoney = 0.8 * courseFee;
        const portalRevenue = 0.2 * courseFee;

        creditMoneyToPublisherAccount(publisher_id, publisherMoney);
        creditMoneyToPortal(portalRevenue);

        res
          .json({
            message: `Course ${courseName} Successfully purchased`,
            student_remaining_balance: studentAccountBalance - courseFee,
          })
          .status(200);
      } else
        return res
          .send("Insufficient Balance in Student's account")
          .status(200);
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*  @desc -> Get My  courses
    @route -> GET /api/v1/course
    @access -> Private (students) 
*/
exports.getMyCourses = async (req, res, next) => {
  try {
    const findStudentsCourses = await Student.findById(req.student_id);
    if (findStudentsCourses.coursesEnrolled) {
      return res.status(400).json({
        success: true,
        data: findStudentsCourses.coursesEnrolled,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "You haven't purchased any courses yet!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
