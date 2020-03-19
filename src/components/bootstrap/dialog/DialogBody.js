import React from 'react'

const DialogBody = ({className, children}) => {
    return (
        <div className={"modal-body " + className}>
            {children}
        </div>
    )
}

export default DialogBody
