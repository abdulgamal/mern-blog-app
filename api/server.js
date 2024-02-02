const express = require("express");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./utils");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connectToDB();

app.use("/api", userRouter);
app.use("/api/blogs", blogRouter);

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(8000, () => console.log("listening on port", 8000));
