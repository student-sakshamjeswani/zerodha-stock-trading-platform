const express = require('express');
const router = express.Router();
const { getAllHoldings } = require("../controllers/holdingsController");
const verifyUser = require("../middlewares/authMiddleware");

router.get("/allHoldings", verifyUser, getAllHoldings);

module.exports = router;