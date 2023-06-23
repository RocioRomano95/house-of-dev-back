const express = require("express");
const router = express.Router();
const {
  signup_user,
  login_user,
  logout_user,
  edit_user,
} = require("../controllers/userControllers");
const { validateAuth } = require("../middlewares");
const { user_visits, sendEmail } = require("../controllers/visitControllers");

router.post("/signup", signup_user);
router.post("/login", login_user);
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});
router.get("/logout", validateAuth, logout_user);
router.put("/edit-user", validateAuth, edit_user);
router.get("/user-visits/:userId", user_visits);
router.post("/sendEmail", sendEmail);

module.exports = router;
