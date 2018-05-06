import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import PaletteIcon from "@material-ui/icons/Palette";
import Popover from "material-ui/Popover";
import Typography from "material-ui/Typography";
import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import * as Themes from "../../Themes";
import "./ChangeTheme.scss";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit
  },
  popover: {
    pointerEvents: "none"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});
class ChangeTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      popperOpen: false,
      clickAnchorEl: null,
      value: ""
    };
  }
  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClick = event => {
    this.setState({
      clickAnchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      clickAnchorEl: null
    });
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.changeTheme(Themes[event.target.label][event.target.name]);
  };
  render() {
    const { classes } = this.props;
    const { anchorEl, clickAnchorEl } = this.state;
    return (
      <React.Fragment>
        <IconButton
          onMouseOver={this.handlePopoverOpen}
          onMouseOut={this.handlePopoverClose}
          className={classes.button}
          onClick={this.handleClick}
        >
          <PaletteIcon />
        </IconButton>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Change Theme</Typography>
        </Popover>
        <Popover
          open={Boolean(clickAnchorEl)}
          anchorEl={clickAnchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div className="change-theme-popover">
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Theme</FormLabel>
              <RadioGroup
                name="theme"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="BlueDark"
                  control={<Radio />}
                  label="Blue"
                  name="dark"
                />
                <FormControlLabel
                  value="BlueLight"
                  control={<Radio />}
                  label="Blue"
                  name="light"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}
ChangeTheme.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangeTheme);
