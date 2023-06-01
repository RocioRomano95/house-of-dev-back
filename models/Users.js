const S = require("sequelize");
const db = require("../config/db");
const bc = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bc.hash(password, salt);
  }
  // validatePassword(password) {
  //   return this.hash(password, this.salt).then(
  //     (newHash) => newHash === this.password
  //   );
  // }
}

User.init(
  {
    name: { type: S.STRING, require: true },
    lastname: { type: S.STRING, require: true },
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
    salt: { type: S.STRING },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bc.genSaltSync();
  user.salt = salt;

  return user
    .hash(user.password, salt)
    .then((result) => {
      user.password = result;
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = User;
