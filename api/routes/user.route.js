const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, generateRandomPassword } = require("../utils");

router.post("/register", async (req, res, next) => {
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
    res.cookie("access_token", token, { httpOnly: true }).json(others);
  } catch (error) {
    next(error);
  }
});

router.post("/google-up", async (req, res, next) => {
  const { username, email, profile_image } = req.body;
  let password = generateRandomPassword(username);
  let hashPwd = await bcrypt.hash(password, 10);
  let newObj = { username, password: hashPwd, profile_image, email };

  try {
    let newUser = await User.create(newObj);

    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      process.env.SECRET_JWT
    );

    const { password, ...others } = newUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).json(others);
  } catch (error) {
    next(error);
  }
});

router.post("/google-in", async (req, res, next) => {
  const { username } = req.body;
  try {
    const loggedUser = await User.findOne({ username });
    if (!loggedUser) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const token = jwt.sign(
      { userId: loggedUser._id, isAdmin: loggedUser.isAdmin },
      process.env.SECRET_JWT
    );

    const { password, ...others } = loggedUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).json(others);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password: pwd } = req.body;
  try {
    const loggedUser = await User.findOne({ username });
    if (!loggedUser) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const isSamePassword = await bcrypt.compare(pwd, loggedUser?.password);
    if (!isSamePassword) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { userId: loggedUser._id, isAdmin: loggedUser.isAdmin },
      process.env.SECRET_JWT
    );

    const { password, ...others } = loggedUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).json(others);
  } catch (error) {
    next(error);
  }
});

router.put("/update", verifyToken, async (req, res, next) => {
  const userId = req.userId;
  const { password: pwd, ...others } = req.body;

  try {
    if (pwd) {
      const hashPwd = await bcrypt.hash(pwd, 10);
      const results = await User.findByIdAndUpdate(
        userId,
        { password: hashPwd, ...others },
        { new: true }
      );

      const { password, ...rest } = results._doc;
      return res.json(rest);
    }

    const results = await User.findByIdAndUpdate(userId, others, { new: true });
    const { password, ...rest } = results._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "logout successfully" });
});

module.exports = router;
