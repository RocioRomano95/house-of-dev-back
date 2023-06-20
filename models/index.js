const Users = require("./Users");
const Property = require("./Properties");
const Category = require("./Categories");
const Visit = require("./Visit");
const Favorites = require("./Favorites");

Property.belongsTo(Category, { as: "category" });
/* Property.hasMany(Visit);
Users.hasMany(Visit); */

Property.hasMany(Visit, { foreignKey: "propertyId", as: "visits" }); // Agrega esta línea

Users.hasMany(Visit, { foreignKey: "userId", as: "visits" });

Visit.belongsTo(Users);
Visit.belongsTo(Property);

Favorites.belongsTo(Users, { foreignKey: "userId" });
Favorites.belongsTo(Property, { foreignKey: "propertyId" });

module.exports = { Users, Property, Category, Favorites, Visit };
