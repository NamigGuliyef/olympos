import React from "react";
import { Link, NavLink } from "react-router-dom";

const Logo = () => {
  const isHomePage = location.pathname === "/";

  function navLinkStyle(isActive) {
    return {
      color: isHomePage ? "white" : "black",
      textDecoration: "none",
    };
  }
  return (
    <div>
      <NavLink style={navLinkStyle} to="/">
        Logo
      </NavLink>
    </div>
  );
};

export default Logo;
