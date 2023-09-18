const express = require("express");
const mysql = require("mysql");
const { default: axios } = require("axios");
require("dotenv").config();

const con = require("../db");
const router = express.Router();

router.post("/updateUser", (req, res) => {
  const data = req.body;

  const query =
    "UPDATE `users` SET `email` = '" +
    data.email +
    "', `upi_id` = '" +
    data.upi_id +
    "' WHERE `users`.`user_id` = '" +
    data.login +
    "'";
  console.log(query);
  con.query(query,(err,results)=>{
    if (err) throw res.json(err);
    res.send(results);
  })
});

router.post("/getUser", (req, res) => {
  const data = req.body;
  const query = `SELECT * FROM users WHERE user_id="${data.login}"`;
  con.query(query, (err, results) => {
    if (err) throw res.json(err);
    if (results.length === 0) {
      const sql =
        "INSERT INTO `users` (`user_id`, `user_name`, `email`, `upi_id`) VALUES ('" +
        data.login +
        "', '" +
        data.name +
        "', '" +
        data.email +
        "', NULL)";
      con.query(sql, (err, results) => {
        if (err) throw res.json(err);
        res.json(results);
      });
    }
    res.json(results);
  });
});

router.get("/getAllUsers",(req,res)=>{
  const query = "SELECT * FROM users";
  con.query(query, (err,results)=>{
    if (err) throw res.json(err);
    res.json(results);
  });
})

module.exports = router;
