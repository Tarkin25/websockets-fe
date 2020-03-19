import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const dialogStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1050
};

const overlayStyle = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0, 
    right: 0,
    zIndex: 1049,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(255, 255, 255, 0.3)"
}

const Dialog = props => {
  const { children } = props;

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  if (open) {
    return (
      <div style={overlayStyle}>
        <div style={dialogStyle}>
          <div className="modal-dialog">
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

Dialog.propTypes = {
  open: PropTypes.bool
};

export default Dialog;
