const mongoose = require("mongoose");
const { pictureSchema } = require("./Picture");

const momentSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: {
    type: [pictureSchema],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;
