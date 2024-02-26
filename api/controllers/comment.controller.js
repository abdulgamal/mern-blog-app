const Comment = require("../models/comment.model");

module.exports.createComment = async (req, res, next) => {
  const { blogId, comment } = req.body;
  let newObj = { userId: req.userId, blogId, comment };

  try {
    let newComment = await Comment.create(newObj);
    res.json(newComment);
  } catch (error) {
    next(error);
  }
};

module.exports.getComments = async (req, res, next) => {
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
};

module.exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    let comment = await Comment.findOne({ _id: id });
    if (comment.userId.toString() !== req.userId) {
      return res.status(401).json({
        message: "You are not allowed to delete this comment",
      });
    }
    await Comment.findByIdAndDelete({ _id: id });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
