const S = require("sequelize");
const db = require("../config/db");

class Category extends S.Model {}

Category.init(
  {
    name: { type: S.STRING, validate: { notEmpty: true } },
  },
  { sequelize: db, modelName: "category" }
);

module.exports = Category;
