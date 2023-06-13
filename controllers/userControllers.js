const { Users } = require("../models");
const { generateToken } = require("../config/token");

exports.signup_user = async (req, res) => {
  try {
    const searchUser = await Users.findOne({
      where: { email: req.body.email },
    });

    if (searchUser) {
      return res.status(400).send("Este usuario ya existe");
    }
    const newUser = await Users.create(req.body);

    res.status(200).send(newUser);
  } catch (error) {
    console.log("ERROR", error);
    res.send(error.message);
  }
};
exports.login_user = async (req, res) => {
  const { password } = req.body;
  let email = req.body.email.toLowerCase();

  try {
    const searchUser = await Users.findOne({ where: { email } });

    if (!searchUser) {
      return res.status(401).send("email incorrecto");
    }
    const validatePass = await searchUser.validatePassword(password);
    console.log("VALIDATE password", validatePass);

    if (!validatePass) return res.status(401).send("contraseña incorrecta");

    const payload = {
      name: searchUser.name,
      lastname: searchUser.lastname,
      email: searchUser.email,
      image: searchUser.image,
      phone: searchUser.phone,
      is_admin: searchUser.is_admin,
    };
    console.log("PAYLOAD", payload);

    const token = generateToken(payload);
    console.log("TOKEN", token);

    res.cookie("token", token);

    res.send(payload);
  } catch (error) {
    res.send(error.message);
  }
};
exports.logout_user = (req, res) => {
  res.clearCookie("token");
  res.send("El token fue eliminado");
};
