const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config;


const requireRole = (role) => {
  return (req, res, next) => {

    // Get token from request header
    const token = req.headers.authorization.split(" ")[1];

    // If no token, deny user access
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // If token is wrong, deny user access
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Failed to authenticate user" });
      }
      console.log("DEcoded",decoded)
      // Check that user's role matches required role
      if (decoded.role !== role) {
        return res
          .status(403)
          .json({
            message: "Not authorized, no token",
          });
      }

      req.user = decoded;

      next();
    });
  };
};

module.exports = {requireRole}