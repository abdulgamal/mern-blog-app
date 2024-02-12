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
    let comments = await Comment.find({ blogId: id }).populate("userId", [
      "username",
      "profile_image",
    ]);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    let comment = await Comment.findOne({ _id: id });
    console.log(comment);
    if (comment.userId.toString() !== req.userId) {
      return res.json({
        message: "You are not allowed to delete this comment",
      });
    }
    await Comment.findByIdAndDelete({ _id: id });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
