const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const publishers = require("./routes/publishers");
const students = require("./routes/students");
// const courses = require("./routes/courses");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

//Connect to DB
connectDB();

//Body Parser
app.use(express.json());

// app.use("/api/v1/course", courses);

app.use("/api/v1/courses", students, publishers);

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
