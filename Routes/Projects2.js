const { default: axios } = require("axios");
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forkit",
});

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Projects Route");
});

router.get("/getRepos", (req, res) => {
  const ACCESS_TOKEN = req.query.access_token;
  console.log(ACCESS_TOKEN);
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "X-Github-Api-Version": "2022-11-28",
  };
  axios
    .get("https://api.github.com/user/repos", { headers })
    .then((response) => {
      res.send(response.data);
    });
});

router.patch("/changeVisibility", (req, res) => {
  const owner = req.body.owner;
  const repo = req.body.repo;
  const visibility = req.body.visibility;
  const ACCESS_TOKEN = req.body.access_token;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "X-Github-Api-Version": "2022-11-28",
  };
  axios
    .patch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { private: visibility === "private" },
      { headers }
    )
    .then((response) => {
      res.send(response.data);
    });
});

router.post("/forkRepo", (req, res) => {
  const owner = req.body.owner;
  const repo = req.body.repo;
  const ACCESS_TOKEN = req.body.access_token;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${process.env.GITHUB_PAT}`,
    "X-Github-Api-Version": "2022-11-28",
  };

  axios
    .post(
      `https://api.github.com/repos/${owner}/${repo}/forks`,
      {},
      { headers }
    )
    .then(async (response) => {
      const repo_link = response.data.url;
      console.log(`${repo_link}/readme`);
      const readme_res = await axios.get(`${repo_link}/readme`, headers);
      const content = readme_res.data.content;
      console.log(content);
      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        const sql =
          "INSERT INTO `users`(`user_id`, `access_token`, `status`, `repo_link`, `readme`) VALUES ('" +
          owner +
          "','" +
          ACCESS_TOKEN +
          "','pending','" +
          repo_link +
          "','" +
          content +
          "')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
        });
      });

      res.send(response.data);
    });
});

module.exports = router;
