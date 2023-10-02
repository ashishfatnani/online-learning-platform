const mongoose = require("mongoose");
const slugify = require("slugify");

const PublisherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
      unique: true,
      trim: true,
      maxlength: [50, " First Name can not be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
      unique: true,
      trim: true,
      maxlength: [50, "Last Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      require: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    contactNumber: {
      type: String,
      maxlength: [20, "Contact number can not be longer than 20 characters"],
    },
    role: {
      type: String,
      enum: ["publisher"],
      default: "publisher",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    // balance: {
    //   type: Number,
    //   default: 0,
    // },
    amountEarned: {
      type: Number,
      default: 0,
    },
    createdCourses: {
      type: Array,
      default: [],
    },
    amountEarnedFromCourses: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

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

module.exports = mongoose.model("Publisher", PublisherSchema);
