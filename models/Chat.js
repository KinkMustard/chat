const mongoose = require("mongoose");

const { Schema } = mongoose;
const MessageSchema = require("./Message");

const chatSchema = new Schema({
  name: String,
  isGeneral: Boolean,
  messages: [MessageSchema],
  users: Array,
  typingUsers: Array,
  _id: String,
  id: String
});

mongoose.model("chats", chatSchema);
