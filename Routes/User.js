const express = require("express");
const mysql = require("mysql");
const { default: axios } = require("axios");
require("dotenv").config();

const con = require("../db");
const router = express.Router();

router.post("/updateUser", (req, res) => {
  const {login,email,upi_id} = req.body;

  con.query(`SELECT * FROM users WHERE user_name="${login}"`,(err,results)=>{
    if(err) throw err;

    if(results.length === 0){
      con.query(
        "INSERT INTO `users`(`user_name`, `email`, `upi_id`) VALUES ('"+login+"','"+email+"','"+upi_id+"')",(err,result) =>{
          if(err) throw err;
          res.send(result);
        }
      );
    }
    else{
      con.query(
        "UPDATE `users` SET `email`='"+email+"',`upi_id`='"+upi_id+"' WHERE user_name='"+login+"'",(err,result)=>{
          if(err) throw err;
          res.send(result);
        }
      );
    }
  });
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

router.get("/getPayouts", (req, res) => {
  const query =
    "SELECT u.user_name, SUM(CASE WHEN p.status = 'approved' THEN p.amount ELSE 0 END) AS total_approved_amount, u.email, u.upi_id FROM users u LEFT JOIN projects p ON u.user_name = p.user_name GROUP BY u.user_name, u.email, u.upi_id";
  con.query(query, (err, results) => {
    if (err) throw res.json(err);
    res.json(results);
  });
});

module.exports = router;
