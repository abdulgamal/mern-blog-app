import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const loginFn = async (values) => {
  const response = await axios.post("/login", values, {
    withCredentials: true,
  });
  return response;
};

export const registerFn = async (values) => {
  const response = await axios.post("/register", values, {
    withCredentials: true,
  });
  return response;
};

export const createBlogFn = async (values) => {
  const response = await axios.post("/blogs", values, {
    withCredentials: true,
  });
  response;
  return response;
};

export const fetchBlogs = async () => {
  return await axios.get("/blogs");
};

export const fetchBlog = async (id) => {
  return await axios.get("/blogs/" + id);
};

export const createComment = async (comment) => {
  return await axios.post("/blogs/comments", comment, {
    withCredentials: true,
  });
};

export const fetchBlogComments = async (id) => {
  return await axios.get("/blogs/comments/" + id);
};

export const deleteBlogComment = async (id) => {
  return await axios.delete("/blogs/comments/" + id, { withCredentials: true });
};

export const deleteBlogData = async (id) => {
  return await axios.delete("/blogs/" + id, { withCredentials: true });
};

export const updateBlogData = async (id, values) => {
  return await axios.put("/blogs/" + id, values, { withCredentials: true });
};

export const logOutUser = async () => {
  return await axios.get("/logout", { withCredentials: true });
};
