const S = require("sequelize");
const db = require("../config/db");

class Visit extends S.Model {}

Visit.init(
  {
    date: { type: S.DATE, validate: { notEmpty: true } },
    hour: { type: S.TIME, validate: { notEmpty: true } },
    is_booked: {
      type: S.BOOLEAN,
      validate: { notEmpty: true },
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "visit" }
);

module.exports = Visit;
