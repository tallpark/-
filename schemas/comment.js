const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("comment", commentSchema);