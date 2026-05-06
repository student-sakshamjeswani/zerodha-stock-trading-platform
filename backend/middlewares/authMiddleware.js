const { User } = require("../model/userModel")

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token"
      });
    }
    const token = authHeader.split(" ")[1];
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = verifyUser;