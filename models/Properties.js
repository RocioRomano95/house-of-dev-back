const S = require("sequelize");
const db = require("../config/db");

class Property extends S.Model {}

Property.init(
  {
    description: { type: S.STRING, require: true },
    address: { type: S.STRING, require: true },
    price: { type: S.INTEGER, require: true },
    image: { type: S.STRING },
    locality: { type: S.STRING, require: true },
    bedrooms: { type: S.INTEGER, require: true },
    baths: { type: S.INTEGER, require: true },
    square_meters: { type: S.INTEGER, require: true },
    post_date: { type: S.STRING, require: true },
    state: { type: S.STRING, require: true },
  },
  { sequelize: db, modelName: "property" }
);

module.exports = Property;
