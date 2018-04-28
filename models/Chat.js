const mongoose = require("mongoose");

const { Schema } = mongoose;
const MessageSchema = require("./Message");

const chatSchema = new Schema({
  name: String,
  description: String,
  isGeneral: Boolean,
  isPublic: Boolean,
  isDM: Boolean,
  messages: [MessageSchema],
  users: Array,
  typingUsers: Array,
  _id: String,
  id: String,
  creator: String
});

mongoose.model("chats", chatSchema);
