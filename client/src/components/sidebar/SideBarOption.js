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

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
      handleChangePanel
    } = this.props;
    if (this.props.version === "users") {
      return (
        <ExpansionPanel
          expanded={expanded === name}
          onChange={handleChangePanel(name)}
          className="black-content"
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Avatar style={{ backgroundColor: color }} className="side-bar-option-avatar">
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
          className="black-content"
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Avatar style={{ backgroundColor: color }} className="side-bar-option-avatar">
              {name[0].toUpperCase()}
            </Avatar>
            <Typography className={classes.heading}>
              <div className="side-bar-option-header">{name}</div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <div className="grey">This is a chat</div>
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
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
    console.log(expanded);
    console.log(handleChangePanel);
    return <React.Fragment>{this.decideWhatToRender()}</React.Fragment>;
  }
}

SideBarOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBarOption);
