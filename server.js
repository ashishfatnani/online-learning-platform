const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const publishers = require("./routes/publishers");
const students = require("./routes/students");
// const courses = require("./routes/courses");
const courses = require("./routes/courses");
const registration = require("./routes/registration");
const login = require("./routes/login");
const admin = require('./routes/admin');
const changeProfile = require("./routes/change-profile");
const {
  requireStudentOrAdminRole,
  requirePublisherOrAdminRole,
  requireAdminRoleOnly
} = require("./middleware/role-based-access");
const { approveCourse } = require("./controllers/admin");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

//Connect to DB
connectDB();

//Body Parser
app.use(express.json());

// app.use("/api/v1/course", courses);

app.use("/api/v1/publishers/courses",requirePublisherOrAdminRole, publishers);
app.use("/api/v1/students/courses", requireStudentOrAdminRole, students);
// 
//courses
//app.use("/api/v1/courseByPublisher", requirePublisherOrAdminRole, courses); // ADDED PUBLISHER ACCESS ONLY FOR NOW

//register
app.use("/api/v1/register", registration);

//purchase




//login
app.use("/api/v1/login", login);

app.use("/api/v1/admin", requireAdminRoleOnly, admin);


//change-profile
app.use(
  "/api/v1/changeStudentProfile",
  requireStudentOrAdminRole,
  changeProfile
);
app.use(
  "/api/v1/changePublisherProfile",
  requirePublisherOrAdminRole,
  changeProfile
);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server runnning on PORT ${port} with ${process.env.NODE_ENV} environment`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
