import React from "react";
import FAVideo from "react-icons/lib/fa/video-camera";
import FAUserPlus from "react-icons/lib/fa/user-plus";
import MdEllipsisMenu from "react-icons/lib/md/keyboard-control";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List from "material-ui/List";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";

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
    const {
      classes, theme, name, numberOfUsers, handleDrawerToggle
    } = this.props;
    const nice = classNames({ "ChatHeading-appBar-203": true, "app-bar": true });
    return (
      <React.Fragment>
        <div>
          <AppBar className={nice}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={classes.navIconHide}
                ref={this.menuElement}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {name}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                {numberOfUsers || null}
              </Typography>
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
