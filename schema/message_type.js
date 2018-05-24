const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Message = mongoose.model("messages");

const MessageType = new GraphQLObjectType({
  name: "MessageType",
  fields: () => ({
    color: { type: GraphQLString },
    id: { type: GraphQLString },
    message: { type: GraphQLString },
    sender: { type: GraphQLString },
    time: { type: GraphQLString },
    chat: {
      type: require("./chat_type"),
      resolve(parentValue) {
        return Message.findById(parentValue)
          .populate("chats")
          .then(message => {
            return message.chat;
          });
      }
    }
  })
});

module.exports = MessageType;
