const express = require("express");
const connectToDB = require("./utils");
const userRouter = require("./routes/user.route");
require("dotenv").config();

const app = express();
app.use(express.json());

connectToDB();

app.use("/api", userRouter);

app.listen(8000, () => console.log("listening on port", 8000));
