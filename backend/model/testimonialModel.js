const mongoose = require("mongoose");
const { Schema } = mongoose;

const testimonialSchema = new Schema({
  title: String,
  subTitle: String,
  paragraph: String,
  isShowImage: Boolean,
  imageUrl: String,
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
