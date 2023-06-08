require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const generateToken = (payload) => {
  try {
    const token = jwt.sign({ user: payload }, secret, { expiresIn: "5d" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const validateToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateToken, validateToken };
