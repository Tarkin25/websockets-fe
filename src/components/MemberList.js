import React, { useState, useEffect } from 'react'
import API from '../config/api';
import MemberDialog from './MemberDialog';

const headerHeight = "58px";

const styles = {
    root: {
        height: "100%",
    },
    header: {
        height: headerHeight,
    },
    members: {
        height: `calc(100% - ${headerHeight})`,
    }
};

const MemberList = (props) => {

    const {style, chatId} = props;

    const [members, setMembers] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const addMember = userId => {
        API.post(`/chats/${chatId}/users?userId=${userId}`)
        .then(res => {
            setMembers(members => [...members, res.data]);
        });
    }

    useEffect(() => {
        API.get(`/chats/${chatId}/users`)
        .then(res => {
            setMembers(res.data);
        })
    }, [chatId]);

    return (
        <div style={style}>
            <div style={styles.root}>
                <div style={styles.header}>
                    <div className="navbar bg-light border">
                        <div className="navbar-brand">Members</div>
                        <div className="navbar-nav">
                            <li className="nav-item">
                                <button className="btn btn-sm" onClick={() => setDialogOpen(true)}>
                                    <i className="fas fa-plus" />
                                </button>
                            </li>
                        </div>
                    </div>
                </div>
                <div style={styles.members} className="list-unstyled list-group">
                    {members.map((member, index) => (
                        <li className="list-group-item list-group-item-action p-2" key={"member-" + index}>
                            <div className="navbar">
                                <div className="font-weight-bold">
                                    {member.username}
                                </div>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <button className="btn btn-danger btn-sm"><i className="fas fa-trash-alt" /></button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
            <MemberDialog open={dialogOpen} onAdd={addMember} onClose={() => setDialogOpen(false)} chatId={chatId} />
        </div>
    )
}

export default MemberList
