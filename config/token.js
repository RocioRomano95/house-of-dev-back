require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const generateToken = (payload) => {
  console.log("payload=>", payload);
  const token = jwt.sign({ user: payload }, secret, { expiresIn: "5d" });
  console.log("Token", token);
  return token;
};

const validateToken = (token) => {
  const user = jwt.verify(token, secret);
  return user;
};

module.exports = { generateToken, validateToken };
