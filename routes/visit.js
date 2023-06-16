const express = require("express");
const router = express.Router();

const { add_visit, delete_visit } = require("../controllers/visitControllers");

router.post("/create", add_visit);
// router.delete("/delete_visit/:id", delete_visit);

module.exports = router;
