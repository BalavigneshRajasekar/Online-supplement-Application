const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
//Middleware Goes here
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));

//imported Files
const registerRouter = require("./routes/Authentication/register");
const loginRouter = require("./routes/Authentication/login");

//Routes Goes here
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

//Server starts listening
mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connected to MongoDB"); // Connected to MongoDB
  app.listen("3000", () => {
    console.log("Server started on port 3000"); // Server is running on port 3000
  });
});
