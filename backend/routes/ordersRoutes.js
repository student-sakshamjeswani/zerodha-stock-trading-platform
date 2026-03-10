const express = require("express");
const router = express.Router();
const { getAllOrders, createOrder } = require("../controllers/ordersController");
const verifyUser = require("../middlewares/authMiddleware");

router.get("/allOrders",verifyUser, getAllOrders);
router.post("/newOrder",verifyUser, createOrder);

module.exports = router;