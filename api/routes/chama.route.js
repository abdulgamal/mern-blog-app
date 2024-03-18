const express = require("express");
const chamaModel = require("../models/chama.model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, email, phone, password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    let newObj = { username, email, phone, password: hashedPwd };

    const result = await chamaModel.create(newObj);

    const { password, ...others } = result?._doc;

    res.json(others);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password: pwd } = req.body;
  try {
    const loggedUser = await chamaModel.findOne({ username });
    if (!loggedUser) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const isSamePassword = await bcrypt.compare(pwd, loggedUser?.password);
    if (!isSamePassword) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const { password, ...others } = loggedUser._doc;
    res.json(others);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await chamaModel.findByIdAndUpdate(
      req?.userId,
      req.body,
      {
        new: true,
        upsert: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await chamaModel.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
