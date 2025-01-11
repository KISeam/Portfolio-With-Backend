const mongoose = require("mongoose");
const { Schema } = mongoose;

const AboutSchema = new Schema({
  subheading: String,
  radiobutton: Boolean,
  heading: String,
  paragraph: String,
  buttonText: String,
  buttonShow: Boolean,
  image: String,
  iconBox: Boolean,
  iconHeading: String,
  iconSubheading: String,
  iconButtonText: String,
});

module.exports = mongoose.model("About", AboutSchema);
