import React, { useContext, useState } from 'react'
import { MessageContext } from '../../contexts/MessageContext';

const MessageInput = (props) => {

    const {style} = props;

    const {postMessage} = useContext(MessageContext);

    const [input, setInput] = useState("");

    const handleChangeInput = e => setInput(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        if(input.replace(" ", "") !== "") {
            postMessage(input);
            setInput("");
        }
    }

    return (
        <div style={style}>
            <form className="form-inline" onSubmit={handleSubmit}>
                <div className="input-group" style={{width: "100%"}}>
                    <input className="form-control" placeholder="Type a message" value={input} onChange={handleChangeInput} />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-sm btn-secondary"><i className="far fa-paper-plane"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MessageInput
