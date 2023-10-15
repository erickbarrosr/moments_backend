const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: String,
  text: String,
  momentId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Comment,
  commentSchema,
};
