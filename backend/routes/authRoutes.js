const { Signup, Login, getUser, Logout } = require("../controllers/authController");
const router = require("express").Router();
const verifyUser = require("../middlewares/authMiddleware.js");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/me", verifyUser, getUser);
router.get("/logout", Logout);

module.exports = router;