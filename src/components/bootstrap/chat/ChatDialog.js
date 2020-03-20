import React, { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

const ChatDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  actionName,
  initialValue = { name: "" }
}) => {
  const [name, setName] = useState(initialValue.name);

  const handleChangeName = e => setName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name });
    onClose();
  };

  useEffect(() => {
    setName("");
  }, [open]);

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth
              autoFocus
              label="Name"
              value={name}
              onChange={handleChangeName}
            />
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary" variant="contained">
              {actionName}
            </Button>
            <Button onClick={onClose} color="primary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default ChatDialog;
