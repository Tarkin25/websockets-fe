import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import MessageList from "../message/MessageList";
import MessageInput from "../message/MessageInput";
import MessageContextProvider from '../../contexts/MessageContext';
import MemberList from "../MemberList";

const headerHeight = "58px";
const inputHeight = "38px";

const styles = {
  root: {
    height: "100%"
  },
  header: {
    height: headerHeight
  },
  input: {
    height: inputHeight
  },
  messages: {
    height: `calc(100% - ${inputHeight})`,
    overflowX: "hidden",
    overflowY: "auto",
    marginBottom: 0
  },
  messageSection: {
    height: `calc(100% - ${headerHeight})`
  }
};

const displayTypes = {
  MESSAGES: "message",
  MEMBERS: "members"
}

const SelectedChat = props => {
  const { getSelectedChat, chats } = useContext(ChatContext);
  const selectedChat = getSelectedChat();

  const [display, setDisplay] = useState(displayTypes.MESSAGES);

  useEffect(() => {
    setDisplay(displayTypes.MESSAGES);
  }, [selectedChat]);

  if (selectedChat) {

    switch(display) {
      case displayTypes.MESSAGES:
        return (
          <div style={styles.root}>
            <div className="navbar bg-light border-bottom" style={styles.header}>
              <div className="navbar-brand font-weight-bold">{selectedChat.name}</div>
              <div className="navbar-nav">
                <li className="nav-item">
                  <button className="btn btn-secondary" onClick={() => setDisplay(displayTypes.MEMBERS)}>Members</button>
                </li>
              </div>
            </div>
    
            <MessageContextProvider chatId={selectedChat.id} style={styles.messageSection}>
              <MessageList style={styles.messages} />
    
              <MessageInput style={styles.input} />
            </MessageContextProvider>
          </div>
        );

      case displayTypes.MEMBERS:
        return (
          <div style={styles.root}>
            <div className="navbar bg-light border-bottom" style={styles.header}>
              <div className="navbar-brand font-weight-bold">{selectedChat.name}</div>
              <div className="navbar-nav">
                <li className="nav-item">
                  <button className="btn btn-secondary" onClick={() => setDisplay(displayTypes.MESSAGES)}>{"< Back"}</button>
                </li>
              </div>
            </div>
    
            <MemberList chatId={selectedChat.id}  style={styles.messageSection} />

          </div>
        );
      default:
        return null;
    }
  } else if (chats.length === 0) {
    return <h4 className="display-4 text-center">No Chats yet</h4>;
  }
};

export default SelectedChat;
