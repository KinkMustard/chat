const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ChatType = require("./chat_type");
const MessageType = require("./message_type");
const Message = mongoose.model("messages");
const Chat = mongoose.model("chats");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    chats: {
      type: new GraphQLList(ChatType),
      resolve() {
        return Chat.find({});
      }
    },
    chat: {
      type: ChatType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Chat.findById(id);
      }
    },
    message: {
      type: MessageType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Message.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
