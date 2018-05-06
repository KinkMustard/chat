import React from "react";
import Typography from "material-ui/Typography";
import { values, difference, differenceBy } from "lodash";
import PropTypes from "prop-types";
import { withTheme } from "material-ui/styles";

import SideBar from "../sidebar/SideBar";
import {
  GENERAL_CHAT,
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  TYPING,
  PRIVATE_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  NEW_CHAT_USER,
  CREATE_NEW_CHAT,
  GET_CURRENT_CHATS
} from "../../Events";
import ChatHeading from "./ChatHeading";
import Messages from "../messages/Messages";
import MessageInput from "../messages/MessageInput";
import UsersDrawer from "../sidebar/UsersDrawer";

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      unreadChats: [],
      users: [],
      activeChat: null,
      mobileOpen: false,
      mobileUsersOpen: false,
      value: 0
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(PRIVATE_MESSAGE);
    socket.off(USER_CONNECTED);
    socket.off(USER_DISCONNECTED);
    socket.off(NEW_CHAT_USER);
  }

  initSocket(socket) {
    socket.emit(GENERAL_CHAT, this.resetChat);
    socket.emit(GET_CURRENT_CHATS, this.addCurrentChats);
    socket.on(PRIVATE_MESSAGE, this.addChat);
    socket.on(CREATE_NEW_CHAT, this.addChat);
    socket.on("connect", () => {
      socket.emit(GENERAL_CHAT, this.resetChat);
    });
    socket.on(USER_CONNECTED, users => {
      this.setState({ users: values(users) });
    });
    socket.on(USER_DISCONNECTED, users => {
      const removedUsers = differenceBy(this.state.users, values(users), "id");
      this.removeUsersFromChat(removedUsers);
      this.setState({ users: values(users) });
    });
    socket.on(NEW_CHAT_USER, this.addUserToChat);
  }

  addCurrentChats = currentChats => {
    currentChats.forEach(chat => {
      this.addChat(chat, false);
    });
  };
  createNewChat = (name, description) => {
    const { socket, user } = this.props;
    socket.emit(CREATE_NEW_CHAT, {
      creator: user.name,
      chatName: name,
      chatDescription: description
    });
  };

  sendOpenPrivateMessage = reciever => {
    const { socket, user } = this.props;
    const { activeChat } = this.state;
    socket.emit(PRIVATE_MESSAGE, { reciever, sender: user.name, activeChat });
  };
  addUserToChat = ({ chatId, newUser }) => {
    const { chats } = this.state;
    const newChats = chats.map(chat => {
      if (chat.id === chatId) {
        return Object.assign({}, chat, { users: [...chat.users, newUser] });
      }
      return chat;
    });
    this.setState({ chats: newChats });
  };
  removeUsersFromChat = removedUsers => {
    const { chats } = this.state;
    const newChats = chats.map(chat => {
      let newUsers = difference(chat.users, removedUsers.map(u => u.name));
      return Object.assign({}, chat, { users: newUsers });
    });
    this.setState({ chats: newChats });
  };

  /*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
  resetChat = chat => {
    return this.addChat(chat, true);
  };

  /*
	*	Adds chat to the chat container, if reset is true removes all chats
	*	and sets that chat to the main chat.
	*	Sets the message and typing socket events for the chat.
	*	
	*	@param chat {Chat} the chat to be added.
	*	@param reset {boolean} if true will set the chat as the only chat.
	*/
  addChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({
      chats: newChats,
      activeChat: reset ? chat : this.state.activeChat
    });

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(typingEvent, this.updateTypingInChat(chat.id));
    socket.on(messageEvent, this.addMessageToChat(chat.id));
    console.log("creator", chat.creator);
    console.log("user", this.props.user.name);
    if (chat.creator === this.props.user.name) {
      console.log("user created chat");
      this.setState({ activeChat: chat });
    }
  };

  /*
	* 	Returns a function that will 
	*	adds message to chat with the chatId passed in. 
	*
	* 	@param chatId {number}
	*/
  addMessageToChat = chatId => {
    return message => {
      const { chats, unreadChats, activeChat } = this.state;
      const tempObj = Object.assign({}, unreadChats);
      if (tempObj[chatId]) {
        tempObj[chatId]++;
      } else {
        tempObj[chatId] = 1;
      }
      let newChats = chats.map(chat => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });
      this.setState({ chats: newChats });
      if (chatId !== activeChat.id) {
        this.setState({ unreadChats: Object.assign({}, tempObj) });
      }
    };
  };

  /*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
  updateTypingInChat = chatId => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;

        let newChats = chats.map(chat => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  };

  /*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, message });
  };

  /*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  };

  setActiveChat = activeChat => {
    this.setState({ activeChat });
  };

  clearUnreadMessages = chat => {
    const { unreadChats } = this.state;
    let tempObj = Object.assign({}, unreadChats);
    tempObj[chat.id] = 0;
    this.setState({ unreadChats: Object.assign({}, tempObj) });
    console.log("messages cleared");
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleUserDrawerToggle = () => {
    this.setState({ mobileUsersOpen: !this.state.mobileUsersOpen });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  changeTabs = tabToGoTo => {
    this.setState({ value: tabToGoTo });
  };
  render() {
    const { user, logout, theme } = this.props;
    const { chats, activeChat, users, unreadChats } = this.state;
    return (
      <div className="container">
        <SideBar
          logout={logout}
          chats={chats}
          unreadChats={unreadChats}
          user={user}
          users={users}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          clearUnreadMessages={this.clearUnreadMessages}
          onSendPrivateMessage={this.sendOpenPrivateMessage}
          mobileOpen={this.state.mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
          createNewChat={this.createNewChat}
          socket={this.props.socket}
          value={this.state.value}
          handleChange={this.handleChange}
          handleChangeIndex={this.handleChangeIndex}
          changeTabs={this.changeTabs}
          style={{ backgroundColor: theme.baseColor }}
        />

        <div className="chat-room-container">
          {activeChat !== null ? (
            <div className="chat-room">
              <ChatHeading
                name={activeChat.name}
                handleDrawerToggle={this.handleDrawerToggle}
                handleUserDrawerToggle={this.handleUserDrawerToggle}
                className="chat-heading"
                changeTheme={this.props.changeTheme}
              />
              <Messages
                messages={activeChat.messages}
                user={user}
                typingUsers={activeChat.typingUsers}
              />
              <MessageInput
                sendMessage={message => {
                  this.sendMessage(activeChat.id, message);
                }}
                sendTyping={isTyping => {
                  this.sendTyping(activeChat.id, isTyping);
                }}
                name={activeChat.name}
                style={{ backgroundColor: theme.baseColor }}
                user={user}
                typingUsers={activeChat.typingUsers}
              />
            </div>
          ) : (
            <div
              className="chat-room choose"
              style={{ backgroundColor: theme.baseColor }}
            >
              <Typography>Loading Chats</Typography>
            </div>
          )}
        </div>
        <UsersDrawer
          mobileOpen={this.state.mobileUsersOpen}
          handleDrawerToggle={this.handleUserDrawerToggle}
          logout={logout}
          chats={chats}
          user={user}
          users={users}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          onSendPrivateMessage={this.sendOpenPrivateMessage}
          createNewChat={this.createNewChat}
          socket={this.props.socket}
          changeTabs={this.changeTabs}
          style={{ backgroundColor: theme.baseColor }}
        />
      </div>
    );
  }
}
ChatContainer.propTypes = {
  theme: PropTypes.object.isRequired
};
export default withTheme()(ChatContainer);
