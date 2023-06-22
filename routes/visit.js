const express = require("express");
const router = express.Router();

const {
  add_visit,
  all_visits,
  delete_visit,
  user_visits,
} = require("../controllers/visitControllers");

router.post("/create/:id", add_visit);
router.get("/all-visits", all_visits);
router.delete("/delete-visit/:id", delete_visit);
router.get("/user-visits", user_visits);

module.exports = router;
