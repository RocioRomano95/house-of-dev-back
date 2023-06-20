const express = require("express");
const router = express.Router();
const {
  add_property,
  edit_property,
  delete_property,
} = require("../controllers/propertyControllers");
const { validateAuth, isAdmin } = require("../middlewares");

const { accept_visit } = require("../controllers/visitControllers");

router.post("/create", add_property);
router.put("/edit-property", edit_property);
router.delete("/delete-property/:id", delete_property);
router.put("/accept_visit/:id", accept_visit);

module.exports = router;
