const express = require("express");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const chamaRouter = require("./routes/chama.route");
const commentRouter = require("./routes/comment.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectToDB } = require("./utils");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_PROD, process.env.FRONTEND_URL],
    credentials: true,
  })
);

connectToDB();

app.use("/api", userRouter);
app.use("/api/chama", chamaRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/blogs/comments", commentRouter);
app.get("/", (req, res) => {
  res.send("Mern blog api");
});

const PORT = 8000;

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(PORT, () => console.log("listening on port", PORT));

// module.exports.app = app;
