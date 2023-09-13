const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

//Routes
const authRoute = require("./Routes/Auth");
const projectsRoute = require("./Routes/Projects");

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.use("/auth",authRoute);
app.use("/projects", projectsRoute);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});