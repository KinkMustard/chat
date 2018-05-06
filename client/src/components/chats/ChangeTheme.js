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
import "simplebar";
import SimpleBar from "simplebar";
import "../scrollbar.scss";
import Themes from "../../Themes";
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
    console.log(value);
    console.log(event.target);
  };

  handleChangeTabIndex = index => {
    this.setState({ tabValue: index });
  };

  renderThemes = affinity => {
    const { theme } = this.props;
    let newObject = Object.keys(Themes);
    return newObject.map(color => {
      const temp = color;
      const gemp = temp.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
        return str.toUpperCase();
      });
      const hemp = (
        <Typography style={{ color: theme.fontColor }}>{gemp}</Typography>
      );
      if (affinity === "dark") {
        return (
          <FormControlLabel
            value={"d" + color}
            control={<Radio color="primary" />}
            label={hemp}
            key={color}
            className="form-label"
          />
        );
      } else if (affinity === "light") {
        return (
          <FormControlLabel
            value={"l" + color}
            control={<Radio color="primary" />}
            label={hemp}
            key={color}
            className="form-label"
          />
        );
      } else {
        throw new Error("no affinity provided!");
      }
    });
  };
  checkTab = value => {
    const { theme } = this.props;
    if (value !== this.state.tabValue) {
      return {
        backgroundColor: theme.baseColor,
        color: theme.fontColor
      };
    } else {
      return;
    }
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
          style={{ color: theme.palette.primary.main, order: 3 }}
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
          <div className="hover-popover">
            <Typography>Change Theme</Typography>
          </div>
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
          <div
            className="change-theme-popover"
            style={{ backgroundColor: theme.baseColor, color: theme.fontColor }}
          >
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.tabValue}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
                style={{
                  backgroundColor: theme.baseColor,
                  color: theme.fontColor
                }}
              >
                <Tab
                  label="Dark"
                  className="dark-light-tabs"
                  textColor="primary"
                  style={this.checkTab(0)}
                />
                <Tab
                  label="Light"
                  className="dark-light-tabs"
                  textColor="primary"
                  style={this.checkTab(1)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.tabValue}
              onChangeIndex={this.handleChangeTabIndex}
              data-simplebar="init"
              style={{
                backgroundColor: theme.bodyColor,
                color: theme.fontColor
              }}
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
                    {this.renderThemes("dark")}
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
                    {this.renderThemes("light")}
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
