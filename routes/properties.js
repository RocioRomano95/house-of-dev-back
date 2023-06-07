const express = require("express");
const router = express.Router();
const {
  get_all_properties,
  property_detail,
  search_locality,
  search_state,
  search_category,
} = require("../controllers/propertyControllers");
const { Property } = require("../models");

router.get("/", get_all_properties);
router.get("/:id", property_detail);
router.get("/search/:locality", search_locality);
router.get("/filter-state/:state", search_state);
router.get("/filter-category/:categorysearch", search_category);

module.exports = router;
