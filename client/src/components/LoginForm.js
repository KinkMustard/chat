import React from "react";
import { VERIFY_USER } from "../Events";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: ""
    };
  }

  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  setError = error => {
    this.setState({ error });
  };

  render() {
    const { classes } = this.props;
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Welcome
            </Typography>
            <Typography component="p">
              What should everyone call you?
            </Typography>
            <form
              onSubmit={this.handleSubmit}
              className="login-form"
              autoComplete="off"
            >
              <TextField
                label="Name"
                id="nickname"
                className={classes.textField}
                value={nickname}
                onChange={this.handleChange}
                margin="normal"
              />
              <div className="error">{error ? error : null}</div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
