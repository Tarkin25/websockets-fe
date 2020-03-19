import React, { useContext, useEffect } from "react";
import withStorage from "../../high-order/withStorage";
import { MessageContext } from "../../../contexts/MessageContext";
import { UserContext } from "../../../contexts/UserContext";
import { animateScroll } from "react-scroll";
import clsx from "clsx";
import {
  List,
  ListItem,
  Typography,
  makeStyles,
  Grid,
  Tooltip
} from "@material-ui/core";
import moment from "moment";

const fullDate = dateStr => moment(dateStr).format("DD.MM.YYYY HH:mm");
const shortDate = dateStr => moment(dateStr).format("HH:mm");

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%",
    overflow: "auto"
  },
  messageHeader: {
    fontWeight: "bold"
  },
  placeholder: {
    minWidth: "35%",
    flexGrow: 1
  },
  message: {
    maxWidth: "65%",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2)
  },
  messageOwn: {
    background: theme.palette.success.light
  },
  messageOther: {
    background: theme.palette.info.light
  },
  timestamp: {
    textAlign: "right",
    color: theme.palette.primary.light,
    fontSize: "0.85rem"
  }
}));

const MessageList = props => {
  const classes = useStyle();

  const { messages } = useContext(MessageContext);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: "chat-list", duration: 500 });
  }, [messages]);

  const Message = ({ message }) => {
    const { user } = useContext(UserContext);

    if (user.id === message.from.id) {
      return (
        <Grid container>
          <div className={classes.placeholder} />
          <div className={clsx(classes.message, classes.messageOwn)}>
            <Typography>{message.content}</Typography>
            <Tooltip title={fullDate(message.timestamp)} className={classes.timestamp} placement="bottom-end" >
              <Typography>
                {shortDate(message.timestamp)}
              </Typography>
            </Tooltip>
          </div>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <div className={clsx(classes.message, classes.messageOther)}>
            <Typography className={classes.messageHeader}>
              {message.from.username}
            </Typography>
            <Typography>{message.content}</Typography>
            <Tooltip title={fullDate(message.timestamp)} className={classes.timestamp} placement="bottom-end" >
              <Typography>
                {shortDate(message.timestamp)}
              </Typography>
            </Tooltip>
          </div>
          <div className={classes.placeholder} />
        </Grid>
      );
    }
  };

  return (
    <List component="ul" id="chat-list" className={classes.root}>
      {messages.map((message, index) => (
        <ListItem key={"message-" + index}>
          <Message message={message} />
        </ListItem>
      ))}
    </List>
  );
};

export default withStorage(MessageList);
