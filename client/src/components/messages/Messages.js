import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import moment from "moment";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <div ref="container" className="thread-container">
        <div className="thread">
          {messages.map(mes => (
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
                  <p className="time">{moment().calendar(mes.time)}</p>
                </div>
                <div className="message">{mes.message}</div>
              </div>
            </div>
          ))}
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
