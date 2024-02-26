const express = require("express");
const { verifyToken } = require("../utils");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post("/", verifyToken, createComment);

router.get("/:id", getComments);

router.delete("/:id", verifyToken, deleteComment);

module.exports = router;
