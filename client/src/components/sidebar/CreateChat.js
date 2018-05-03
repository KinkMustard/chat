import React from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { InputAdornment } from "material-ui/Input";
import LabelIcon from "@material-ui/icons/LabelOutline";
import { FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";

import { VERIFY_NEW_CHAT } from "../../Events";
class CreateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      private: false,
      name: "",
      secretCode: "",
      error: "",
      description: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  verifyChat = ({ isChat }) => {
    const { name } = this.state;
    if (isChat) {
      this.setError("Chat name taken");
    } else if (name === "") {
      this.setError("Name can not be empty");
    } else if (name === "General") {
      this.setError("Name can not be General");
    } else {
      this.setError("");
      this.props.createNewChat(this.state.name, this.state.description);
      this.resetFields();
    }
  };

  handleSubmit = () => {
    const { socket } = this.props;
    const { name } = this.state;
    socket.emit(VERIFY_NEW_CHAT, name, this.verifyChat);
  };

  setError = error => {
    this.setState({ error });
  };

  resetFields = () => {
    this.setState({ private: false, name: "", secretCode: "", error: "" });
    this.props.handleDialogClose();
  };

  render() {
    const { error } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Chat</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="description"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelIcon />
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="private"
                  checked={this.state.private}
                  onChange={this.handleInputChange}
                  value="private"
                  color="primary"
                  type="checkbox"
                />
              }
              label="Private"
            />
          </form>
          <DialogContentText>
            Setting a chat to private makes it only accessible through a secret
            code
          </DialogContentText>
          {this.state.private ? (
            <TextField
              margin="dense"
              id="name"
              label="Secret Code"
              type="name"
              name="secretCode"
              value={this.state.secretCode}
              onChange={this.handleInputChange}
              fullWidth
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.resetFields} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
        <div className="error">{error ? error : null}</div>
      </Dialog>
    );
  }
}

export default CreateChat;
