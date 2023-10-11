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
let idCounter = 100; // Initial value for your IDs

function generateUniqueId() {
  const newId = idCounter;
  idCounter++; // Increment the counter for the next ID
  return newId;
}
const getTeachersApi = async (req, res) => {
  let data = await teacherData.find();

  console.log("Generated UUID:", generateUniqueId);
  return res.send(data);
};

const postTeachersApi = async (req, res) => {
  let body = req.body;
  let data = await new teacherData(body);

  await data.save();
  return res.send("Successfully Send");
};

module.exports = { getTeachersApi, postTeachersApi };
