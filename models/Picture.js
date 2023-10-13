const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = {
  Picture,
  pictureSchema,
};
