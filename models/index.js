const Users = require("./Users");
const Property = require("./Properties");
const Category = require("./Categories");
const Visit = require("./Visit");
const Favorites = require("./Favorites");

Property.belongsTo(Category, { as: "category" });
Property.hasMany(Visit);
Users.hasMany(Visit);


Favorites.belongsTo(Users, { foreignKey: "userId" });
Favorites.belongsTo(Property, { foreignKey: "propertyId" });

module.exports = { Users, Property, Category, Favorites, Visit };

