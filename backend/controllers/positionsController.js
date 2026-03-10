const { PositionsModel } = require("../model/PositionsModel");

const getAllPositions = async (req, res) => {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
};

module.exports = {getAllPositions};