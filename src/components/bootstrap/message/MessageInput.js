import React, { useContext, useState, Fragment } from "react";
import { MessageContext } from "../../../contexts/MessageContext";
import {
  makeStyles,
  FormControl,
  IconButton
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyle = makeStyles(theme => ({
    inputWrapper: {
        padding: theme.spacing(1, 1, 1, 2),
        width: "100%",
        background: theme.palette.secondary.dark
    },
    input: {
        border: "none",
        maxWidth: "100%",
        padding: theme.spacing(1, 2, 1, 2),
        borderRadius: theme.spacing(2),
        "&:focus": {
            outline: "none"
        }
    },
    icon: {
        
    },
    grow: {
        flexGrow: 1
    },
    flex: {
        display: "flex"
    }
}));

const MessageInput = () => {
  const classes = useStyle();

  const { postMessage } = useContext(MessageContext);

  const [input, setInput] = useState("");

  const handleChangeInput = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    if (input.replace(" ", "") !== "") {
      postMessage(input);
      setInput("");
    }
  };

  return (
    <Fragment>
      <div className={classes.inputWrapper}>
        <form onSubmit={handleSubmit} className={classes.flex}>
          <FormControl className={classes.grow} >
            <input
              value={input}
              onChange={handleChangeInput}
              placeholder="Type a message"
              className={classes.input}
            />
          </FormControl>
          <FormControl>
            <IconButton type="submit">
              <SendIcon fontSize="small" className={classes.icon} />
            </IconButton>
          </FormControl>
        </form>
      </div>
    </Fragment>
  );
};

export default MessageInput;
