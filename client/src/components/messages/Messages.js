import React from "react";
import Avatar from "material-ui/Avatar";
import moment from "moment";
import "simplebar";
import SimpleBar from "simplebar";
import "./Messages.scss";
import "../scrollbar.scss";
// import "../perfectScrollbar.scss";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    let scrollContainer = new SimpleBar(this.container.current);
    scrollContainer.getScrollElement().scrollTop = scrollContainer.getScrollElement().scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  displayMessage() {
    const { messages, user } = this.props;
    return messages.map((mes, index) => {
      let temp = index;
      if (index !== 0) {
        temp--;
      }

      if (messages[temp].sender === mes.sender && index !== 0) {
        return (
          <div
            key={mes.id}
            className={`message-container ${mes.sender === user.name &&
              "right"}`}
            style={{ color: mes.color }}
          >
            <div className="lonely-message">{mes.message}</div>
          </div>
        );
      }
      return (
        <div
          key={mes.id}
          className={`message-container ${mes.sender === user.name && "right"}`}
          style={{ color: mes.color }}
        >
          <Avatar style={{ backgroundColor: mes.color }} className="avatar">
            {mes.sender[0]}
          </Avatar>
          <div className="data">
            <div className="name">
              <p className="user-name">{mes.sender}</p>
              <p className="time">{moment(mes.time).fromNow()}</p>
            </div>
            <div className="message">{mes.message}</div>
          </div>
        </div>
      );
    });
  }
  render() {
    const { typingUsers } = this.props;
    return (
      <div
        ref={this.container}
        className="thread-container"
        data-simplebar="init"
      >
        <div className="thread">
          {this.displayMessage()}
          {typingUsers.map(name => (
            <div key={name} className="typing-user">
              {`${name} is typing . . .`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
