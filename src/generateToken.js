const jwt = require("jsonwebtoken");

const generateToken = () => {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;