import React, { useEffect, useState } from "react";
import Dialog from "./dialog/Dialog";
import DialogHeader from "./dialog/DialogHeader";
import DialogTitle from "./dialog/DialogTitle";
import DialogBody from "./dialog/DialogBody";
import API from "../config/api";

const MemberDialog = props => {
  const { open = true, onClose, onAdd, chatId } = props;

  const [userId, setUserId] = useState("Choose User");

  const [users, setUsers] = useState([]);

  const handleChangeUserId = e => {
      setUserId(e.target.value);
  }

  const handleSubmit = e => {
      e.preventDefault();

      onAdd(userId);

      onClose();
  }

  useEffect(() => {
    API.get(`/users?excludeChatId=${chatId}`)
    .then(res => {
        setUsers(res.data);

        if(res.data.length > 0) {
            setUserId(res.data[0].id);
        }
    })
  }, [open, chatId]);

  useEffect(() => {
    const eventListener = document.addEventListener("keydown", e => {
      if(e.key === "Escape") {
        onClose();
      }
    });

    return () => {
      document.removeEventListener("keydown", eventListener);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>Add Member</DialogTitle>
        <button className="close" onClick={onClose}>
          &times;
        </button>
      </DialogHeader>

      <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select className="form-control" value={userId} onChange={handleChangeUserId}>
              {users.map(user => (
                  <option value={user.id} key={user.id}>{user.username}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
              <button className="btn btn-dark" type="submit">Add</button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default MemberDialog;
