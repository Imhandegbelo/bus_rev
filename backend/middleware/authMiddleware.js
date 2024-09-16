const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const connect = require("../config/database");

// protects routes making sure that only authenticated users can access them
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token without password
      req.user = connect.query(
        "SELECT id, name, email, role, phone_number FROM users WHERE id = ?",
        [decoded.id]
      );

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

module.exports = { protect };
