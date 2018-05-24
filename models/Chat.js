const mongoose = require("mongoose");

const { Schema } = mongoose;
const MessageSchema = require("./Message");

const chatSchema = new Schema({
  name: { type: String },
  description: { type: String },
  isGeneral: { type: Boolean },
  isPublic: { type: Boolean },
  isDM: { type: Boolean },
  messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
  users: { type: Array },
  typingUsers: { type: Array },
  _id: { type: String },
  id: { type: String },
  creator: { type: String }
});

chatSchema.statics.addMessage = function(chatId, content) {
  const Message = mongoose.model("messages");

  return this.findById(chatId).then(chat => {
    const message = new Message({ content, chat });
    chat.messages.push(message);
    return Promise.all([message.save(), chat.save()])
      .then(([message, chat]) => chat)
      .catch(error => {
        console.log("nice error", error);
      });
  });
};

chatSchema.statics.findMessages = function(id) {
  return this.findById(id)
    .populate("messages")
    .then(chat => chat.messages);
};

mongoose.model("chats", chatSchema);
