// Import required modules
const mongoose = require("mongoose");
const cron = require("node-cron");
const {
  teacherData,
  postTeachersAttendance,
  teacherAttendanceData,
} = require("../controlers/teachersApi");

const dbConnectionFun = () => {
  // MongoDB connection URI (replace with your own connection string)
  const mongoURI =
    "mongodb+srv://shaiksameer6061:sameer6061@cluster0.xhq9rtq.mongodb.net/vector";

  // Connect to MongoDB
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Event listener for successful connection
  db.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  // Event listener for connection errors
  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  // Event listener for disconnection
  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  // Gracefully handle process termination
  process.on("SIGINT", () => {
    db.close(() => {
      console.log("MongoDB connection closed due to application termination");
      process.exit(0);
    });
  });

  // Schedule a task to run every day at 5:00 PM

  cron.schedule("4 13 * * *", async () => {
    let absentEmployees = await getAbsentEmployees();

    absentEmployees.forEach(async (teacherId) => {
      const attendanceRecord = new teacherAttendanceData({
        teacherId,
        attendenceDate: new Date(),
        status: "Absent",
      });
      await attendanceRecord.save();
      console.log(`Attendance record added for employee ${teacherId}`);
    });
  });
};

const getAbsentEmployees = async (req, res) => {
  let filterData = (await teacherData.find()).map((item) => item.teacherId);
  let checkInAttenence = await teacherAttendanceData.find();
  const missingIds = filterData.filter(
    (id) => !checkInAttenence.map((t) => t.teacherId).includes(id)
  );

  return missingIds;
};

module.exports = dbConnectionFun;
