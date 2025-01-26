const roleAuth = (role) => {
  // Implement role-based authentication here
  // Check if the user has the required role to access the route
  return function (req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = roleAuth;
