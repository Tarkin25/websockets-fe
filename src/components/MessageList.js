import React, { useState, useEffect } from 'react'
import API from '../config/api';
import withStorage from './high-order/withStorage';
import getStompClient from '../config/stompClient';

const MessageList = (props) => {

    const {chatId, load} = props;

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        API.get(`/chats/${chatId}/messages`)
        .then(res => {
            setMessages(res.data);
        })
    }, [chatId]);

    useEffect(() => {
        const headers = {
            Authorization: load("token")
        };

        getStompClient("http://localhost:8080/ws/secured", headers, client => {
            client.subscribe(`/chats/${chatId}/messages`, frame => {
                const message = JSON.parse(frame.body);

                setMessages(messages => [...messages, message]);
            }, {id: chatId});
        });

        return () => {
            getStompClient().unsubscribe(chatId);
        }
    }, [chatId]);

    return (
        <ul className="list-unstyled">
            {messages.map((message, index) => (
                <li className="list-item border p-2 clearfix" key={"message-" + index}>
                    <h5>{message.from.username}</h5>
                    <p>{message.content}</p>
                    <p className="float-right">{message.timestamp}</p>
                </li>
            ))}
        </ul>
    )
}

export default withStorage(MessageList);
