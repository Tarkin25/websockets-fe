import React from "react";

const Header = ({ children, className, style }) => {
  return (
    <div className={"bg-dark p-3 text-light " + (className ? className : "")} style={style}>
      {children}
    </div>
  );
};

export default Header;
