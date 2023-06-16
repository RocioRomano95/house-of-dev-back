const Users = require("./Users");
const Property = require("./Properties");
const Category = require("./Categories");
const Visit = require("./Visit");

Property.belongsTo(Category, { as: "category" });
Property.hasMany(Visit);
Users.hasMany(Visit);

module.exports = { Users, Property, Category, Visit };
