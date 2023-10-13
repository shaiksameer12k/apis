const jwt = require("jsonwebtoken");
const getToken = (req, res) => {
  let { username, password } =req.body;
  console.log(username, password);
  const user = { username, password };

  if (username !== "shaiksameer12k@gmail.com" || password !== "sameer@67") {
    return res.json({ message: "Invalid Username or Password" });
  } else {
    const token = jwt.sign({ user }, "schoolManagementApis", {
      expiresIn: "1h",
    });
    res.json({ token });
  }
};

module.exports = getToken;
