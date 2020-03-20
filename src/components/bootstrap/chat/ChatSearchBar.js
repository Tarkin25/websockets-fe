import React, { useState, useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { makeStyles, FormControl, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import KeyListener from '../../KeyListener';

const useStyle = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  inputWrapper: {
    padding: theme.spacing(0.5, 0.5, 0.5, 1),
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
  flex: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  button: {
    "&:focus": {
      outline: "none"
    }
  }
}));

const ChatSearchBar = () => {
  const classes = useStyle();

  const { setSearch } = useContext(ChatContext);

  const [input, setInput] = useState("");

  const handleChangeInput = e => {
    if (input !== "" || e.target.value !== " ") {
      setInput(e.target.value);
      setSearch(e.target.value);
    }
  };

  const resetSearch = () => {
    setInput("");
    setSearch("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputWrapper}>
        <div className={classes.flex}>
          <FormControl className={classes.grow}>
            <input
              value={input}
              onChange={handleChangeInput}
              placeholder="Search chat"
              className={classes.input}
            />
          </FormControl>
          <FormControl>
            {input === "" ? (
              <IconButton disabled className={classes.button}>
                <SearchIcon fontSize="small" />
              </IconButton>
            ) : (
              <div>
                  <KeyListener action={resetSearch} keys={["Escape"]} />
                <IconButton className={classes.button} onClick={resetSearch}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            )}
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default ChatSearchBar;
