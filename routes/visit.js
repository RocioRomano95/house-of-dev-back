const express = require("express");
const router = express.Router();

const {
  add_visit,
  all_visits,
  delete_visit,
} = require("../controllers/visitControllers");

router.post("/create/:id", add_visit);
router.get("/all-visits", all_visits);
router.delete("/delete_visit/:id", delete_visit);

module.exports = router;
