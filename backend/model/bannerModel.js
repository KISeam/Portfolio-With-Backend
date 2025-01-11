const mongoose = require("mongoose");
const { Schema } = mongoose;

const BannerSchema = new Schema({
  subheading: String,
  radiobutton: Boolean,
  heading: String,
  paragraph: String,
  buttonText: String,
  buttonShow: Boolean,
  image: String,
});

module.exports = mongoose.model("Banner", BannerSchema);
