const User = require("../model/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt")

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = createSecretToken();
    
    const user = await User.create({
        username,
        email, 
        password: hashedPassword,
        token,
        createdAt 
    });

    return res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email"
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    const token = createSecretToken();
    user.token = token;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    console.log(err);

     return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User
      .findById(req.userId)
      .select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports.Logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token"
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    user.token = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};