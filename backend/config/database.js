const mysql = require("mysql2");

const connectDB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bus_res",
});

module.exports = connectDB.promise();
