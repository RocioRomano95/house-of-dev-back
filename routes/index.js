const express = require("express");
const router = express.Router();
const users = require("./users");
const propieties = require("./propieties");

router.use("/users", users);
router.use("/propieties", propieties);

module.exports = router;
