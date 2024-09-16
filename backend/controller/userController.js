const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const connect = require("../config/database");

/**
 * @desc Authenticates a user
 * @route POST /api/auth/login
 * @access Public
 * @By - George Imhandegbelo
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  try {
    // Check if user already exists
    const [user] = await connect.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userRecord = user[0];

    const isMatch = await bcrypt.compare(password, userRecord.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
      // res.json({ message: "User login successful", token });
    }

    const token = jwt.sign(
      { id: userRecord.id, email: userRecord.email },
      JWT_SECRET,
      {
        expiresIn: "15min",
      }
    );

    res.status(200).json({
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      phone_number: userRecord.phone_number,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc Registers a new user
 * @route POST /api/auth/register
 * @access Public
 * @By - George Imhandegbelo
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone_number, password, role="PASSENGER" } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!name) {
    res.status(400);
    throw new Error("Username is required");
  }
  if (!phone_number) {
    res.status(400);
    throw new Error("Phone number is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }
  if (!role) {
    res.status(400);
    throw new Error("Password is required");
  }

  try {
    // Check if the user already exists
    const [existingUsers] = await connect.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);

    // Now insert into the DB
    const [result] = await connect.query(
      "INSERT INTO users (name, email, password_hash, phone_number) VALUES (?, ?, ?, ?)",
      [name, email, hashed_pass, phone_number]
    );

    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, {
      expiresIn: "15min",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

/**
 * @desc Get user detail
 * @route GET /api/user
 * @access Private
 * @By George Imhandegbelo
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { loginUser, registerUser, getMe };
