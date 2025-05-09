const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://ayandippaul284:maSkASgRS59Zrxx8@cluster0.v2hflza.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("mongodb Connection failed", error);
  });

app.listen(PORT, () => {
  console.log("server listning to port", PORT);
});

const Employee = require("./models/employee.model.js");
const Attendance = require("./models/attendance.model.js");

//endpoint to register a employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      name,
      employeeId,
      designation,
      mobileNo,
      dob,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    if (
      !name ||
      !employeeId ||
      !designation ||
      !mobileNo ||
      !dob ||
      !joiningDate ||
      activeEmployee === undefined ||
      !salary ||
      !address
    ) {
      return res.status(401).json({ message: "All fields are required" });
    }

    //create a new employee
    const newEmployee = new Employee({
      name,
      employeeId,
      designation,
      mobileNo,
      dob,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", employee: newEmployee });
  } catch (error) {
    console.log("Error while creating the employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
});

//endpoint to fetch all the employees

app.get("/employees", async (req, res) => {
  console.log("GET /employees called");
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error in /employees:", error);
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});

//endpoints to mark the attendance the perticular employee

app.post("/attendance", async (req, res) => {
  try {
    const { employeeId, name, date, status } = req.body;

    // Check if attendance already exists for the given employee on the given date
    const existingAttendance = await Attendance.findOne({ employeeId, date });
    if (existingAttendance) {
      // If found, update the existing attendance status
      existingAttendance.status = status;
      await existingAttendance.save();

      // and sending response with the updated data
      res.status(200).json(existingAttendance);
    } else {
      // If not found, create a new attendance entry
      const newAttendance = new Attendance({
        employeeId,
        name,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting attendance" });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();

    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $month: { $dateFromString: { dateString: "$date" } },
                  },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $cond: { if: { $eq: ["status", "absent"] }, then: 1, else: 0 },
          },
          halfday: {
            $cond: { if: { $eq: ["status", "halfday"] }, then: 1, else: 0 },
          },
          holiday: {
            $cond: { if: { $eq: ["status", "holiday"] }, then: 1, else: 0 },
          },
        },
      },
    ]);

    const endDate = moment(startDate).endOf("month").toDate();
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary report" });
  }
});
