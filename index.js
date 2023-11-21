const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());

//Routes
const authRoute = require("./Routes/Auth");
const projectsRoute = require("./Routes/Projects");
const usersRoute = require("./Routes/User");
const paymentRoute = require("./Routes/Payment");

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.use("/auth",authRoute);
app.use("/projects", projectsRoute);
app.use("/users",usersRoute);
app.use("/payment",paymentRoute);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});