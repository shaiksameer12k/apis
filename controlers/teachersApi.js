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
  let teacherId = await req.params.teacherId;
  if (teacherId) {
    let data = await teacherData.findOne({ teacherId: teacherId });
    return res.json(data);
  } else {
    let data = await teacherData.find();
    return res.json(data);
  }
};

const postTeachersApi = async (req, res) => {
  let body = req.params;
  let data = await new teacherData(body);

  await data.save();
  return res.send("Data Saved Successfully");
};

module.exports = { getTeachersApi,  postTeachersApi };
