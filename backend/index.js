const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./config/database");

connectDB.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release(); // Release the connection back to the pool
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/userRoute"))
app.use("/api/cars", require("./routes/carRoute"))
// app.use("/api/reservations")
// app.use("/api/payments")

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
