const express = require("express");
const router = express.Router();
const {
  get_all_properties,
  property_detail,
} = require("../controllers/propertyControllers");
const { Property } = require("../models");

router.get("/", get_all_properties);
router.get("/:id", property_detail);

module.exports = router;
