import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import MessageList from "../MessageList";

const SelectedChat = props => {
  const { getSelectedChat } = useContext(ChatContext);
  const selectedChat = getSelectedChat();



  if (selectedChat) {
    return (
      <div>
        <div className="navbar bg-light border">
          <div className="navbar-brand">
              {selectedChat.name}
          </div>
          <div className="navbar-nav">
              <li className="nav-item"><button className="btn btn-secondary">Members</button></li>
          </div>
        </div>

        <MessageList chatId={selectedChat.id}/>
        
      </div>
    );
  } else {
    return <div className="spinner-border"></div>;
  }
};

export default SelectedChat;
