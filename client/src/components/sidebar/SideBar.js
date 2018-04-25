import React, { Component } from "react";
import FAChevronDown from "react-icons/lib/md/keyboard-arrow-down";
import FAMenu from "react-icons/lib/fa/list-ul";
import FASearch from "react-icons/lib/fa/search";
import MdEject from "react-icons/lib/md/eject";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import SwipeableViews from "react-swipeable-views";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Drawer from "material-ui/Drawer";
import Toolbar from "material-ui/Toolbar";
import Chip from "material-ui/Chip";
import List from "material-ui/List";
import IconButton from "material-ui/IconButton";
import Delete from "@material-ui/icons/Delete";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "material-ui/Avatar";
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData";
import SideBarOption from "./SideBarOption";
import { last, get, differenceBy } from "lodash";
import { createChatNameFromUsers } from "../../Factories";

const drawerWidth = 240;

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
  // card: {
  //   minWidth: 275
  // },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 50,
    height: 50
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: "#ccccc1"
  },
  menu: {
    width: 200
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

class SideBar extends Component {
  static type = {
    USERS: "users",
    CHATS: "chats"
  };

  constructor(props) {
    super(props);
    this.state = {
      reciever: "",
      activeSideBar: SideBar.type.CHATS,
      value: 0,
      mobileOpen: false
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(reciever);
    this.setState({ reciever: "" });
  };

  addChatForUser = reciever => {
    this.props.onSendPrivateMessage(reciever);
    this.setActiveSideBar(SideBar.type.CHATS);
  };

  setActiveSideBar = type => {
    this.setState({ activeSideBar: type });
  };

  render() {
    const { classes, theme } = this.props;
    const { chats, activeChat, user, setActiveChat, logout, users } = this.props;
    const { reciever, activeSideBar } = this.state;
    const drawer = (
      <Card id="side-bar">
        <CardContent>
          <div>
            <Card className="animeHeader">
              <div className={classes.details}>
                <CardContent>
                  <Typography variant="headline" className="grey">
                    Chats
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className="animeImg"
                image="http://i0.kym-cdn.com/photos/images/original/001/228/878/307.png"
              />
            </Card>
          </div>
        </CardContent>
        <form onSubmit={this.handleSubmit} className="search">
          <i className="search-icon">
            <FASearch />
          </i>
          <TextField
            label="Search"
            id="search"
            className={classes.textField}
            type="text"
            value={reciever}
            onChange={e => {
              this.setState({ reciever: e.target.value });
            }}
            margin="normal"
          />
        </form>
        <div className="side-bar-select">
          <AppBar position="static" color="default" className="animeAppBar">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
              className="animeAppBar"
            >
              <Tab label="Chats" className="animeTab" />
              <Tab label="Users" className="animeTab" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              {chats.map(chat => {
                return (
                  <SideBarOption
                    key={chat.id}
                    lastMessage={get(last(chat.messages), "message", "")}
                    name={
                      chat.isGeneral ? chat.name : createChatNameFromUsers(chat.users, user.name)
                    }
                    active={activeChat.id === chat.id}
                    onClick={() => {
                      this.props.setActiveChat(chat);
                    }}
                  />
                );
              })}
            </TabContainer>
            <TabContainer dir={theme.direction}>
              {differenceBy(users, [user], "name").map(user => {
                return (
                  <SideBarOption
                    key={user.id}
                    name={user.name}
                    onClick={() => {
                      this.addChatForUser(user.name);
                    }}
                  />
                );
              })}
            </TabContainer>
          </SwipeableViews>
        </div>
        <Card className="current-user">
          <CardContent>
            <Chip
              avatar={<Avatar>{user.name[0]}</Avatar>}
              label={user.name}
              className={classes.chip}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="raised"
              color="secondary"
              onClick={() => {
                logout();
              }}
              className="logout"
            >
              Logout
            </Button>
          </CardActions>
        </Card>
      </Card>
    );
    return (
      <React.Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.props.mobileOpen}
            onClose={this.props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SideBar);
