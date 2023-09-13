const express = require("express");
const axios = require("axios");
require("dotenv").config();


const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is auth Route");
});

router.get("/getAccessToken", (req, res) => {
  const auth_code = req.query.code;
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: auth_code,
      redirect_uri: process.env.REDIRECT_URI,
    })
    .then((response) => {
      // Response will contain the user access token
      const accessToken = response.data;
      console.log("User Access Token:", accessToken);
      res.send(accessToken);
    })
    .catch((error) => {
      res.send("Something went worng");
    });
});

module.exports = router;
