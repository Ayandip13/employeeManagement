const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    designation: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    activeEmployee: {
      type: Boolean,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
