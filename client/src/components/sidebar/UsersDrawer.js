import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Card, { CardContent } from "material-ui/Card";
import Drawer from "material-ui/Drawer";
import Hidden from "material-ui/Hidden";
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData";
import SideBarOption from "./SideBarOption";
import { differenceBy } from "lodash";
import * as Colors from "../../Colors";
import IslandImage from "../../images/island.svg";
import "./UsersDrawer.scss";

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
  }
});

class UsersDrawer extends Component {
  static type = {
    USERS: "users",
    CHATS: "chats"
  };

  constructor(props) {
    super(props);
    this.state = {
      reciever: "",
      activeSideBar: UsersDrawer.type.CHATS,
      value: 0,
      mobileOpen: false,
      expanded: null,
      open: false
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
    this.setActiveSideBar(UsersDrawer.type.CHATS);
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

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  renderUsers = () => {
    const { user, users, theme } = this.props;
    if (users.length > 1) {
      return differenceBy(users, [user], "name").map(user => {
        return (
          <SideBarOption
            key={user.id}
            name={user.name}
            color={user.color}
            onClick={() => {
              this.addChatForUser(user.name);
              this.props.changeTabs(1);
              this.setState({ expanded: null });
            }}
            handleChangePanel={this.handleChangePanel}
            expanded={this.state.expanded}
            version="users"
          />
        );
      });
    } else {
      return (
        <div>
          <Typography
            variant="headline"
            className="no-users-message"
            style={{ color: theme.fontColor }}
          >
            Looks like there's nobody else here yet
          </Typography>
          <img
            src={IslandImage}
            alt="no users"
            style={{ color: theme.fontColor }}
          />
        </div>
      );
    }
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div
        className="users-side-bar"
        style={{ backgroundColor: theme.baseColor, color: theme.fontColor }}
      >
        <div
          className="user-list-header"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.fontColor
          }}
        >
          <Typography
            variant="headline"
            className="grey"
            style={{ color: theme.fontColor }}
          >
            Users
          </Typography>
        </div>
        <div className="side-bar-option-users">{this.renderUsers()}</div>
      </div>
    );
    return (
      <React.Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={"right"}
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

UsersDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UsersDrawer);
