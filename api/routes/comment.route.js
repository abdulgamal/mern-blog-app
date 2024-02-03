const express = require("express");
const { verifyToken } = require("../utils");
const Comment = require("../models/comment.model");
const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  const { blogId, comment } = req.body;
  let newObj = { userId: req.userId, blogId, comment };

  try {
    let newComment = await Comment.create(newObj);
    res.json(newComment);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let comments = await Comment.find({ blogId: id });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
