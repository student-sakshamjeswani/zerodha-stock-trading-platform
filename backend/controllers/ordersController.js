const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");

const getAllOrders = async (req, res) => {
  const allOrders = await OrdersModel.find({ userId: req.userId });
  res.json(allOrders);
};

const createOrder = async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const qtyNum = Number(qty);
  const priceNum = Number(price);

  if (qtyNum <= 0) {
    return res.json({
      success: false,
      message: "Quantity must be greater than 0"
    });
  }
  // SELL validation FIRST
  if (mode === "SELL") {
    const holding = await HoldingsModel.findOne({
      userId: req.userId,
      name: name
    });
    if (!holding || holding.qty < qtyNum) {
      return res.json({
        success: false,
        message: "Not enough stock to sell"
      });
    }

    holding.qty -= qtyNum;
    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({ _id: holding._id });
    } else {
      await holding.save();
    }
  }
  // BUY Logic
  if (mode === "BUY") {
    const existingHolding = await HoldingsModel.findOne({
      userId: req.userId,
      name: name
    });

    if (existingHolding) {
      const totalQty = existingHolding.qty + qtyNum;
      const newAvg = ((existingHolding.qty * existingHolding.avg) + (qtyNum * priceNum)) / totalQty;
      existingHolding.qty = totalQty;
      existingHolding.avg = newAvg;
      await existingHolding.save();
    } else {
      const newHolding = new HoldingsModel({
        userId: req.userId,
        name,
        qty: qtyNum,
        avg: priceNum,
        price: priceNum,
        net: "+0%",
        day: "+0%"
      });
      await newHolding.save();
    }
  }
  // Order save LAST
  const newOrder = new OrdersModel({
    userId: req.userId,
    name,
    qty: qtyNum,
    price: priceNum,
    mode,
  });
  await newOrder.save();
  res.json({
    success: true,
    message: "Order placed successfully"
  });
};

module.exports = { getAllOrders, createOrder };