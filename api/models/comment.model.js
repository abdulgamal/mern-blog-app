const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likes: [String],
  numOfLikes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
