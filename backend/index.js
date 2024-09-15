const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./config/database");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
