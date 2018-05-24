import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Divider from "material-ui/Divider";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import "./MessageInput.scss";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isTyping: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage();
    this.setState({ isTyping: false });
    this.stopCheckingTyping();
  };

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    this.props
      .mutate({
        variables: {
          message: this.state.message,
          chatId: this.props.chatId
        }
      })
      .then(() => {
        console.log("mutated succ");
        this.setState({ message: "" });
      });
  };

  componentWillUnmount() {
    this.setState({ isTyping: false });
    this.stopCheckingTyping();
  }

  sendTyping = () => {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTyping(true);
      this.startCheckingTyping();
    }
  };

  /*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
  startCheckingTyping = () => {
    this.typingInterval = setInterval(() => {
      if (Date.now() - this.lastUpdateTime > 300) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 300);
  };

  /*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
  stopCheckingTyping = () => {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
  };

  render() {
    const { message } = this.state;
    const { name, typingUsers, theme } = this.props;
    return (
      <React.Fragment>
        <div
          className="input-background"
          style={{ backgroundColor: theme.bodyColor, color: theme.fontColor }}
        >
          <hr style={{ color: theme.fontColor }} className="message-hr" />
          <div className="message-input">
            <form onSubmit={this.handleSubmit} className="message-form">
              <input
                id="message"
                type="text"
                className="form-control"
                value={message}
                autoComplete={"off"}
                placeholder={"Send a message to " + name}
                onKeyUp={e => {
                  e.keyCode !== 13 && this.sendTyping();
                }}
                onChange={({ target }) => {
                  this.setState({ message: target.value });
                }}
              />
              <IconButton
                disabled={message.length < 1}
                type="submit"
                className="send"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </form>
          </div>
        </div>
        <div
          className="typing-user-placeholder"
          style={{ backgroundColor: theme.bodyColor, color: theme.fontColor }}
        >
          {typingUsers.map(typingUser => (
            <div key={typingUser} className="typing-user">
              <Typography
                style={{ color: theme.fontColor }}
                className="typing-user-text"
              >{`${typingUser} is typing...`}</Typography>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mutation = gql`
  mutation AddMessageToChat($message: String, $chatId: ID) {
    addMessageToChat(message: $message, chatId: $chatId) {
      id
      messages {
        id
        message
      }
    }
  }
`;

MessageInput.propTypes = {
  theme: PropTypes.object.isRequired
};

export default graphql(mutation)(
  withStyles(null, { withTheme: true })(MessageInput)
);
