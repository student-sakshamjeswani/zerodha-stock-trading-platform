const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.token;

  console.log(token)

  if (!token) {
    return res.json({ status: false, message: "No token" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    }
    req.userId = data.id;
    next();
  });
};

module.exports = verifyUser;