const Users = require("./Users");
const Property = require("./Properties");
const Category = require("./Categories");

Property.belongsTo(Category, { as: "category" });

module.exports = { Users, Property, Category };
