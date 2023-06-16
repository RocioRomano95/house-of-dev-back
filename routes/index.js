const express = require("express");
const router = express.Router();
const users = require("./users");
const properties = require("./properties");
const admin = require("./admin");
const favorites = require("./favorite");
const { isAdmin, validateAuth } = require("../middlewares");

router.use("/users", users);
router.use("/properties", properties);
router.use("/admin", validateAuth, isAdmin, admin);
router.use("/favorites", validateAuth, favorites);

module.exports = router;
