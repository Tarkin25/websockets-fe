import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import MessageList from "../message/MessageList";
import MessageInput from "../message/MessageInput";
import MessageContextProvider from '../../../contexts/MessageContext';
import MemberList from "../MemberList";
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const headerHeight = "64px";
const inputHeight = "60px";

const styles = {
  root: {
    height: "100%"
  },
  header: {
    height: headerHeight
  },
  input: {
    height: inputHeight
  },
  messages: {
    height: `calc(100% - ${inputHeight})`,
    overflowX: "hidden",
    overflowY: "auto",
    marginBottom: 0
  },
  messageSection: {
    height: `calc(100% - ${headerHeight})`
  },
};

const displayTypes = {
  MESSAGES: "message",
  MEMBERS: "members"
}

const useStyle = makeStyles(theme => ({
  headerTitle: {
    flexGrow: 1
  },
  headerButton: {
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    "&:hover": {
      borderColor: theme.palette.primary.main
    }
  },
  noChats: {
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(2)
  },
  button: {
    width: "100px"
  },
  messageSection: {
    height: `calc(100% - ${headerHeight})`
  },
  messages: {
    height: `calc(100% - ${inputHeight})`,
    overflow: "auto",
    marginBottom: 0
  },
  input: {
    height: inputHeight
  }
}));

const SelectedChat = props => {
  const classes = useStyle();

  const { getSelectedChat, chats } = useContext(ChatContext);
  const selectedChat = getSelectedChat();

  const [display, setDisplay] = useState(displayTypes.MESSAGES);

  useEffect(() => {
    setDisplay(displayTypes.MESSAGES);
  }, [selectedChat]);

  if (selectedChat) {

    switch(display) {
      case displayTypes.MESSAGES:
        return (
          <div style={styles.root}>
            <AppBar color="secondary" position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.headerTitle}>
                  {selectedChat.name}
                </Typography>
                <Button className={classes.button} variant="outlined" onClick={() => setDisplay(displayTypes.MEMBERS)}>Members</Button>
              </Toolbar>
            </AppBar>
    
            <MessageContextProvider chatId={selectedChat.id} className={classes.messageSection}>
              <div className={classes.messages}>
                <MessageList />
              </div>
  
              <div className={classes.input}>
                <MessageInput />
              </div>
            </MessageContextProvider>
          </div>
        );

      case displayTypes.MEMBERS:
        return (
          <div style={styles.root}>
            <AppBar color="secondary" position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.headerTitle}>
                  {selectedChat.name}
                </Typography>
                <Button className={classes.button} startIcon={<ArrowBackIosIcon/>} variant="outlined" onClick={() => setDisplay(displayTypes.MESSAGES)}>Back</Button>
              </Toolbar>
            </AppBar>
    
            <MemberList chatId={selectedChat.id}  style={styles.messageSection} />

          </div>
        );
      default:
        return null;
    }
  } else if (chats.length === 0) {
    return <Typography className={classes.noChats} variant="h6">No Chats Yet</Typography>;
  }
};

export default SelectedChat;
