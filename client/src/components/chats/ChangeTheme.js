import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import PaletteIcon from "@material-ui/icons/Palette";
import Popover from "material-ui/Popover";
import SwipeableViews from "react-swipeable-views";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
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

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

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
    margin: theme.spacing.unit * 3,
    marginTop: -15
  },
  group: {
    // margin: `${theme.spacing.unit}px 0`,
    margin: 0
  }
});
class ChangeTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      popperOpen: false,
      clickAnchorEl: null,
      value: "dBlue",
      tabValue: 0
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

    let temp = event.target.value;
    this.props.changeTheme(
      Themes[temp.substring(1, temp.length)][event.target.name]
    );
  };

  handleChangeTab = (event, value) => {
    this.setState({ tabValue: value });
  };

  handleChangeTabIndex = index => {
    this.setState({ tabValue: index });
  };

  render() {
    const { classes, theme } = this.props;
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
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.tabValue}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Dark" className="dark-light-tabs" />
                <Tab label="Light" className="dark-light-tabs" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.tabValue}
              onChangeIndex={this.handleChangeTabIndex}
            >
              <TabContainer dir={theme.direction}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <RadioGroup
                    name="dark"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="dBlue"
                      control={<Radio color="primary" />}
                      label="Blue"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="dGreen"
                      control={<Radio color="primary" />}
                      label="Green"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="dPurple"
                      control={<Radio color="primary" />}
                      label="Purple"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="dOrange"
                      control={<Radio color="primary" />}
                      label="Orange"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="dTeal"
                      control={<Radio color="primary" />}
                      label="Teal"
                      className="form-label"
                    />
                  </RadioGroup>
                </FormControl>
              </TabContainer>
              <TabContainer dir={theme.direction}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <RadioGroup
                    name="light"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="lBlue"
                      control={<Radio color="primary" />}
                      label="Blue"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="lGreen"
                      control={<Radio color="primary" />}
                      label="Green"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="lPurple"
                      control={<Radio color="primary" />}
                      label="Purple"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="lOrange"
                      control={<Radio color="primary" />}
                      label="Orange"
                      className="form-label"
                    />
                    <FormControlLabel
                      value="lTeal"
                      control={<Radio color="primary" />}
                      label="Teal"
                      className="form-label"
                    />
                  </RadioGroup>
                </FormControl>
              </TabContainer>
            </SwipeableViews>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}
ChangeTheme.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ChangeTheme);
