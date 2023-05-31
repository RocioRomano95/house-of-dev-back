const S = require("sequelize");
const db = require("../config/db");

class User extends S.Model {}

User.init(
  {
    name: { type: S.STRING, require: true },
    last_name: { type: S.STRING, require: true },
    email: {
      type: S.STRING,
      require: true,
      validate: { isEmail: true },
      unique: true,
    },
    password: { type: S.STRING, require: true, validate: { notEmpty: true } },
    image: { type: S.STRING },
    phone: { type: S.INTEGER, require: true },
    is_admin: { type: S.BOOLEAN, defaultValue: false },
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;
