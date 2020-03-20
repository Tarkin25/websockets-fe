import React, { useEffect, useState } from "react";
import API from "../../config/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
  Button
} from "@material-ui/core";

const MemberDialog = props => {
  const { open = true, onClose, onAdd, chatId } = props;

  const [userId, setUserId] = useState("Choose User");

  const [users, setUsers] = useState([]);

  const handleChangeUserId = e => {
    setUserId(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onAdd(userId);

    onClose();
  };

  useEffect(() => {
    API.get(`/users?excludeChatId=${chatId}`).then(res => {
      setUsers(res.data);

      if (res.data.length > 0) {
        setUserId(res.data[0].id);
      }
    });
  }, [open, chatId]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          <FormControl>
            <Select value={userId} onChange={handleChangeUserId}>
              {users.map((user, index) => (
                <MenuItem key={"user-" + index} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MemberDialog;
