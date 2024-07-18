const User = require("../../models/user");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRouter = express.Router();

loginRouter.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = bcrypt.compareSync(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const authToken = await jwt.sign(
      {
        email: userExists.email,
        name: userExists.username,
        role: userExists.role,
      },
      process.env.TOKENKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successfully", token: authToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = loginRouter;
