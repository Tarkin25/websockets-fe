import React, { useState, useEffect, createContext } from "react";
import withStorage from "../components/high-order/withStorage";
import API from "../config/api";
import getStompClient from "../config/stompClient";
import { v4 as uuidv4 } from 'uuid';

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

    const id = uuidv4();

    getStompClient(headers).then(client => {
      client.subscribe(
        `/chats/${chatId}/messages`,
        frame => {
          const message = JSON.parse(frame.body);

          setMessages(messages => [...messages, message]);
        },
        id
      )
    });

    return () => {
      getStompClient().then(client => client.unsubscribe(id));
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
