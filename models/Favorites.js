const S = require("sequelize");
const db = require("../config/db");

class Favorites extends S.Model {}

Favorites.init({}, { sequelize: db, modelName: "favorites" });

module.exports = Favorites;
