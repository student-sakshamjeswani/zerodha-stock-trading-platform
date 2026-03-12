const User = require("../model/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({
      success: true,
      token,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({
        success: false,
        message: "Incorrect password"
      });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      token,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    console.log(err);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,       // JS se access nahi hoga → security
    secure: true,         // HTTPS required
    sameSite: "none",     // cross-site requests ke liye
    path: "/",            // cookie path clear karna
  });
  return res.status(200).json({ status: true, message: "Logged out successfully" });
};