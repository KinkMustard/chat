import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import DoneIcon from "@material-ui/icons/Done";

const styles = theme => ({
  avatar: {
    margin: 10
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
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
  render() {
    const { active, lastMessage, name, onClick, classes } = this.props;
    return (
      <Chip
        avatar={<Avatar>{name[0].toUpperCase()}</Avatar>}
        label={name}
        onClick={onClick}
        onDelete={this.handleDelete}
        className={classes.chip}
      />
    );
  }
}

SideBarOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBarOption);
