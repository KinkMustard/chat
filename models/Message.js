const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  color: String,
  id: String,
  message: String,
  sender: String,
  time: Date
});

mongoose.model("messages", messageSchema);
