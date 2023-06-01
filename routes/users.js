const express = require("express");
const router = express.Router();
const { signup_user, login_user } = require("../controllers/userControllers");

router.post("/signup", signup_user);
router.post("/login", login_user);

module.exports = router;
