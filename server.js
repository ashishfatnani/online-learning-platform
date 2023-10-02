const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const courses = require("./routes/courses");

dotenv.config({
  path: "./config/config.env",
});

const app = express();
connectDB();

app.use("/api/v1/course", courses);

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