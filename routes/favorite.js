const express = require("express");
const {
  add_favorites,
  delete_favorites,
  all_favorites,
} = require("../controllers/favoritesControllers");
const router = express.Router();

router.post("/add-favorites", add_favorites);
router.delete("/delete-favorites/:id", delete_favorites);
router.get("/all-favorites", all_favorites);
module.exports = router;
