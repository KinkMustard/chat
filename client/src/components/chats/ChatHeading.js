import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from "@material-ui/icons/Group";
import ChangeTheme from "./ChangeTheme";

import "./ChatHeading.scss";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class ChatHeading extends React.Component {
  render() {
    console.log(drawerWidth);
    const {
      classes,
      name,
      numberOfUsers,
      handleDrawerToggle,
      handleUserDrawerToggle,
      theme
    } = this.props;
    return (
      <React.Fragment>
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar
              className="app-bar"
              style={{ backgroundColor: theme.baseColor }}
            >
              <div className="menu-icon">
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  className={classes.navIconHide}
                  ref={this.menuElement}
                  style={{ color: theme.fontColor }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <Typography
                variant="title"
                noWrap
                className="chat-name"
                style={{ color: theme.fontColor }}
              >
                {name}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                {numberOfUsers || null}
              </Typography>
              <ChangeTheme changeTheme={this.props.changeTheme} />
              <div className="group-icon">
                <IconButton
                  aria-label="open drawer"
                  onClick={handleUserDrawerToggle}
                  className={classes.navIconHide}
                  ref={this.menuElement}
                  style={{ color: theme.fontColor }}
                >
                  <GroupIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        {/* <div className="chat-header">
          <div className="user-info">
            <div className="user-name">{name}</div>
            <div className="status">
              <div className="indicator" />
              <span>{numberOfUsers || null}</span>
            </div>
          </div>
          <div className="options">
            <FAVideo />
            <FAUserPlus />
            <MdEllipsisMenu />
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

ChatHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ChatHeading);
