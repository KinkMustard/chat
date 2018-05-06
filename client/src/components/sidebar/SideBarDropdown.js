import React, { Component } from "react";
import DownIcon from "@material-ui/icons/ExpandMore";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import anime from "animejs";
import Popover from "material-ui/Popover";
import IconButton from "material-ui/IconButton";
import "./SideBarDropdown.scss";
import * as Colors from "../../Colors";
const accent = Colors.Blue;

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
        targets: ".down-icon-base",
        easing: "easeInOutQuad",
        rotate: "+=3.5turn",
        scale: 1.7,
        duration: 400,
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
        targets: ".down-icon-base",
        easing: "linear",
        rotate: "-=3.5turn",
        scale: 1.3,
        duration: 400,
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
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <div style={{ backgroundColor: theme.palette.primary.main }}>
          <Button
            className="title-header"
            color="primary"
            onClick={this.ToggleOn}
          >
            <Typography
              variant="headline"
              className="header-text"
              style={{ color: theme.fontColor }}
            >
              Chats
            </Typography>
            <IconButton
              style={{ color: theme.fontColor }}
              className="down-icon"
            >
              <DownIcon className="down-icon-base" />
            </IconButton>
          </Button>
        </div>
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
          <div
            className="popover-base"
            style={{ backgroundColor: theme.bodyColor, color: theme.fontColor }}
          >
            {/* <Typography className="popover-text">
                The content of the Popover.
              </Typography> */}
            <Button
              variant="raised"
              color="primary"
              className="create-chat-button"
              onClick={this.props.handleDialogOpen}
            >
              Create New Chat
            </Button>
            <Button
              variant="raised"
              color="primary"
              className="create-chat-button"
              onClick={this.props.handleAddUserDialogOpen}
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
