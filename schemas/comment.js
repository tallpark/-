const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
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
  },
  password: {
    type: String,
    require: true,
  }
});
commentSchema.set('timestamps', true);

module.exports = mongoose.model("Comment", commentSchema);