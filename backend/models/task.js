const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: String,
  date: String,
  user: String,
});

module.exports = mongoose.model("Task", taskSchema);
