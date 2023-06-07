const S = require("sequelize");
const db = require("../config/db");

class Property extends S.Model {}

Property.init(
  {
    description: { type: S.STRING, validate: { notEmpty: true } },
    address: { type: S.STRING, validate: { notEmpty: true } },
    price: { type: S.INTEGER, validate: { notEmpty: true } },
    image: { type: S.STRING },
    locality: { type: S.STRING, validate: { notEmpty: true } },
    bedrooms: { type: S.INTEGER, validate: { notEmpty: true } },
    baths: { type: S.INTEGER, validate: { notEmpty: true } },
    square_meters: { type: S.INTEGER, validate: { notEmpty: true } },
    post_date: { type: S.STRING, validate: { notEmpty: true } },
    state: { type: S.STRING, validate: { notEmpty: true } },
  },
  { sequelize: db, modelName: "property" }
);

module.exports = Property;
