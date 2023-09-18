const { default: axios } = require("axios");
const express = require("express");
require("dotenv").config();

const con = require("../db");
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

router.get("/getUserProjects", (req, res) => {
  const user = req.query.user;
  console.log(user);
  const query = "SELECT * FROM projects WHERE `user_id` = ?";

  con.query(query, [user], function (err, results) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    console.log(results);
    // Do not call con.end() here; it may close the connection prematurely.

    res.json(results); // Send the results as a JSON response.
  });
});

router.get("/approve",(req,res)=>{
  const project_id = req.query.project_id;
  console.log(project_id);
  const query =
    "UPDATE `projects` SET `status` = 'approved' WHERE `projects`.`project_id` = " +
    `${project_id}`;
  con.query(query,(err,results)=>{
    if (err) throw res.send(err);
    res.send(results);
  })
  
})

router.get("/reject", (req, res) => {
  const project_id = req.query.project_id;
  console.log(project_id);
  const query =
    "UPDATE `projects` SET `status` = 'rejected' WHERE `projects`.`project_id` = " +
    `${project_id}`;
  con.query(query, (err, results) => {
    if (err) throw res.send(err);
    res.send(results);
  });
});

router.get("/getProjects", (req, res) => {
  var status = req.query.status;
  console.log(status);
  var condition = `WHERE status="${status}"`;
  var query = `SELECT * FROM projects `;
  if(status !== "all"){
    query += condition
  }
  console.log(query);
  con.query(query, function (err, results) {
    if (err) res.send(err);
    // projects = {...results}
    // console.log(results);
    res.json(results);
  });
});

module.exports = router;
