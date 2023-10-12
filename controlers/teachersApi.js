const mongoose = require("mongoose");

//! Teachers Model
const teacherModel = new mongoose.Schema({
  teacherName: String,
  mobileNumber: String,
  teacherId: String,
  gender: String,
  classTeacher: String,
});

const teacherData =
  mongoose.models.teachers || mongoose.model("teachers", teacherModel);

// ! Controllers

const getTeachersApi = async (req, res) => {
  let data = await teacherData.find();
  return res.send(data);
};

const postTeachersApi = async (req, res) => {
  let body = req.body;
  let data = await new teacherData(body);

  await data.save();
  return res.send("Data Saved Successfully");
};

module.exports = { getTeachersApi, postTeachersApi };
