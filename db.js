const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forkit",
});
con.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected!");
});

module.exports = con;