import React, { useState, useEffect, createContext } from "react";
import withStorage from "../components/high-order/withStorage";
import API from "../config/api";
import getStompClient from "../config/stompClient";

export const MessageContext = createContext();

const MessageContextProvider = props => {
  const { chatId, load, children, style } = props;

  const [messages, setMessages] = useState([]);

  const postMessage = content => {
    API.post(`/chats/${chatId}/messages`, { content: content });
  };

  useEffect(() => {
    API.get(`/chats/${chatId}/messages`).then(res => {
      setMessages(res.data);
    });
  }, [chatId]);

  useEffect(() => {
    const headers = {
      Authorization: load("token")
    };

    getStompClient(headers, client => {
      client.subscribe(
        `/chats/${chatId}/messages`,
        frame => {
          const message = JSON.parse(frame.body);

          setMessages(messages => [...messages, message]);
        },
        { id: chatId }
      );
    });

    return () => {
      getStompClient().unsubscribe(chatId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return (
    <MessageContext.Provider value={{ messages, postMessage }}>
      <div style={style}>{children}</div>
    </MessageContext.Provider>
  );
};

export default withStorage(MessageContextProvider);
