const express = require("express");
const router = express.Router();
const {
  get_all_propieties,
  add_property,
  property_detail,
} = require("../controllers/propertyControllers");
const { Property } = require("../models");

router.get("/", get_all_propieties);
router.post("/create", add_property);
router.get("/:id", property_detail);

module.exports = router;
