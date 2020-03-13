import React from 'react'

const withStorage = (WrappedComponent) => (props) => {
    const load = (key, defaultValue = null) => {
        let value = localStorage.getItem(key);

        if(value) {
            return JSON.parse(value);
        } else return defaultValue;
    }

    const save = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    return (
        <WrappedComponent load={load} save={save} {...props}/>
    )
}

export default withStorage
