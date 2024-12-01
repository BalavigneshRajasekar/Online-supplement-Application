const User = require("../../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");

const registerRouter = express.Router();

registerRouter.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

module.exports = registerRouter;
