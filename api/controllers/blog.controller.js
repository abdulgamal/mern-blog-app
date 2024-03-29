const Blog = require("../models/blog.model");

module.exports.createBlog = async (req, res, next) => {
  const { title, content, blog_image } = req.body;

  const newObj = {
    userId: req.userId,
    title,
    content,
    blog_image,
  };

  try {
    const newBlog = await Blog.create(newObj);
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
};

module.exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("userId", ["username", "profile_image"])
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

module.exports.getBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("userId", [
      "username",
      "profile_image",
    ]);
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

module.exports.updateBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (blog.userId.toString() !== req.userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to edit this blog" });
    }
    let newBlog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      upsert: true,
    });
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (blog.userId.toString() !== req.userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this blog" });
    }
    await Blog.findOneAndDelete({ _id: id });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};
