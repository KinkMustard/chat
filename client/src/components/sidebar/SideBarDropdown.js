import React, { Component } from "react";
import DownIcon from "@material-ui/icons/ExpandMore";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import anime from "animejs";
import Popover from "material-ui/Popover";
import "./SideBarDropdown.scss";
import * as Colors from "../../Colors";

let nice;
let onBegan = false;
let offBegan = false;
let completed = true;

const styles = () => ({
  drawerPaper: {
    background: "none"
  }
});
class SideBarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  On() {
    if (onBegan === false && completed === true) {
      onBegan = true;
      nice = anime({
        targets: ".down-icon",
        color: [
          { value: Colors.GreyFont },
          { value: Colors.Red },
          { value: Colors.Orange },
          { value: Colors.Green },
          { value: Colors.Blue },
          { value: Colors.GreyFont }
        ],
        easing: "easeInOutQuad",
        rotate: "+=3.5turn",
        scale: 1.6,
        duration: 500,
        complete() {
          completed = false;
          onBegan = false;
        }
      });
    }
  }

  Off() {
    if (offBegan === false && completed === false) {
      offBegan = true;
      nice = anime({
        targets: ".down-icon",
        color: [
          { value: Colors.GreyFont },
          { value: Colors.Red },
          { value: Colors.Orange },
          { value: Colors.Green },
          { value: Colors.Blue },
          { value: Colors.GreyFont }
        ],
        easing: "linear",
        rotate: "-=3.5turn",
        scale: 1.2,
        duration: 500,
        complete() {
          completed = true;
          offBegan = false;
        }
      });
    }
  }

  ToggleOn = event => {
    if (completed === true) {
      this.setState({
        anchorEl: event.currentTarget
      });
      this.On();
    }
  };

  ToggleOff = () => {
    if (completed === false) {
      this.setState({
        anchorEl: null
      });
      this.Off();
    }
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <Button
          className="title-header"
          color="secondary"
          onClick={this.ToggleOn}
        >
          <Typography variant="headline" className="header-text">
            Chats
          </Typography>
          <DownIcon className="down-icon" />
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.ToggleOff}
          classes={{
            paper: classes.drawerPaper
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div className="popover-base">
            {/* <Typography className="popover-text">
                The content of the Popover.
              </Typography> */}
            <Button
              variant="raised"
              color="secondary"
              className="create-chat-button"
              onClick={this.props.handleDialogOpen}
            >
              Create New Chat
            </Button>
            <Button
              variant="raised"
              color="secondary"
              className="create-chat-button"
            >
              Add Another User To Chat
            </Button>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

SideBarDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(SideBarDropdown);
