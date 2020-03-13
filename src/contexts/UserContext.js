import React, { createContext, useState } from 'react'
import withStorage from '../components/high-order/withStorage';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const {children, load, save} = props;

    const [user, setUserInternal] = useState(load("user", null));

    const setUser = user => {
        save("user", user);
        setUserInternal(user);
    }

    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    )
}

export default withStorage(UserContextProvider);
