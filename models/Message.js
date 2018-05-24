const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "chat"
  },
  color: { type: String },
  id: { type: String },
  message: { type: String },
  sender: { type: String },
  time: { type: Date }
});

mongoose.model("messages", messageSchema);
