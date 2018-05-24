const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const mongoose = require("mongoose");
const Chat = mongoose.model("chats");
const Messages = mongoose.model("messages");
const ChatType = require("./chat_type");
const MessageType = require("./message_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addChat: {
      type: ChatType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        isGeneral: { type: GraphQLBoolean },
        isPublic: { type: GraphQLBoolean },
        isDM: { type: GraphQLBoolean },
        creator: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return new Chat({
          name,
          description,
          isGeneral,
          isPublic,
          isDM,
          creator
        }).save();
      }
    },
    addMessageToChat: {
      type: ChatType,
      args: {
        message: { type: GraphQLString },
        ChatId: { type: GraphQLID }
      },
      resolve(parentValue, { content, chatId }) {
        return Chat.addMessage(chatId, content);
      }
    },
    deleteChat: {
      type: ChatType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Chat.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
