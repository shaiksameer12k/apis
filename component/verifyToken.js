const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied: Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, "schoolManagementApis"); // Replace 'schoolManagementApis' with your actual secret key used for signing tokens
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
