import React, { createContext, useState, useEffect } from "react";
import API from "../config/api";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/user/chats").then(res => {
      setChats(res.data);
    });
  }, []);

  const createChat = chat => {
      return API.post("/chats", chat)
      .then(res => {
          setChats([...chats, res.data]);
          return res;
      })
  }

  const updateChat = (index, chat) => {
      return API.put(`/chats/${chats[index].id}`, {chat})
      .then(res => {
        chats[index] = res.data;

        setChats([...chats]);

        return res;
      });
  }

  const deleteChat = (index) => {
    return API.delete(`/chats/${chats[index].id}`)
    .then(res => {
        const newChats = chats;
        newChats.splice(index, 1);

        setChats([...newChats]);

        return res;
    })
  }

  const getSelectedChat = () => {
    return chats[selectedIndex];
  }

  const selectChat = (index) => {
    setSelectedIndex(index);
  }

  return (
      <ChatContext.Provider value={{chats, createChat, updateChat, deleteChat, selectChat, getSelectedChat, search, setSearch}}>
          {children}
      </ChatContext.Provider>
  );
};

export default ChatContextProvider;
