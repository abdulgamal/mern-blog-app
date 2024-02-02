const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, email, password, profile_image } = req.body;

  const hashPwd = await bcrypt.hash(password, 10);
  let newObj = { username, email, password: hashPwd, profile_image };

  try {
    const newUser = await User.create(newObj);
    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      process.env.SECRET_JWT
    );
    const { password, ...others } = newUser._doc;
    res.cookie("access_token", token).json(others);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password: pwd } = req.body;
  try {
    const loggedUser = await User.findOne({ username });
    if (!loggedUser) {
      return res.json({ message: "Wrong credentials" });
    }
    const isSamePassword = await bcrypt.compare(pwd, loggedUser?.password);
    if (!isSamePassword) {
      return res.json({ message: "Wrong credentials!" });
    }
    const token = jwt.sign(
      { userId: loggedUser._id, isAdmin: loggedUser.isAdmin },
      process.env.SECRET_JWT
    );
    const { password, ...others } = loggedUser._doc;
    res.cookie("access_token", token).json(others);
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
