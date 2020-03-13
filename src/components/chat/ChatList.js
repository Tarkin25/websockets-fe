import React, { useState, useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const ChatList = props => {
  const { chats, selectChat, deleteChat } = useContext(ChatContext);

  return (
    <div className="list-unstyled list-group">
      {chats.map((chat, index) => (
        <li className="list-group-item list-group-item-action p-2" key={"chat-" + index} onClick={() => selectChat(index)}>
          <div className="row">
            <div className="col-12">
              <span className="text-body font-weight-bold">{chat.name}</span>
              <button className="btn btn-danger btn-small float-right" onClick={() => deleteChat(index)}>
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ChatList;
