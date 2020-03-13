import React, { useState, useContext } from "react";
import ChatDialog from "./ChatDialog";
import { ChatContext } from "../../contexts/ChatContext";
import ChatList from "./ChatList";

const ChatDisplay = props => {
    const {createChat} = useContext(ChatContext);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>

      <div className="navbar bg-light border">
        <div className="navbar-brand">Chats</div>
        <div className="navbar-nav">
          <li className="nav-item"><button className="btn btn-sm" onClick={() => setDialogOpen(true)}>&#43;</button></li>
        </div>
      </div>

      <ChatList/>

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
