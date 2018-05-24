const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const MessageType = require("./message_type");
const Chat = mongoose.model("chats");

const ChatType = new GraphQLObjectType({
  name: "ChatType",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    isGeneral: { type: GraphQLBoolean },
    isPublic: { type: GraphQLBoolean },
    isDM: { type: GraphQLBoolean },
    users: { type: new GraphQLList(MessageType) },
    typingUsers: { type: new GraphQLList(MessageType) },
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    creator: { type: GraphQLString },
    messages: { type: new GraphQLList(MessageType) }
  })
});

module.exports = ChatType;
