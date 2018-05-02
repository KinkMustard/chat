const uuidv4 = require("uuid/v4");

/*
*	createUser
*	Creates a user.
*	@prop id {string}
*	@prop name {string}
*	@param {object}
*		name {string}
*/
const createUser = ({ name = "", socketId = null, color = "" } = {}) => ({
  id: uuidv4(),
  name,
  socketId,
  color
});

/*
*	createMessage
*	Creates a messages object.
* 	@prop id {string}
* 	@prop time {Date} the time in 24hr format i.e. 14:22
* 	@prop message {string} actual string message
* 	@prop sender {string} sender of the message
*	@param {object}
*		message {string}
*		sender {string}
*/
const createMessage = ({ message = "", sender = "", color = "" } = {}) => ({
  id: uuidv4(),
  time: new Date(Date.now()),
  message,
  sender,
  color
});

/*
*	createChat
*	Creates a Chat object
* 	@prop id {string}
* 	@prop name {string}
* 	@prop messages {Array.Message}
* 	@prop users {Array.string}
*		@prop typingUsers {Array.string}
*		@prop isGeneral {boolean}
*	@param {object}
*		messages {Array.Message}
*		name {string}
*		users {Array.string}
*
*/
const createChat = ({
  messages = [],
  name = "General",
  users = [],
  isGeneral = false,
  isPublic = false,
  isDM = false,
  creator = "",
  description = ""
} = {}) => ({
  id: uuidv4(),
  name: isGeneral ? name : createChatNameFromUsers(users, creator),
  messages,
  users,
  typingUsers: [],
  isGeneral,
  creator,
  description,
  isPublic,
  isDM
});

/*
* createChatNameFromUsers
* @param users {Array.string}
* @param excludedUser {string} user to exclude from list of names
* @return {string} users names concatenated by a '&' or "Empty Chat" if no users
*/
const createChatNameFromUsers = (users, excludedUser = "") =>
  users.filter(u => u !== excludedUser).join(" and ") || "Empty Chat";

/*
*	@param date {Date}
*	@return a string represented in 24hr time i.e. '11:30', '19:30'
*/
const getTime = date =>
  `${date.getHours()}:${`0${date.getMinutes()}`.slice(-2)}`;

module.exports = {
  createMessage,
  createChat,
  createUser,
  createChatNameFromUsers
};
