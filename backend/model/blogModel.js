const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  subTitle: String,
  isShowImage: Boolean,
  imageUrl: String,
});

module.exports = mongoose.model("Blog", blogSchema);
