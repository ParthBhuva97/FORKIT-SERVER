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
con.connect(function (err) {
  if (err) {
    console.error(err);
    res.status(500).send("Database Connection Error");
    return;
  }
  console.log("Connected!");
});
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Projects Route");
});

router.get("/getRepos", async (req, res) => {
  try {
    const ACCESS_TOKEN = req.query.access_token;
    console.log(ACCESS_TOKEN);
    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-Github-Api-Version": "2022-11-28",
    };
    const response = await axios.get("https://api.github.com/user/repos", {
      headers,
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/changeVisibility", async (req, res) => {
  try {
    const owner = req.body.owner;
    const repo = req.body.repo;
    const visibility = req.body.visibility;
    const ACCESS_TOKEN = req.body.access_token;

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-Github-Api-Version": "2022-11-28",
    };

    const response = await axios.patch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { private: visibility === "private" },
      { headers }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/forkRepo", async (req, res) => {
  try {
    const owner = req.body.owner;
    const repo = req.body.repo;
    const ACCESS_TOKEN = req.body.access_token;

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      "X-Github-Api-Version": "2022-11-28",
    };

    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/forks`,
      {},
      { headers }
    );

    const repo_link = response.data.url;
    console.log(`${repo_link}/readme`);

    setTimeout(async () => {
      const readme_res = await axios.get(`${repo_link}/readme`, { headers });
      const content = readme_res.data.content;
      console.log(content);

      const sql =
        "INSERT INTO `projects`(`user_id`, `status`, `repo_link`, `readme`) VALUES ('" +
        owner +
        "','pending','" +
        repo_link +
        "','" +
        content +
        "')";
      con.query(sql, function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send("Database Query Error");
          return;
        }
        console.log("Result: " + result);
      });
    }, 5000);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getProjects", (req, res) => {
  const projects = [];
  const query = "SELECT * FROM projects";
  con.query(query, function (err, results) {
    if (err) res.send(err);
    // projects = {...results}
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
