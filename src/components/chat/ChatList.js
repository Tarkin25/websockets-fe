import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const ChatList = props => {
  const {style} = props;

  const { chats, selectChat, deleteChat } = useContext(ChatContext);

  return (
    <div className="list-unstyled list-group" style={style}>
      {chats.map((chat, index) => (
        <li className="list-group-item list-group-item-action p-2" key={"chat-" + index} onClick={() => selectChat(index)} style={{cursor: "pointer"}}>
          <div className="navbar">
            <div className="font-weight-bold">
              {chat.name}
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-danger btn-sm" onClick={() => deleteChat(index)}>
                  <i className="fas fa-trash-alt" />
                </button>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ChatList;
