import React, { useState, useContext } from 'react'
import { ChatContext } from '../../contexts/ChatContext';

const ChatSearchBar = ({style}) => {
    const {setSearch} = useContext(ChatContext);

    const [input, setInput] = useState("");

    const handleChangeInput = e => setInput(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        setSearch(input);
    }

    return (
        <div style={style}>
            <form className="form-inline" style={{width: "100%"}} onSubmit={handleSubmit}>
                <div className="input-group" style={{width: "100%"}}>
                    <input className="form-control" placeholder="Search" value={input} onChange={handleChangeInput} />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-sm btn-secondary"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChatSearchBar
