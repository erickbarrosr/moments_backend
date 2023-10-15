const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Picture",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;
