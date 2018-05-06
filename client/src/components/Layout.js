import React from "react";
import io from "socket.io-client";
import { withTheme } from "material-ui/styles";
import PropTypes from "prop-types";
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from "../Events";
import LoginForm from "./LoginForm";
import ChatContainer from "./chats/ChatContainer";

const socketUrl =
  process.env.NODE_ENV === "development" ? "http://192.168.1.97:5000" : "/";
class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  /*
	*	Connect to and initializes the socket.
	*/
  initSocket = () => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      if (this.state.user) {
        this.reconnect(socket);
      } else {
        console.log("connected");
      }
    });

    this.setState({ socket });
  };

  /*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };
  /**
   * Reverifies user with socket and then resets user.
   */
  reconnect = socket => {
    socket.emit(VERIFY_USER, this.state.user.name, ({ isUser, user }) => {
      if (isUser) {
        this.setState({ user: null });
      } else {
        this.setUser(user);
      }
    });
  };

  /*
	*	Sets the user property in state to null.
	*/
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { socket, user } = this.state;
    const { theme } = this.props;
    return (
      <div className="container">
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <ChatContainer
            socket={socket}
            user={user}
            logout={this.logout}
            changeTheme={this.props.changeTheme}
            style={{ backgroundColor: theme.baseColor }}
          />
        )}
      </div>
    );
  }
}

Layout.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme()(Layout);
