const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
//Middleware Goes here
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");

//imported Files
const registerRouter = require("./routes/Authentication/register");
const loginRouter = require("./routes/Authentication/login");
const resetRouter = require("./routes/Authentication/resetCode");
const resetPassword = require("./routes/Authentication/resetPassword");
const supplementRouter = require("./routes/Products/supplementRouter");

//Routes Goes here
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/reset", resetRouter);
app.use("/api/resetPassword", resetPassword);
app.use("/api/admin", supplementRouter);

//Server starts listening
mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connected to MongoDB"); // Connected to MongoDB
  app.listen("3000", () => {
    console.log("Server started on port 3000"); // Server is running on port 3000
  });
});
