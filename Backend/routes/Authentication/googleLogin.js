const express = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
require("dotenv").config();

//Firebase service Config

admin.initializeApp({
  credential: admin.credential.cert(process.env.FireBase_Config),
});

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { idToken } = req.body;
  try {
    const googleUser = await admin.auth().verifyIdToken(idToken);
    const { email, picture, name } = googleUser;

    //Check if the email is already in normal user list
    const user = await User.findOne({ email: email });

    if (!user) {
      //If not, create a new user
      const newUser = new User({
        email,
        username: name,
        password: null,
        image: picture,
      });
      await newUser.save();
    }

    //Generate JWT token for new user
    const token = jwt.sign(
      {
        id: user._id,
        email: email,
        name: name,
        role: user.role,
      },
      process.env.TOKENKEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      message: "Login successfully",
      token: token,
      name: user.username,
      email: user.email,
      image: user.image,
      role: user.role,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = authRouter;
