const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
//Middleware Goes here
const allowedOrigins = [
  "http://localhost:3000", // Local frontend
  "https://dksupplements.vercel.app/" // Deployed frontend (replace with actual domain)
];
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
const productRouter = require("./routes/Products/productsRouter");
const paymentRouter = require("./routes/Payments/Payment");
const orderRouter = require("./routes/Products/orders");
const googleLoginRouter = require("./routes/Authentication/googleLogin");

//Routes Goes here
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/googleLogin", googleLoginRouter);
app.use("/api/reset", resetRouter);
app.use("/api/resetPassword", resetPassword);
app.use("/api/admin", supplementRouter);
app.use("/api/p1", productRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/O1", orderRouter);

//Server starts listening

mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connected to MongoDB"); // Connected to MongoDB
  app.listen("3000", () => {
    console.log("Server started on port 3000"); // Server is running on port 3000
  });
});
