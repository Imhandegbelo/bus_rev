const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getMe,
} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getMe);

module.exports = router;
