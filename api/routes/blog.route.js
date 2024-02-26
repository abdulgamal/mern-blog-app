const express = require("express");
const { verifyToken } = require("../utils");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const router = express.Router();

router.post("/", verifyToken, createBlog);

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.put("/:id", verifyToken, updateBlog);

router.delete("/:id", verifyToken, deleteBlog);

module.exports = router;
