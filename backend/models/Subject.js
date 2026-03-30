const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: String,
  done: Boolean,
});

const subjectSchema = new mongoose.Schema({
  name: String,
  topics: [topicSchema],
});

module.exports = mongoose.model("Subject", subjectSchema);
