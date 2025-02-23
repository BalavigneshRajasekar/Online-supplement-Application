const express = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
require("dotenv").config();

// Firebase Configuration object
const service = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
};

admin.initializeApp({
  credential: admin.credential.cert(service),
});

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { idToken } = req.body;
  try {
    const googleUser = await admin.auth().verifyIdToken(idToken);
    const { email, picture, name } = googleUser;

    //Check if the email is already in normal user list
    let user = await User.findOne({ email: email });

    if (!user) {
      //If not, create a new user
      user = new User({
        email,
        username: name,
        image: picture,
      });
      await user.save();
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
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: e.message });
  }
});

module.exports = authRouter;
