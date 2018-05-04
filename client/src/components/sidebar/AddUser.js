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
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever: ""
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

  verifyName = ({ isChat }) => {
    const { name } = this.state;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(reciever);
    this.setState({ reciever: "" });
  };

  setError = error => {
    this.setState({ error });
  };

  resetFields = () => {
    this.setState({ reciever: "" });
    this.props.handleDialogClose();
  };

  render() {
    const { error, reciever } = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User to Chat</DialogTitle>
        <DialogContent>
          <form onSubmit={this.props.handleSubmit} className="search">
            <TextField
              label="User"
              id="reciever"
              type="text"
              name="reciever"
              value={reciever}
              onChange={e => {
                this.setState({ reciever: e.target.value });
              }}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.resetFields} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
        <div className="error">{error ? error : null}</div>
      </Dialog>
    );
  }
}

export default AddUser;
