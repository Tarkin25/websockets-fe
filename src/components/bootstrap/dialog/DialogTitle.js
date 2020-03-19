import React from 'react'

const DialogTitle = ({className, children}) => {
    return (
        <h4 className={"modal-title " + className}>
            {children}
        </h4>
    )
}

export default DialogTitle
