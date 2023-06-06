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
    console.log("newUUUUser", newUser);
    res.status(200).send(newUser);
  } catch (error) {
    console.log("ERROR", error);
    res.send(error);
  }
};
exports.login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("REQBODY de LOG", req.body);

    const searchUser = await Users.findOne({ where: { email } });
    console.log("SEARCH USER login=>", searchUser);

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
    res.send(error);
  }
};
exports.logout_user = (req, res) => {
  console.log("HOLA");
  res.clearCookie("token");
  res.sendStatus(404);
};
