import React, { createContext, useState } from 'react'
import withStorage from '../components/high-order/withStorage';
import { withRouter } from 'react-router-dom';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const {children, load, save, remove, history} = props;

    const [user, setUserInternal] = useState(load("user", null));

    const setUser = user => {
        save("user", user);
        setUserInternal(user);
    }

    const logout = () => {
        remove("user");
        remove("token");
        history.push("/login");
    }

    return (
        <UserContext.Provider value={{user, setUser, logout}}>{children}</UserContext.Provider>
    )
}

export default withStorage(withRouter(UserContextProvider));
