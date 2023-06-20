const express = require("express");
const router = express.Router();
const users = require("./users");
const properties = require("./properties");
const admin = require("./admin");
const visit = require("./visit");
const favorites = require("./favorite");
const { isAdmin, validateAuth } = require("../middlewares");

router.use("/users", users);
router.use("/properties", properties);
router.use("/visits", visit);

router.use("/admin", validateAuth, isAdmin, admin, visit);
router.use("/favorites", validateAuth, favorites);

module.exports = router;
