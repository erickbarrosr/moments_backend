const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;
