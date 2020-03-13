import React, { useState, useEffect } from 'react'
import Dialog from "../dialog/Dialog";
import DialogHeader from "../dialog/DialogHeader";
import DialogTitle from "../dialog/DialogTitle";
import DialogBody from "../dialog/DialogBody";

const ChatDialog = ({open, onClose, onSubmit, title, actionName, initialValue = {name: ""}}) => {
    
  const [name, setName] = useState(initialValue.name);

  const handleChangeName = e => setName(e.target.value);

  useEffect(() => {
    const eventListener = document.addEventListener("keydown", e => {
      if(e.key === "Escape") {
        onClose();
      }
    });

    return () => {
      document.removeEventListener("keydown", eventListener);
    }
  })

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({name});
    onClose();
  }

    return (
        <Dialog open={open}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <button className="close" onClick={onClose}>&times;</button>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input className="form-control" name="name" value={name} onChange={handleChangeName} />
            </div>
            <div className="form-group">
              <button className="btn btn-dark" type="submit">{actionName}</button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    )
}

export default ChatDialog
