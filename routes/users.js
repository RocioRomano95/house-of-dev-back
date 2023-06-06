const express = require("express");
const router = express.Router();
const {
  signup_user,
  login_user,
  logout_user,
} = require("../controllers/userControllers");
const { validateAuth } = require("../middlerwares");

router.post("/signup", signup_user);
router.post("/login", login_user);
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});
router.get("/logout", logout_user);
router.use("/", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
