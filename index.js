const dbConnectionFun = require("./db/dbConnection");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  getAdminData,
  signInApi,
  loginApi,
  changePswApi,
  forgetPswApi,
  deleteAdminData,
} = require("./controlers/adminApi");
const {
  getTeachersApi,
  postTeachersApi,
  deleteTeachersDataApi,
  updateTeachersDataApi,
  postTeachersAttendance,
  getMonthTeachersAttendance,
} = require("./controlers/teachersApi");

const verifyToken = require("./component/verifyToken");
const getToken = require("./controlers/getToken");

dotenv.config();

//! app
app = express();

//! mongoos connection
dbConnectionFun();
//! port
const port =  5000;
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

app.post("/api/getToken", getToken);

app.get("/api/adminData",verifyToken, getAdminData);
app.delete("/api/adminData",verifyToken, deleteAdminData);
app.post("/api/signInApi",verifyToken, signInApi);
app.post("/api/loginApi",verifyToken, loginApi);
app.post("/api/changePswApi",verifyToken, changePswApi);
app.post("/api/forgetPswApi",verifyToken, forgetPswApi);


app.get("/api/getTeachersData/:teacherId",verifyToken, getTeachersApi);
app.get("/api/getTeachersData",verifyToken, getTeachersApi);
app.post("/api/getTeachersData",verifyToken, postTeachersApi);
app.delete("/api/getTeachersData",verifyToken, deleteTeachersDataApi);
app.put("/api/getTeachersData",verifyToken, updateTeachersDataApi);
app.post("/api/postTeachersAttendance",verifyToken ,postTeachersAttendance);
app.get(
  "/api/getMonthTeachersAttendance/:teacherId/:month",verifyToken,
  getMonthTeachersAttendance
);

//! listen
app.listen(port, () => {
  return console.log(`Port is running on ${port}`);
});

module.exports = app;
