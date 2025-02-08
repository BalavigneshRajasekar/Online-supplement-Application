const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware to verify Login token

const loginAuth = (req, res, next) => {
  // Get the token from the request header
  // If the token doesn't exist, return a 401 status and an error message.
  // If the token is valid, use jwt.verify() to decode the token and attach the user object to the request.
  // If the token is invalid, return a 401 status and an error message.

  const token = req.header("Authorization");
  console.log(token)
  try {

    if (!token) {
      return res.status(401).json({ message: "Token doesn't exist" });
    }
    const verify = jwt.verify(token, process.env.TOKENKEY);
    req.user = verify;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = loginAuth;
