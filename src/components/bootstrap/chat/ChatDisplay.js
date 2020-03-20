import React, { useState, useContext } from "react";
import ChatDialog from "./ChatDialog";
import { ChatContext } from "../../../contexts/ChatContext";
import ChatList from "./ChatList";
import ChatSearchBar from "./ChatSearchBar";
import { makeStyles, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

const headerHeight = "64px";
const searchBarHeight = "52px";

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  header: {
    height: headerHeight
  },
  searchBar: {
    height: searchBarHeight
  },
  chats: {
    height: `calc(100% - ${headerHeight} - ${searchBarHeight})`,
  },
  grow: {
    flexGrow: 1
  }
}));

const ChatDisplay = props => {
  const classes = useStyle();

  const { createChat } = useContext(ChatContext);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>Chats</Typography>
            <IconButton title="Create chat" onClick={() => setDialogOpen(true)} >
              <AddIcon />
            </IconButton>
        </Toolbar>
      </AppBar>

      <div className={classes.searchBar}>
        <ChatSearchBar />
      </div>

      <div className={classes.chats}>
        <ChatList />
      </div>

      <ChatDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={createChat}
        title="Create Chat"
        actionName="Create"
      />
    </div>
  );
};

export default ChatDisplay;
