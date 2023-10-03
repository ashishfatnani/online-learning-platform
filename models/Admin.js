const mongoose = require("mongoose");
const slugify = require("slugify");

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
      trim: true,
      maxlength: [50, "First Name can not be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
      trim: true,
      maxlength: [50, "Last Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    role: {
      type: String,
      default: "admin",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: true,
    },
    coursesApproved: {
      type: Array,
      default: [],
    },
    coursesRejected: {
        type: Array,
        default: [],
      },
    totalRevenue:{
        type: Number,
        default: 0 
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
