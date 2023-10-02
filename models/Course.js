const mongoose = require("mongoose");
const slugify = require("slugify");

const CourseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Please add a Course Title"],
      unique: true,
      trim: true,
      maxlength: [100, "Course Title can not be more than 100 characters"],
    },
    courseDescription: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    coursePrice: {
      type: Number,
      required: [true, "Please add a Price in $"],
    },
    duration: {
      type: Number,
      required: [true, "Please add duration of the course in mins"],
    },
    courseApprovalStatus: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
    courseContent: {
      type: Object,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    //   publisher: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Publisher',
    //     required: true
    //   }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Course", CourseSchema);
