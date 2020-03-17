import React, { useContext, useEffect } from 'react'
import withStorage from '../high-order/withStorage';
import { MessageContext } from '../../contexts/MessageContext';
import { animateScroll } from 'react-scroll';

const MessageList = (props) => {

    const {style} = props;

    const {messages} = useContext(MessageContext);

    useEffect(() => {
        animateScroll.scrollToBottom({containerId: "chat-list", duration: 500});
    }, [messages]);

    return (
        <ul className="list-unstyled" style={style} id="chat-list">
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
