const Users = require("./Users");
const Property = require("./Properties");
const Category = require("./Categories");
const Favorites = require("./Favorites");

Property.belongsTo(Category, { as: "category" });

Favorites.belongsTo(Users, { foreignKey: "userId" });
Favorites.belongsTo(Property, { foreignKey: "propertyId" });

module.exports = { Users, Property, Category, Favorites };
