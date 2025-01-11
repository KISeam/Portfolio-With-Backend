const mongoose = require("mongoose");
const { Schema } = mongoose;

const footerSchema = new Schema({
  image: String,
  paragraph: String,
  email: String,
  location: String,
  phoneNumber: String,
});

module.exports = mongoose.model("Footer", footerSchema);
