const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware to verify Login token

const loginAuth = (req, res, next) => {
  const token = req.header("Authorization");
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
