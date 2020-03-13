import React from "react";

const Header = ({ children, className }) => {
  return (
    <div className={"bg-dark p-3 text-light " + className}>
      {children}
    </div>
  );
};

export default Header;
