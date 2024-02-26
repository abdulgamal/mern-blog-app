const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils");
const {
  register,
  googleUp,
  googleIn,
  login,
  updateUser,
  logOut,
} = require("../controllers/user.controller");

router.post("/register", register);

router.post("/google-up", googleUp);

router.post("/google-in", googleIn);

router.post("/login", login);

router.put("/update", verifyToken, updateUser);

router.get("/logout", logOut);

module.exports = router;
