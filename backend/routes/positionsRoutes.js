const express = require("express");
const router = express.Router();
const { getAllPositions } = require("../controllers/positionsController");

router.get("/allPositions", getAllPositions);

module.exports = router;