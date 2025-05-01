const express = require("express");
const bodyParser = require("body-parser");
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
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    if (
      !employeeName ||
      employeeId ||
      designation ||
      phoneNumber ||
      dateOfBirth ||
      joiningDate ||
      activeEmployee ||
      salary ||
      address
    ) {
      return res.status(401).json({ message: "All fields are required" });
    }

    //create a new employee
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
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
  try {
    const employees = Employee.find();
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: "Failed to retrive the employees" });
  }
});
