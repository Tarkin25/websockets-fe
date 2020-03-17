import React, { useState, useContext } from "react";
import ChatDialog from "./ChatDialog";
import { ChatContext } from "../../contexts/ChatContext";
import ChatList from "./ChatList";
import ChatSearchBar from "./ChatSearchBar";

const headerHeight = "58px";
const searchBarHeight = "38px";

const styles = {
  root: {
    height: "100%"
  },
  header: {
    height: headerHeight
  },
  searchBar: {
    height: searchBarHeight
  },
  chats: {
    height: `calc(100% - ${headerHeight} - ${searchBarHeight})`,
    overflowY: "auto",
    overflowX: "hidden"
  }
};

const ChatDisplay = props => {
  const { createChat } = useContext(ChatContext);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div style={styles.root}>
      <div className="navbar bg-light border" style={styles.header}>
        <div className="navbar-brand">Chats</div>
        <div className="navbar-nav">
          <li className="nav-item">
            <button className="btn btn-sm" onClick={() => setDialogOpen(true)}>
              <i className="fas fa-plus" />
            </button>
          </li>
        </div>
      </div>

      <ChatSearchBar style={styles.searchBar} />

      <ChatList style={styles.chats} />

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
