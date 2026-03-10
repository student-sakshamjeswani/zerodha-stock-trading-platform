const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: "No token" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    } else {
      req.userId = data.id;
      next();
    }
  });
};

module.exports = verifyUser;