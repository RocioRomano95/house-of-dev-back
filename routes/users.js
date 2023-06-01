const express = require("express");
const router = express.Router();
const { signup_user } = require("../controllers/userControllers");

router.post("/signup", signup_user);

module.exports = router;
