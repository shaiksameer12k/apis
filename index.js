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

//! routes
app.post("/api/signIn", signInApi);
app.post("/api/logIn", logInApi);
app.get("/api/getTeachersData", getTeachersApi);
app.post("/api/getTeachersData", postTeachersApi);

//! listen
app.listen(port, () => {
  return console.log(`Port is running on ${port}`);
});
