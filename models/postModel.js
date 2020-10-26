const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    required: [true, "A post must have a content"],
    trim: true,
  },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
