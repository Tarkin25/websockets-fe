import React, { useState, Fragment } from "react";

const withAlert = WrappedComponent => props => {
  const [content, setContent] = useState(null);
  const [type, setType] = useState("primary");

  const Alert = () => {
    if (content !== null) {
      return (
        <div
          className="container"
          style={{ position: "fixed", bottom: "20px", left: 0, right: 0, zIndex: 1050 }}
        >
          <div className={"alert alert-" + type}>
            {content}
            <button className="close" onClick={() => setContent(null)}>
              &times;
            </button>
          </div>
        </div>
      );
    } else return null;
  };

  const displayAlert = (content, type = "primary") => {
    setType(type);
    setContent(content);
  };

  return (
      <Fragment>
          <Alert/>
          <WrappedComponent {...props} displayAlert={displayAlert} />
      </Fragment>
  );
};

export default withAlert;
