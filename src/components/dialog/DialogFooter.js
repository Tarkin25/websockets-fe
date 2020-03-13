import React from 'react'

const DialogFooter = ({className, children}) => {
    return (
        <div className={"modal-footer " + className}>
            {children}
        </div>
    )
}

export default DialogFooter
