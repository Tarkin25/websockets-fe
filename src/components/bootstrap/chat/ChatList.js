import React, { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import clsx from 'clsx';

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%",
    overflow: "auto"
  },
  error: {
    color: theme.palette.error.main
  },
  list: {
    paddingTop: 0
  },
  chat: {
    "&:hover": {
      background: theme.palette.secondary.main
    }
  },
  selected: {
    background: theme.palette.secondary.main
  },
  borderTop: {
    borderTop: `1px solid ${theme.palette.secondary.dark}`
  }
}));

const ChatList = () => {
  const classes = useStyle();

  const { chats, selectChat, deleteChat, getSelectedChat, search } = useContext(ChatContext);

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {chats
        .filter(chat => {
          return chat.name.toLowerCase().includes(search.toLowerCase());
        })
        .map((chat, index) => (
          <ListItem
            key={"chat-" + index}
            className={clsx(classes.chat, classes.borderTop, (getSelectedChat().id === chat.id ? classes.selected : null))}
            onClick={() => selectChat(index)}
          >
            <ListItemText>{chat.name}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton title="Delete chat" onClick={() => deleteChat(index)}>
                <RemoveCircleIcon className={classes.error} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChatList;
