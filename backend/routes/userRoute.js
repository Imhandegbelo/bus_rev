const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getMe,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMe);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
