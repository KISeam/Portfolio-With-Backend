const mongoose = require("mongoose");
const { Schema } = mongoose;

const resumeSchema = new Schema({
  title: String,
  subtitle: String,
  heading: String,
  subheading: String,
  paragraph: String,
});

module.exports = mongoose.model("Resume", resumeSchema);
