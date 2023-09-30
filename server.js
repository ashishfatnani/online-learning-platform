const express = require("express");
const dotenv = require("dotenv");

const courses = require("./routes/courses");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

app.use("/api/v1/course", courses);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server runnning on PORT ${port} with ${process.env.NODE_ENV} environment`
  );
});
