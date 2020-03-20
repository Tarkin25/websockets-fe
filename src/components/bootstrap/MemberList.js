import React, { useState, useEffect, Fragment } from "react";
import API from "../../config/api";
import MemberDialog from "./MemberDialog";
import {
  makeStyles,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const headerHeight = "64px";

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  header: {
    height: headerHeight
  },
  members: {
    height: `calc(100% - ${headerHeight})`,
    padding: theme.spacing(2)
  },
  member: {
    padding: theme.spacing(1, 0, 1, 0),
    borderTop: `1px solid ${theme.palette.secondary.dark}`
  },
  remove: {
    color: theme.palette.error.main
  },
  flex: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  }
}));

const MemberList = props => {
  const classes = useStyle();

  const { chatId } = props;

  const [members, setMembers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addMember = userId => {
    API.post(`/chats/${chatId}/users?userId=${userId}`).then(res => {
      setMembers(members => [...members, res.data]);
    });
  };

  const removeMember = index => {
    const member = members[index];

    API.delete(`/chats/${chatId}/users/${member.id}`).then(res => {
      const newMembers = members;
      newMembers.splice(index, 1);
      setMembers([...newMembers]);
    });
  };

  useEffect(() => {
    API.get(`/chats/${chatId}/users`).then(res => {
      setMembers(res.data);
    });
  }, [chatId]);

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography className={classes.grow}>Members</Typography>
            <Tooltip title="Add Member">
              <IconButton onClick={() => setDialogOpen(true)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <List className={classes.members}>
          {members.map((member, index) => (
            <ListItem key={"member-" + index} className={classes.member}>
              <ListItemText>{member.username}</ListItemText>
              <ListItemSecondaryAction>
                <Tooltip title="Remove from chat">
                  <IconButton onClick={() => removeMember(index)}>
                    <RemoveCircleIcon className={classes.remove} />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <MemberDialog
        open={dialogOpen}
        onAdd={addMember}
        onClose={() => setDialogOpen(false)}
        chatId={chatId}
      />
    </Fragment>
  );
};

export default MemberList;
