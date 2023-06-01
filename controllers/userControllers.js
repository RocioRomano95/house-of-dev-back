const Users = require("../models/Users");

exports.signup_user = async (req, res) => {
  try {
    console.log("ReqBody", req.body);
    const searchUser = await Users.findOne({
      where: { email: req.body.email },
    });
    console.log("searchUser=>", searchUser);
    if (searchUser) {
      return res.status(400).send("Este usuario ya existe");
    }
    const newUser = await Users.create(req.body);
    console.log("newuser", newUser);
    res.status(200).send(newUser);
  } catch (error) {
    console.log("ERROR", error);
    res.send(error);
  }
};
