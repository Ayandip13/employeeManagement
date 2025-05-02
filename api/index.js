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
  console.log("GET /employees called"); // 🔍 debug
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error in /employees:", error); // 🔥 show real error
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});
