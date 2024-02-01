const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, profile_image } = req.body;
  let newObj = { username, email, password, profile_image };

  try {
    const newUser = await User.create(newObj);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

module.exports = router;
