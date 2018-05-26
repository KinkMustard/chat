const mongoose = require("mongoose");
const io = require("./index.js").io;

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  GENERAL_CHAT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE,
  NEW_CHAT_USER,
  GET_CHAT,
  CHAT_MOUNTED,
  CREATE_NEW_CHAT,
  VERIFY_NEW_CHAT,
  GET_CURRENT_CHATS
} = require("./client/src/Events");
require("./models/Chat");
require("./models/Message");

const {
  createUser,
  createMessage,
  createChat
} = require("./client/src/Factories");

const ChatModel = mongoose.model("chats");

let connectedUsers = {};
let currentChats = [];
const potentialColors = [
  "#FF3D00",
  "#FF9100",
  "#FFC400",
  "#FFEA00",
  "#C6FF00",
  "#76FF03",
  "#00E676",
  "#1DE9B6",
  "#00E5FF",
  "#00B0FF",
  "#2979FF",
  "#3D5AFE",
  "#651FFF",
  "#D500F9",
  "#F50057",
  "#ff1744"
];

const generalChat = createChat({ isGeneral: true });

module.exports = async socket => {
  // console.log('\x1bc'); //clears console
  console.log(`Socket Id:${socket.id}`);

  let sendMessageToChatFromUser;

  let currentGeneralChat = await ChatModel.findOne({ name: "General" });
  if (!currentGeneralChat) {
    const chat = new ChatModel({
      name: generalChat.name,
      isGeneral: generalChat.isGeneral,
      messages: generalChat.messages,
      users: generalChat.users,
      _id: generalChat.id,
      id: generalChat.id,
      typingUsers: generalChat.typingUsers,
      isPublic: false,
      isDM: false,
      creator: "general chat",
      description: "general chat"
    });
    await chat.save();
    console.log("new chat created");
    currentGeneralChat = chat;
  }
  let sendTypingFromUser;
  let currentPublicChats = await ChatModel.find({ isPublic: true });
  console.log("current public chats", currentGeneralChat);
  socket.on(VERIFY_USER, async (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      const chosenColor =
        potentialColors[Math.floor(Math.random() * potentialColors.length)];
      callback({
        isUser: false,
        user: createUser({
          name: nickname,
          socketId: socket.id,
          color: chosenColor
        })
      });
      // Gets any new changes that might have happened while the user was filling out name
      currentPublicChats = await ChatModel.find({ isPublic: true });
      currentGeneralChat = await ChatModel.findOne({ name: "General" });
    }
  });

  socket.on(VERIFY_NEW_CHAT, async (name, callback) => {
    const aspiringChat = await ChatModel.findOne({ name });
    if (aspiringChat) {
      callback({ isChat: true });
    } else {
      callback({ isChat: false });
    }
  });

  // User Connects with username
  socket.on(USER_CONNECTED, async user => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name, user.color);
    sendTypingFromUser = sendTypingToChat(user.name);

    await io.emit(USER_CONNECTED, connectedUsers);
    // console.log(connectedUsers);
  });

  // User disconnects
  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit(USER_DISCONNECTED, connectedUsers);
      // console.log("Disconnect", connectedUsers);
    }
  });

  // User logsout
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
    // console.log("Disconnect", connectedUsers);
  });

  // Get General Chat
  socket.on(GENERAL_CHAT, callback => {
    callback(currentGeneralChat);
  });

  socket.on(GET_CURRENT_CHATS, callback => {
    callback(currentPublicChats);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });

  socket.on(TYPING, ({ chatId, isTyping }) => {
    sendTypingFromUser(chatId, isTyping);
  });

  socket.on(CREATE_NEW_CHAT, async ({ creator, chatName, chatDescription }) => {
    console.log("created new chat", chatName);
    const newChat = createChat({
      name: chatName,
      isGeneral: true,
      creator,
      description: chatDescription,
      isPublic: true,
      isDM: false
    });
    currentChats = addChat(currentChats, newChat);
    console.log(newChat.description);
    // socket.emit(CREATE_NEW_CHAT, newChat);
    io.emit(CREATE_NEW_CHAT, newChat);
    const chat = new ChatModel({
      name: newChat.name,
      isGeneral: newChat.isGeneral,
      messages: newChat.messages,
      users: newChat.users,
      _id: newChat.id,
      id: newChat.id,
      typingUsers: newChat.typingUsers,
      creator: newChat.creator,
      description: newChat.description,
      isPublic: true,
      isDM: false
    });
    await chat.save();
    console.log("saved to database", newChat.name);
  });

  socket.on(PRIVATE_MESSAGE, ({ reciever, sender, activeChat }) => {
    if (reciever in connectedUsers) {
      const recieverSocket = connectedUsers[reciever].socketId;
      if (activeChat === null || activeChat.id === generalChat.id || true) {
        const newChat = createChat({
          name: `${reciever}`,
          users: [reciever, sender],
          creator: sender,
          isDM: true
        });
        socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat);
        socket.emit(PRIVATE_MESSAGE, newChat);
      } else {
        if (!(reciever in activeChat.users)) {
          activeChat.users
            .filter(user => user in connectedUsers)
            .map(user => connectedUsers[user])
            .map(user => {
              socket.to(user.socketId).emit(NEW_CHAT_USER, {
                chatId: activeChat.id,
                newUser: reciever
              });
            });
          socket.emit(NEW_CHAT_USER, {
            chatId: activeChat.id,
            newUser: reciever
          });
        }
        socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat);
      }
    }
  });
};
/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { user, isTyping });
  };
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendMessageToChat(sender, color) {
  return async (chatId, message) => {
    ChatModel.addMessage(chatId, message, color, sender);
    const newMessage = createMessage({ message, sender, color });
    io.emit(`${MESSAGE_RECIEVED}-${chatId}`, newMessage);
    const temp = await ChatModel.findById(chatId);
    temp.messages.push(newMessage);
  };
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user) {
  const newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function addChat(chatList, chat) {
  const newList = Object.assign({}, chatList);
  newList[chat] = chat;
  return newList;
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username) {
  const newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username) {
  return username in userList;
}

function isChat(chatList, name) {
  return { name } in chatList;
}
