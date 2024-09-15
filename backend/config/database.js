const mysql = require("mysql2");

const connectDB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bus_rev",
});

module.exports = connectDB;
