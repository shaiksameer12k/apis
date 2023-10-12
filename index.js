const dbConnectionFun = require("./db/dbConnection");
const express = require("express");
const cors = require("cors");
const signInApi = require("./controlers/signApi");
const logInApi = require("./controlers/loginApi");
const { getTeachersApi, postTeachersApi } = require("./controlers/teachersApi");

require("dotenv").config();

//! app
app = express();

//! mongoos connection
dbConnectionFun();
//! port
const port = 5000;
//! middleware
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//! routes
app.get("/", (req, res) => {
  return res.send("Hello Node Apis");
});
app.post("/api/signIn", signInApi);
app.post("/api/logIn", logInApi);
app.get("/api/getTeachersData/:teacherId", getTeachersApi);
app.post("/api/getTeachersData", postTeachersApi);

//! listen
app.listen(port, () => {
  return console.log(`Port is running on ${port}`);
});

module.exports = app;
