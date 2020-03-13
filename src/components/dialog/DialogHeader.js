import React from 'react'

const DialogHeader = ({className, children}) => {
    return (
        <div className={"modal-header " + className}>
            {children}
        </div>
    )
}

export default DialogHeader
