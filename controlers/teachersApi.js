const mongoose = require("mongoose");

//! Teachers Model
const teacherModel = new mongoose.Schema({
  teacherName: String,
  mobileNumber: String,
  teacherId: Number,
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
  let getData = await teacherData.find();
  let refTeacherId =
    getData.length > 0 && getData[getData.length - 1].teacherId;
  let body = req.body;
  // console.log(refTeacherId,refTeacherId ? Number(refTeacherId) + 1 : Number(1000))
  let data = await new teacherData({
    ...body,
    teacherId: refTeacherId ? Number(refTeacherId) + 1 : Number(1000),
  });
  await data.save();
  return res.json({ message: "Successfully Data Inserted" });
};

const deleteTeachersDataApi = async (req, res) => {
  let getTeacherId = req.query.teacherId;

  // Delete App
  //  await teacherData.deleteMany({});
  await teacherData.deleteOne({ teacherId: getTeacherId });
  return res.json({ message: "Successfully Data Deleted" });
};

const updateTeachersDataApi = async (req, res) => {
  let body = req.body;
  let { teacherName, mobileNumber, gender, classTeacher, teacherId } = body;
  let data = await teacherData.findOneAndUpdate(
    { teacherId: teacherId },
    { teacherName, mobileNumber, gender, classTeacher }
  );
  return res.json({ message: "Successfully Data Updated" });
};

module.exports = { getTeachersApi, postTeachersApi, deleteTeachersDataApi , updateTeachersDataApi};
