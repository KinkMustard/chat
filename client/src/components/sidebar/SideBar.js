import React, { Component } from "react";
import FASearch from "react-icons/lib/fa/search";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import SwipeableViews from "react-swipeable-views";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import TextField from "material-ui/TextField";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Drawer from "material-ui/Drawer";
import Chip from "material-ui/Chip";
import Hidden from "material-ui/Hidden";
import { createMuiTheme } from "material-ui/styles";
import Badge from "material-ui/Badge";
import Avatar from "material-ui/Avatar";
import SideBarOption from "./SideBarOption";
import { last, get } from "lodash";
import { createChatNameFromUsers } from "../../Factories";
import CreateChat from "./CreateChat";
import "./SideBar.scss";
import "simplebar";
import SimpleBar from "simplebar";
import "../scrollbar.scss";
import * as Colors from "../../Colors";
import SideBarDropDown from "./SideBarDropdown";
import AddUser from "./AddUser";

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
  root: {
    width: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column"
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
    },
    border: Colors.Black
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  badge: {
    // margin: theme.spacing.unit * 2
  },
  panelContainer: {}
});

let gemp = 0;
let hemp = 0;
class SideBar extends Component {
  static type = {
    USERS: "users",
    CHATS: "chats"
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSideBar: SideBar.type.CHATS,
      mobileOpen: false,
      expanded: null,
      open: false,
      publicSum: 0,
      privateSum: 0,
      addUserOpen: false
    };

    this.chatContainer = React.createRef();
  }

  scrollDown() {
    let scrollContainer = new SimpleBar(this.chatContainer.current);
    scrollContainer.getScrollElement().scrollTop = scrollContainer.getScrollElement().scrollHeight;
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  addChatForUser = reciever => {
    this.props.onSendPrivateMessage(reciever);
    this.setActiveSideBar(SideBar.type.CHATS);
  };

  setActiveSideBar = type => {
    this.setState({ activeSideBar: type });
  };

  handleChangePanel = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  handleAddUserDialogOpen = () => {
    this.setState({ addUserOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };
  handleAddUserDialogClose = () => {
    this.setState({ addUserOpen: false });
  };

  resetExpandedPanel = () => {
    this.setState({ expanded: null });
  };

  sum = obj => {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  };

  renderPublicChats = () => {
    const { classes } = this.props;
    const { chats, activeChat, user, unreadChats } = this.props;

    return chats.filter(chat => chat.isDM === false).map(chat => {
      // if (unreadChats[chat.id]) {
      //   // let temp = this.state.publicSum;
      //   let temp = gemp;
      //   temp += unreadChats[chat.id];
      //   gemp = temp;
      //   // this.setState({ publicSum: temp });
      // }
      return (
        <div className={classes.panelContainer} key={chat.id}>
          {unreadChats[chat.id] ? (
            <Badge
              className={classes.badge}
              badgeContent={unreadChats[chat.id]}
              color="secondary"
            >
              <SideBarOption
                key={chat.id}
                lastMessage={get(last(chat.messages), "message", "")}
                name={
                  chat.isGeneral
                    ? chat.name
                    : createChatNameFromUsers(chat.users, user.name)
                }
                active={activeChat.id === chat.id}
                onClick={() => {
                  this.props.setActiveChat(chat);
                  this.props.clearUnreadMessages(chat);
                  this.resetExpandedPanel();
                }}
                description={chat.description}
                handleChangePanel={this.handleChangePanel}
                expanded={this.state.expanded}
                version="chats"
              />
            </Badge>
          ) : (
            <SideBarOption
              key={chat.id}
              lastMessage={get(last(chat.messages), "message", "")}
              name={
                chat.isGeneral
                  ? chat.name
                  : createChatNameFromUsers(chat.users, user.name)
              }
              active={activeChat.id === chat.id}
              onClick={() => {
                this.props.setActiveChat(chat);
                this.props.clearUnreadMessages(chat);
                this.resetExpandedPanel();
              }}
              description={chat.description}
              handleChangePanel={this.handleChangePanel}
              expanded={this.state.expanded}
              version="chats"
            />
          )}
        </div>
      );
    });
    // unreadChats.map(unreadChat => {return (<div>{unreadChat.id}</div>)});
  };

  renderDMs = () => {
    const { classes } = this.props;
    const { chats, activeChat, user, unreadChats } = this.props;
    return chats.filter(chat => chat.isDM === true).map(chat => {
      // if (unreadChats[chat.id]) {
      //   // let temp = this.state.publicSum;
      //   // temp += unreadChats[chat.id];
      //   // this.setState({ privateSum: temp });
      //   let temp = hemp;
      //   temp += unreadChats[chat.id];
      //   hemp = temp;
      // }
      return (
        <div className={classes.panelContainer} key={chat.id}>
          {unreadChats[chat.id] ? (
            <Badge
              className={classes.margin}
              badgeContent={unreadChats[chat.id]}
              color="secondary"
            >
              <SideBarOption
                key={chat.id}
                lastMessage={get(last(chat.messages), "message", "")}
                name={
                  chat.isGeneral
                    ? chat.name
                    : createChatNameFromUsers(chat.users, user.name)
                }
                active={activeChat.id === chat.id}
                onClick={() => {
                  this.props.setActiveChat(chat);
                }}
                description={chat.description}
                handleChangePanel={this.handleChangePanel}
                expanded={this.state.expanded}
                version="chats"
              />
            </Badge>
          ) : (
            <SideBarOption
              key={chat.id}
              lastMessage={get(last(chat.messages), "message", "")}
              name={
                chat.isGeneral
                  ? chat.name
                  : createChatNameFromUsers(chat.users, user.name)
              }
              active={activeChat.id === chat.id}
              onClick={() => {
                this.props.setActiveChat(chat);
              }}
              description={chat.description}
              handleChangePanel={this.handleChangePanel}
              expanded={this.state.expanded}
              version="chats"
            />
          )}
        </div>
      );
    });
  };

  renderTabs = () => {
    const { classes } = this.props;
    if (gemp && hemp) {
      return (
        <Tabs
          value={this.props.value}
          onChange={this.props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          className="animeAppBar"
        >
          <Badge
            className={classes.margin}
            badgeContent={gemp}
            color="secondary"
          >
            <Tab label="Chats" className="animeTab" />
          </Badge>
          <Badge
            className={classes.margin}
            badgeContent={hemp}
            color="secondary"
          >
            <Tab label="Messages" className="animeTab" />
          </Badge>
        </Tabs>
      );
    } else if (gemp) {
      return (
        <Tabs
          value={this.props.value}
          onChange={this.props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          className="animeAppBar"
        >
          <Badge
            className={classes.margin}
            badgeContent={gemp}
            color="secondary"
          >
            <Tab label="Chats" className="animeTab" />
          </Badge>
          <Tab label="Messages" className="animeTab" />
        </Tabs>
      );
    } else if (hemp) {
      return (
        <Tabs
          value={this.props.value}
          onChange={this.props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          className="animeAppBar"
        >
          <Tab label="Chats" className="animeTab" />
          <Badge
            className={classes.margin}
            badgeContent={hemp}
            color="secondary"
          >
            <Tab label="Messages" className="animeTab" />
          </Badge>
        </Tabs>
      );
    } else {
      return (
        <Tabs
          value={this.props.value}
          onChange={this.props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          className="animeAppBar"
        >
          <Tab label="Chats" className="animeTab" />
          <Tab label="Messages" className="animeTab" />
        </Tabs>
      );
    }
  };
  render() {
    const { classes, theme } = this.props;
    const { user, logout } = this.props;
    const drawer = (
      <div className="chats-side-bar">
        <SideBarDropDown
          className="anime-header"
          handleDialogOpen={this.handleDialogOpen}
          handleAddUserDialogOpen={this.handleAddUserDialogOpen}
        />

        <CreateChat
          open={this.state.open}
          onClose={this.handleDialogClose}
          handleDialogClose={this.handleDialogClose}
          createNewChat={this.props.createNewChat}
          socket={this.props.socket}
        />
        <AddUser
          open={this.state.addUserOpen}
          onClose={this.handleAddUserDialogClose}
          handleDialogClose={this.handleAddUserDialogClose}
          onSendPrivateMessage={this.props.onSendPrivateMessage}
          socket={this.props.socket}
        />
        <div className="side-bar-grid-container">
          <AppBar position="static" color="default" className="animeAppBar">
            {this.renderTabs()}
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.props.value}
            onChangeIndex={this.props.handleChangeIndex}
            className="chat-container"
            ref={this.chatContainer}
            data-simplebar="init"
          >
            <TabContainer dir={theme.direction}>
              <div>{this.renderPublicChats()}</div>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              {this.renderDMs()}
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
      </div>
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
