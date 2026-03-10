const { HoldingsModel } = require("../model/HoldingsModel");

const getAllHoldings = async (req, res) => {
    const userId = req.userId;
    const allHoldings = await HoldingsModel.find({userId});
    res.json(allHoldings);
};

module.exports = {getAllHoldings};