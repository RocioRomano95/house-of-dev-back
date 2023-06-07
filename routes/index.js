const express = require("express");
const router = express.Router();
const users = require("./users");
const propieties = require("./propieties");
const admin = require("./admin");

router.use("/users", users);
router.use("/propieties", propieties);
router.use("/admin", admin);

module.exports = router;
