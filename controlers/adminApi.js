const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sendMail = require("../component/sendMail");
const usermodel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: String,
  mobileNumber: String,
  email: String,
  userName: String,
  password: String,
  EmpId: Number,
  gender: String,
});

const admin =
  mongoose.models.userdatas || mongoose.model("userdatas", usermodel);

// generate password
function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
// sign in api
const signInApi = async (req, res) => {
  let payload = await req.body;
  let {
    firstName,
    lastName,
    dateOfBirth,
    mobileNumber,
    email,
    userName,
    password,
  } = payload;
  let check = await admin.find({ email: email }).count();

  // something issue in mail
  // const randomPassword = generateRandomPassword(6);

  if (
    firstName.length > 0 &&
    lastName.length > 0 &&
    dateOfBirth.length > 0 &&
    mobileNumber.length > 0 &&
    email.length > 0
  ) {
    if (check > 0) {
      return res.json({
        messageStatus: 0,
        message: "Given Email Is Already Existed",
      });
    } else {
      let length = await admin.find().count();
      const saltRounds = 10;
      let hashPsw = await bcrypt.hash(password, saltRounds);

      let data = new admin({
        ...payload,
        EmpId: length + 1,
        password: hashPsw,
      });

      await data.save();
      // await sendMail(email, userName, randomPassword, "0");

      return res.json({
        messageStatus: 1,
        // message: "Successfully UserName and password send to Given Mail Id",
        message: "Successfully Sign In Completed",
      });
    }
  } else {
    return res.json({
      messageStatus: 0,
      message: "Please Fill The Requred Data",
    });
  }
};

// get Admin Data
const getAdminData = async (req, res) => {
  let data = await admin.find();
  if (data.length > 0) {
    return res.json(data);
  } else {
    return res.json({ message: "There is No Data" });
  }
};

// admin login
const loginApi = async (req, res) => {
  let payload = await req.body;
  let { userName, password } = payload;
  let result = await admin.findOne({ userName: userName });

  if (result) {
    let checkPsw = await bcrypt.compare(password, result.password);

    if (checkPsw) {
      return res.json({
        userName: result.userName,
        message: "SuccessFully Login",
      });
    } else {
      return res.json({ message: "Please Enter The Correct Password" });
    }
  } else {
    return res.json({
      message: "Please Sign in , There is No Data on this UserName",
    });
  }
};

// change password

const changePswApi = async (req, res) => {
  let { oldPassword, newPassword, EmpId } = req.body;

  if (oldPassword.length > 0 && newPassword.length > 0) {
    var psw = await admin.findOne({ EmpId });

    if (psw.password == oldPassword) {
      let filterData = await admin.findOneAndUpdate(
        { EmpId },
        { password: newPassword }
      );
      await sendMail(psw.email, psw.userName, newPassword, "changePassword");
      return res.json({ message: "successfully password changed" });
    } else {
      return res.json({ message: "Please Enter Correct Old Password" });
    }
  } else {
    return res.json({ message: "Please Provide Old Password" });
  }
};

// forgot password

const forgetPswApi = async (req, res) => {
  let { userName } = req.body;
  let check = await admin.find({ userName }).count();

  if (check > 0) {
    let data = await admin.findOne({ userName });
    let randomPassword = generateRandomPassword(6);
    await admin.findOneAndUpdate({ userName }, { password: randomPassword });

    await sendMail(data.email, userName, randomPassword, "forgotPassword");
    return res.json({
      messageStatus: 1,
      message: "Successfully UserName and password send to Given Mail Id",
    });
  } else {
    return res.json({ message: "Please Enter the Correct UserName" });
  }
};

// delete admin
const deleteAdminData = async (req, res) => {
  let adminId = req.query.adminId;
  let data = await admin.deleteOne({ EmpId: adminId });
  console.log(data, adminId);
  if (data.deletedCount > 0) {
    return res.json("Successfully Removed");
  } else {
    return res.json("Given Admin Id is Not Existed");
  }
};
module.exports = {
  getAdminData,
  signInApi,
  loginApi,
  changePswApi,
  forgetPswApi,
  deleteAdminData,
};
