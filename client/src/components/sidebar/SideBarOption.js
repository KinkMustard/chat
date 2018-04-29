import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import DoneIcon from "@material-ui/icons/Done";
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import * as Colors from "../../Colors";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    marginLeft: "-10px"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  avatar: {
    marginLeft: "-10px"
  },
  expansionPanel: {
    marginLeft: -20,
    backgroundColor: Colors.BlackBody,
    color: Colors.GreyFont,
    alignSelf: "center",
    width: "100%"
  }
});

class SideBarOption extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
  };
  static defaultProps = {
    lastMessage: "",
    active: false,
    onClock: () => {}
  };

  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    alert("You clicked the Chip."); // eslint-disable-line no-alert
  };
  decideWhatToRender = () => {
    const {
      active,
      lastMessage,
      name,
      onClick,
      classes,
      color,
      expanded,
      handleChangePanel,
      description
    } = this.props;
    if (this.props.version === "users") {
      return (
        <ExpansionPanel
          expanded={expanded === name}
          onChange={handleChangePanel(name)}
          className={classes.expansionPanel}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Avatar style={{ backgroundColor: color }} className={classes.avatar}>
              {name[0].toUpperCase()}
            </Avatar>
            <Typography className={classes.heading}>
              <div className="side-bar-option-header">{name}</div>
            </Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={onClick}>
              START PRIVATE CHAT
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      );
    } else {
      return (
        <ExpansionPanel
          expanded={expanded === name}
          onChange={handleChangePanel(name)}
          className={classes.expansionPanel}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Avatar style={{ backgroundColor: color }} className={classes.avatar}>
              {name[0].toUpperCase()}
            </Avatar>
            <Typography className={classes.heading}>
              <div className="side-bar-option-header">{name}</div>
            </Typography>
          </ExpansionPanelSummary>
          {name !== "General" ? (
            <React.Fragment>
              <ExpansionPanelDetails>
                <Typography>
                  <div className="grey">{description}</div>
                </Typography>
              </ExpansionPanelDetails>
              <Divider />
            </React.Fragment>
          ) : null}
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={onClick}>
              JOIN CHAT
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      );
    }
  };
  render() {
    const {
      active,
      lastMessage,
      name,
      onClick,
      classes,
      color,
      expanded,
      handleChangePanel
    } = this.props;
    return <React.Fragment>{this.decideWhatToRender()}</React.Fragment>;
  }
}

SideBarOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBarOption);
