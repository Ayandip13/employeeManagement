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

//endpoint to register a employee
app.post("/addEmployee", async (req, res) => {
  try {
  } catch (error) {
    console.log("Error while creating the employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
});
